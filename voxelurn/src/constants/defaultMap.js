const world = `
XXXXXXXXXXX
X         X
X         X
X         X
X  a      X
X        cX
X  XXXXXXXX
X     R  dX
X         X
XXXXXXXX  X
X  b      X
X         X
XXXXXXXXXXX `;

const defaultConfig = {
  world: world,
  xMin: -5,
  yMax: 5
}

const validNames = /[a-z]/;
const items = {
  a: ["blue","green"],
  b: ["orange", "red"],
  c: ["red"],
  d: ["purple"]
}

  
function getDefaultMap(config = defaultConfig) {
  //let xMax = config.world.reduce((acc, x) => Math.max(acc, x.length));
  let world = config.world;
  let rowCount = -1; // The string literal starts with a newline
  let rowIndex = 0;
  let array = [];
  let robot;
  let xMax = 0;
  for (let i = 0; i < world.length; ++i) {
    if (world[i] === 'X') {
      array.push({
        x: (i - rowIndex) + config.xMin,
        y: config.yMax - rowCount,
        type: "wall",
        color: null
      });
    } else if (world[i] === 'R') {
      robot = {
        x: (i - rowIndex) + config.xMin,
        y: config.yMax - rowCount,
        type: "robot",
        items: []
      }
    } else if (world[i] === '\n') {
      xMax = Math.max(xMax, i - rowIndex);
      rowIndex = i + 1;
      rowCount += 1;
    } else if (world[i].match(validNames)) {
      let list = items[world[i]];
      for (let j = 0; j < list.length; ++j) {
        array.push({
          x: (i - rowIndex) + config.xMin,
          y: config.yMax - rowCount,
          type: "item",
          color: list[j]
        });
      }
    }
  }
  return {
    worldMap: array,
    xMin: defaultConfig.xMin,
    xMax: xMax + defaultConfig.xMin,
    yMin: defaultConfig.yMax - rowCount - 1,
    yMax: defaultConfig.yMax,
    robot: robot
  };
}

export const worldConfig = getDefaultMap();
