import React from "react"
import Isomer,
{
  Point,
  Shape,
  Color,
  Path
} from "isomer";
import { sortBlocks, rotateBlock, findZs, worldAngle } from "helpers/blocks"
import deepEqual from "deep-equal"
import cssColors from "color-name"

// Default z-axis scaling for blocks
const heightScaling = 0.25;

function stateIncludes(state, obj) {
  for (const c of state) {
    if (c.x === obj.x &&
      c.y === obj.y &&
      c.z === obj.z &&
      c.color === obj.color) {
      return true;
    }
  }
  return false;
}

/* Will return the state with the "_new" name attached to the difference between
 * the prev state and the next state */
export const computeDiff = (prev, next) => {
  const difference = next.filter(c => !stateIncludes(prev, c))
  const intersection = next.filter(c => stateIncludes(prev, c))

  return difference.map((c) => (Object.assign({}, c, { names: [...c.names, "_new"] })))
    .concat(intersection)
}

/* Will return true if the two states are equal; false otherwise */
export const computeEquality = (struct1, struct2) => {
  const a = sortBlocks(struct1).filter((b) => b.color !== "Anchor");
  const b = sortBlocks(struct2).filter((b) => b.color !== "Anchor");

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i].x !== b[i].x ||
      a[i].y !== b[i].y ||
      a[i].z !== b[i].z ||
      a[i].color !== b[i].color) {
      return false;
    }
  }

  return true;
}

