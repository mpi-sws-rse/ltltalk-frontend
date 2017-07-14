const world = `
██████████████
█   a E█   bF█
█E     █F    █
██████ ███ ███
█C       D   █
█       z@  D█
█       C█████
█  ███████B  █
█       A█  d█
█A   c      B█
██████████████`;

const defaultConfig = {
  world: world,
  xMin: -8,
  yMax: 5
}

const itemFlag = /[a-z]/;
const cornerFlag = /[A-Z]/;
const items = {
  a: ["blue","green"],
  b: ["orange", "red"],
  c: ["red"],
  d: ["purple"],
  z: ["red","blue","green"]
}
/*
const rooms = {
  room1 : ['B'],
  room2 : ['A'],
  room3 : ['C','D'],
  room4 : ['E'],
  room5 : ['F']
};
 */
const rooms = {
  'A' : 'room2',
  'B' : 'room1',
  'C' : 'room3',
  'D' : 'room3',
  'E' : 'room4',
  'F' : 'room5'
}


const corners = {}; // Leave empty
/* Structure of corners
  A : [[x1,y1], [x2,y2]]
*/
  
function processCorners() {
  let c;
  let points = [];
  for (let key in corners) {
    if (corners.hasOwnProperty(key)) {
      c = corners[key];
      for (let i = Math.min(c[0][0],c[1][0]); i < Math.max(c[0][0],c[1][0]); ++i) {
        for (let j = Math.min(c[0][1],c[1][1]); j < Math.max(c[0][1],c[1][1]); ++j) {
          points.push({
            x: i,
            y: j,
            type: "point",
            color: rooms[key]
          });
        }
      }
    }
  }
  return points;
}

function getDefaultMap(config = defaultConfig) {
  //let xMax = config.world.reduce((acc, x) => Math.max(acc, x.length));
  let world = config.world;
  let rowCount = -1; // The string literal starts with a newline
  let rowIndex = 0;
  let array = [];
  let robot;
  let xMax = 0;
  let c;
  for (let i = 0; i < world.length; ++i) {
    c = world[i];
    if (c === '█') {
      array.push({
        x: (i - rowIndex),
        y: rowCount,
        type: "wall",
        color: null
      });
    } else if (c === '@') {
      robot = {
        x: (i - rowIndex),
        y: rowCount,
        type: "robot",
        items: []
      }
    } else if (c === '\n') {
      xMax = Math.max(xMax, i - rowIndex);
      rowIndex = i + 1;
      rowCount += 1;
    } else if (c.match(itemFlag)) {
      let list = items[c];
      for (let j = 0; j < list.length; ++j) {
        array.push({
          x: (i - rowIndex),
          y: rowCount,
          type: "item",
          color: list[j]
        });
      }
    } else if (c.match(cornerFlag)) {
      let corner = corners[c];
      let coord = [i - rowIndex, rowCount];
      if (corner) corners[c].push(coord);
      else corners[c] = [coord];
    }
  }

  let roomPoints = processCorners();
  robot.x += config.xMin;
  robot.y = config.yMax - robot.y;
  return {
    worldMap: array.map((i) => {
      i.x += config.xMin;
      i.y = config.yMax - i.y;
      return i
    }).concat(roomPoints),
    xMin: defaultConfig.xMin,
    xMax: xMax + defaultConfig.xMin,
    yMin: defaultConfig.yMax - rowCount - 1,
    yMax: defaultConfig.yMax,
    robot: robot
  };
}

export const worldConfig = getDefaultMap();