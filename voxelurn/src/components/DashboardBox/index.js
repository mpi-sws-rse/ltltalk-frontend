import React, { Component } from "react"
import { connect } from "react-redux"
//import classnames from "classnames"
//import Actions from "actions/world"
import { worldConfig } from "constants/defaultMap"
//import { STATUS, COMMAND_BAR_DEFINE_PLACEHOLDER, COMMAND_BAR_PLACEHOLDER } from "constants/strings"

//  import { Circle } from 'react-konva';
//  import Konva from 'konva';

import PropTypes from 'prop-types';

import Isomer,
{
  Point,
  Shape,
  Color,
  Path
} from "isomer";
import "./styles.css"
import { worldAngle } from "constants/world"
import cssColors from "color-name"

import Constants from "constants/actions"

// import Konva from 'konva';
// import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


// Default z-axis scaling for blocks
const heightScaling = 0.25;

var counter = 0;

class DashboardBox extends Component {
  static propTypes = {
    /* Callback function when the CommandBar button clicks clicked */
    //onClick: PropTypes.func,

    /* Callback function when the user hits the up or down arrow keys */
    //onUp: PropTypes.func,
    //onDown: PropTypes.func,

    /* injected by Redux */
    // status: PropTypes.string,
    // query: PropTypes.string,
    // dispatch: PropTypes.func,
    blocks: PropTypes.array,

    isoConfig: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number

  }
  static defaultProps = {
    isoConfig: {},
    blocks: []
    }


    constructor(props) {
      super(props)
      
      /* Default Isomer config */
      const defaultIsoConfig = {
        // TODO : calculate this
        centerPoint: Point(-5, 20, 0),
        rotation: worldAngle,
        scale: 1,
  
        blockWidthScale: 0.9,
        selectWidthScale: 0.4,
        //groundRadius: worldRadius,
        gridColor: new Color(50, 50, 50),
        canvasWidth: 2 * 825.0,
        canvasHeight: 2 * 600.0,
        originXratio: 0.5,
        originYratio: 0.5,
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
  
      this.colorMap = cssColors;
      this.colorMap['fake'] = [255, 255, 255];
  
      this.state = {
        iso: null,
        rotational: -1,
        animationId: null
      }
    }

    componentDidUpdate() {
      let blocks = this.props.blocks;
      
     
      window.requestAnimationFrame(() =>
          this.renderEverything(
              blocks.filter((b) => b.type !== "point"),
              ));
    }

    componentDidMount() {
      const iso = new Isomer(this.refs.boardCanvas,
        {
          scale: this.config.unitWidth,
          originX: this.config.originX,
          originY: this.config.originY
        }
      );
  
      this.setState({ iso: iso })
    }
  

    renderEverything(blocks){

      if (counter > 1) {
        counter--;
        return;
      }

      const scalars = blocks.map((b) => 1.0);

      const minScalar = Math.max(Math.min(...scalars), this.config.numUnits / this.config.maxUnits);

    // this.state.iso.canvas.clear()
    // this.state.iso._calculateTransformation();
    this.renderBlocks(blocks.filter((b) => b.z < -0.5), minScalar)
    this.renderGrid(minScalar)
    this.renderBlocks(blocks.filter((b) => b.z >= -0.5), minScalar)


     counter--;
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
        if (color) {
          let alpha = 0.88;
          if (block.type === "roomMarker" || block.type === "pointMarker")
            alpha = 0.2;
          blockColor = new Color(color[0], color[1], color[2], alpha);
        } else if (block.type === "robot") {
          blockColor = new Color(128, 128, 128, 0.5);
        } else {
          //blockColor = new Color(128, 128, 128, 0.5);
          blockColor = new Color(0, 0, 0, 0.8);
        }
  
  
        // Determine what sort of block to construct
        this.state.iso.add(this.makeBlock(block, false, scale), blockColor);
      }
    }