class Blocks extends React.Component {
  static propTypes = {
    blocks: React.PropTypes.array,
    path: React.PropTypes.array,
    robot: React.PropTypes.object,
    isoConfig: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  static defaultProps = {
    isoConfig: {},
    blocks: []
  }

  constructor(props) {
    super(props)
    /* Default Isomer config */
    const defaultIsoConfig = {
      centerPoint: Point(0, 0, 0),
      rotation: worldAngle,
      scale: 1,

      blockWidthScale: 0.9,
      selectWidthScale: 0.4,
      groundRadius: 5,
      gridColor: new Color(50, 50, 50),
      canvasWidth: 2 * 825.0,
      canvasHeight: 2 * 600.0,
      originXratio: 0.5,
      originYratio: 0.6,
      numUnits: 30, // default number of cubes from left to right of the canvas
      maxUnits: 200,
      marginCubes: 1, // how far from the border do we keep the cubes, until we reach max zoom
      nil: null
    }

    this.config = { ...defaultIsoConfig, ...props.isoConfig }

    // infer easier to use arguments
    this.config = (p => {
      p.originX = p.canvasWidth * p.originXratio;
      p.originY = p.canvasHeight * p.originYratio;
      p.unitWidth = p.canvasWidth / p.numUnits;
      p.margin = p.unitWidth * p.marginCubes;
      return p;
    })(this.config);

    // this.colorMap = {
    //   Red: [209, 0, 0],
    //   Orange: [255, 102, 34],
    //   Yellow: [255, 218, 33],
    //   Green: [51, 221, 0],
    //   Blue: [17, 51, 204],
    //   Black: [10, 10, 10],
    //   White: [255, 255, 240],
    //   Pink: [255, 20, 147],
    //   Brown: [139, 69, 19],
    //   Anchor: [0, 160, 176],
    //   Fake: [255, 255, 255],
    //   Gray: [144, 144, 144]
    // }
    this.colorMap = cssColors;
    this.colorMap['fake'] = [255, 255, 255];

    this.state = { iso: null, rotational: -1 }
  }

  componentDidMount() {
    const iso = new Isomer(this.refs.blocksCanvas,
      {
        scale: this.config.unitWidth,
        originX: this.config.originX,
        originY: this.config.originY
      }
    );

    this.setState({ iso: iso })
  }

  shouldComponentUpdate(prevProps, prevState) {
    return !deepEqual(this.props, prevProps) || !deepEqual(prevState, this.state)
  }

  componentDidUpdate() {
    //this.renderEverything();
    window.requestAnimationFrame(() => this.renderEverything(0));
    //console.log(this.props.path);
  }

  removeItem(x, y, color, blocks) {
    for (let i = 0; i < blocks.length; ++i) {
      if (blocks[i].x == x && blocks[i].y == y && blocks[i].color === color) {
        blocks.splice(i, 1);
        this.props.robot.items.push("red");
        return true;
      }
    }
    return false;
  }

  removeRobot(blocks) {
    for (let i = 0; i < blocks.length; ++i) {
      if (blocks[i].names.includes("robot")
          || blocks[i].names.includes("carriedItem")) {
        blocks.splice(i, 1);
      }
    }
  }

  updateRobot(blocks, step, path, factor) {
    const robot = this.props.robot;
    const c = Math.ceil(1.0*step/factor);
    const f = Math.floor(1.0*step/factor);
    if (path[c] && path[c].names.includes("pickup") && !path[c].completed) {
      let res = this.removeItem(path[c].x, path[c].y, path[c].spec, blocks);
      console.log(res);
      path[c].completed = true;
    } if (path[f] && path[c]) {
      const d = 1.0*step/factor - f;
      robot.x = ((1-d)*path[f].x + (d)*path[c].x);
      robot.y = ((1-d)*path[f].y + (d)*path[c].y);
    } else if (path[step]) {
      robot.x = path[step].x;
      robot.y = path[step].y;
    }
    blocks.push(robot);
    for (let i = 0; i < robot.items.length; ++i) {
      // 4 is the height of the robot
      blocks.push({
        x: robot.x, y: robot.y, z:(4),
        color: robot.items[i],
        names: ["carriedItem"]
      });
    }
    return blocks;
  }

  resetRobotPosition() {
    // Reset the robot position in the way it should be
  }

  renderEverything(robotStep = 0) {
    // Robot speed factor
    const factor = 10;
    const updatedBlocks = this.updateRobot(this.props.blocks, robotStep, this.props.path, factor);
    //const allBlocks = this.props.blocks.map((b) => rotateBlock(b, this.state.rotational));
    //const blocks = sortBlocks(this.props.blocks.map((b) => rotateBlock(b, this.state.rotational)));
    const blocks = sortBlocks(updatedBlocks.map((b) => rotateBlock(b, this.state.rotational)));
    const scalars = blocks.map((b) => this.getBlockScale(b));
    const minScalar = Math.max(Math.min(...scalars), this.config.numUnits / this.config.maxUnits);


    this.state.iso.canvas.clear()
    // this.state.iso._calculateTransformation();
    this.renderBlocks(blocks.filter((b) => b.z < 0), minScalar)
    this.renderGrid(minScalar)
    this.renderBlocks(blocks.filter((b) => b.z >= 0), minScalar)
    this.removeRobot(this.props.blocks);

    if (robotStep < this.props.path.length * factor)
      window.requestAnimationFrame(() => this.renderEverything(robotStep + 1));
    else {
      this.resetRobotPosition();
    }
  }

  getBlockScale(b) {
    const {originX, originY, margin, centerPoint, rotation} = this.config;
    const p = this.state.iso._translatePoint(new Point(b.x, b.y, b.z).rotateZ(centerPoint, rotation));
    // scale is the scaling down required so the point appears in canvas
    // it satisfies: scale * (x - originX) + originX \in [0, canvasWidth]
    // I assume origin is in the box
    // margin is a bit tricky, the exactly way requires multiple calls to translate

    const Y0 = originY;
    const X0 = originX;

    let xscale = 1;
    if (p.x < margin)
      xscale = (X0 - margin) / (X0 - p.x);
    if (p.x > this.config.canvasWidth - margin)
      xscale = (this.config.canvasWidth - margin - X0) / (p.x - X0);

    let yscale = 1;
    if (p.y < margin)
      yscale = (Y0 - margin) / (Y0 - p.y);
    if (p.y > this.config.canvasHeight - margin)
      yscale = (this.config.canvasHeight - margin - Y0) / (p.y - Y0);

    // console.log(`p:${p.x},${p.y} margin: ${margin}, height:${this.config.canvasHeight}`);
    return Math.min(xscale, yscale);
  }

  renderGrid(scale) {
    const { groundRadius, rotation, groundColor, centerPoint } = this.config;
    const groundwidth = 2 * groundRadius + 1;
    for (let x = 0; x < groundwidth + 1; x++) {
      this.state.iso.add(new Path([
        new Point((x - groundRadius), -groundRadius, 0),
        new Point((x - groundRadius), (groundRadius + 1), 0),
        new Point((x - groundRadius), -groundRadius, 0)
      ])
        .rotateZ(centerPoint, rotation)
        .scale(centerPoint, scale)
        //.translate(gridwidth*offset, gridwidth*offset, 0)
        , groundColor
      );

      const y = x;
      this.state.iso.add(new Path([
        new Point(-groundRadius, (y - groundRadius), 0),
        new Point((groundRadius + 1), (y - groundRadius), 0),
        new Point(-groundRadius, (y - groundRadius), 0)
      ])
        .rotateZ(centerPoint, rotation)
        .scale(centerPoint, scale)
        //.translate(gridwidth*offset, gridwidth*offset, 0)
        , groundColor
      );
    }
  }

  renderPath(blocks, i) {
    this.renderBlocks(blocks[i]);
    if (i+1 < blocks.length)
      window.requestAnimationFrame(() => this.renderPath(blocks, i+1));
  }

  renderBlocks(blocks, scale = this.config.scale) {
    if (!(blocks instanceof Array)) {
      blocks = [blocks];
    }
    for (const block of blocks) {
      // let selectedBlockYes = false;
      let color = null;
      if (block.color)
        color = this.colorMap[block.color.toLowerCase()];
      let blockColor = new Color();
      // TODO Determine if this should be kept
      if (block.names && block.names.includes("_new")) {
        blockColor = new Color(color[0], color[1], color[2], 0.2);

      } else if (color) {
        blockColor = new Color(color[0], color[1], color[2], 0.88);
      }

      // Determine what sort of block to construct
      if (block.color === "fake") {
        //blockColor = new Color(244,244,244, 0.2);
        //this.state.iso.add(this.makeBlock(block.x, block.y, block.z), blockColor);
      } else if (block.names && block.names.includes("robot")) {
        this.state.iso.add(this.makeBlock(block.x, block.y, block.z, false, scale, "robot"), new Color(128, 128, 128, 0.50));
      } else if (block.names && block.names.includes("item") || block.names.includes("carriedItem")) {
        this.state.iso.add(this.makeBlock(block.x, block.y, block.z, false, scale, "item"), blockColor);
      } else if (block.names && block.names.includes("path")) {
        this.state.iso.add(this.makeBlock(block.x, block.y, block.z, false, scale, "path"), blockColor);
      } else if (block.names && block.names.includes("destination")) {
        this.state.iso.add(this.makeBlock(block.x, block.y, block.z, false, scale, "destination"), blockColor);
      } else {
        this.state.iso.add(this.makeBlock(block.x, block.y, block.z, false, scale), new Color(0, 0, 0, 0.88));
      }

      if (block.names && block.names.includes("S")) {
        //this.state.iso.add(this.makeBlock(block.x, block.y, block.z, basicUnit, true), new Color(0, 160, 176, 0.125));
        //this.state.iso.add(this.makeBlock(block.x, block.y, block.z, true, scale), new Color(0, 0, 0, 1));
      }
    }
  }

  darken(color) {
    return new Color(this.darkenValue(color.r), this.darkenValue(color.g), this.darkenValue(color.b), color.a);
  }

  darkenValue(value, factor = 0.5) {
    const graystandard = 128;
    return factor * graystandard + (1 - factor) * value;
  }

  makeBlock(x, y, z, highlighted = false, scale = this.config.scale, type = null) {
    const { rotation, centerPoint} = this.config
    const cubesize = highlighted ? this.config.selectWidthScale : this.config.blockWidthScale;

    let cScale = 1;
    if (type === "path")
      cScale = 0.25;
    else if (type === "item")
      cScale = 0.75;
    else if (type === "destination")
      cScale = 0.5;

    let zScale = heightScaling;
    if (type === "robot")
      zScale = 1;
    else if (type === "destination")
      zScale = 0.5;

    const shift = (1 - cubesize*cScale) / 2;
    const zShift = (1 - cubesize) / 2;

    // Items are rendered as cylinders and must be constructed differently 
    if (type === "item") {
      return Shape.Cylinder(
        Point (x + cubesize/2,
          y +  cubesize/2,
          z * heightScaling + zShift),
        0.5 * cScale,
        16, // Number of vertices
        cubesize * heightScaling)
      .rotateZ(centerPoint, rotation)
      .scale(centerPoint, scale);
    } else {
      let shape = Shape.Prism;
      if (type === "destination")
        shape = Shape.Pyramid;
      return shape(
        Point(x + shift,
          y + shift,
          z * heightScaling + zShift
        ),
        cubesize*cScale, cubesize*cScale, cubesize*zScale
      )
        .rotateZ(centerPoint, rotation)
        .scale(centerPoint, scale)
      //.translate(gridWidth*offset, gridWidth*offset, 0);
    }

  }

  render() {
    return (
      <div>
      <canvas id="blocksCanvas" className="Blocks" ref="blocksCanvas" width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}

export default Blocks