    makeBlock(block, highlighted = false, scale = this.config.scale) {
      const { rotation, centerPoint} = this.config
      const cubesize = highlighted ? this.config.selectWidthScale : this.config.blockWidthScale;
      let { x, y, z, type, shape} = block;
      
      const extend = block.extend ? block.extend : {x:0, y:0};
      if (type === "pointMarker" || type === "roomMarker")
        type = "marker";
      else if (type === "carriedItem"){
        type = "item";
        
      }
  
      let cScale = 1;
      if (type === "path")
        cScale = 0.25;
      else if (type === "item")
        cScale = 0.75;
      else if (type === "marker")
        cScale = 1;
  
      let zScale = heightScaling;
      if (type === "robot")
        zScale = 1;
      else if (type === "marker")
        zScale = 0.125;
      else if (type === "wall")
        zScale = 0.125;
  
      const shift = (1 - cubesize*cScale) / 2;
      const zShift = (1 - cubesize) / 2;
  
      // Items are rendered as cylinders and must be constructed differently 
      if (type === "item" && shape === "circle") {
        return Shape.Cylinder(
          Point (x + cubesize/2,
            y +  cubesize/2,
            z * heightScaling + zShift),
          0.5 * cScale,
          15,//10, // Number of vertices -- 15 makes them appear as round
          cubesize * heightScaling)
        .rotateZ(centerPoint, rotation)
       .scale(centerPoint, scale);
      }
      else if (type ==="item" && shape ==="triangle"){
        return Shape.Cylinder(
                Point (x + cubesize/2,
                  y +  cubesize/2,
                  z * heightScaling + zShift),
                0.5 * cScale,
                3,
                cubesize * heightScaling)
              .rotateZ(centerPoint, rotation)
             .scale(centerPoint, scale);
      
      }
      else if (type ==="item" && shape ==="square"){
        return Shape.Cylinder(
                Point (x + cubesize/2,
                  y +  cubesize/2,
                  z * heightScaling + zShift),
                0.5 * cScale,
                4,
                cubesize * heightScaling)
              .rotateZ(centerPoint, rotation)
             .scale(centerPoint, scale);
      
      }
      else {
        let shape = Shape.Prism;
        let yRotation = 0;
        if (type === "marker") {
          //shape = Shape.Pyramid;
          //yRotation = Math.PI;
        }
        let xSign = (extend.x >= 0) ? 1 : -1;
        let ySign = (extend.y >= 0) ? 1 : -1;
        if (xSign < 0) x += extend.x - 1;
        if (ySign < 0) y += extend.y - 1;
        let objectPoint = Point(x + shift, y + shift, z * heightScaling + zShift);
        return shape(objectPoint ,
          cubesize*cScale + xSign*extend.x,
          cubesize*cScale + ySign*extend.y,
          cubesize*zScale
        )
          .rotateY(objectPoint, yRotation)
          .rotateZ(centerPoint, rotation)
          .scale(centerPoint, scale)
        //.translate(gridWidth*offset, gridWidth*offset, 0);
      }
  
    }  


  render() {
    return (
<canvas id="boardCanvas" className="DashboardBox" ref="boardCanvas" width={this.props.width} height={this.props.height} />
    )

// return (
//   <Stage width={window.innerWidth} height={window.innerHeight}>
//     <Layer>
//       <Text text="Some text on canvas" fontSize={15} />
//       <Rect
//         x={20}
//         y={50}
//         width={100}
//         height={100}
//         fill="red"
//         shadowBlur={10}
//       />
//       <Circle x={200} y={100} radius={50} fill="green" />
//       <Line
//         x={20}
//         y={200}
//         points={[0, 0, 100, 0, 100, 100]}
//         tension={0.5}
//         closed
//         stroke="black"
//         fillLinearGradientStartPoint={{ x: -50, y: -50 }}
//         fillLinearGradientEndPoint={{ x: 50, y: 50 }}
//         fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
//       />
//     </Layer>
//   </Stage>
// );
  }
}


export default DashboardBox

