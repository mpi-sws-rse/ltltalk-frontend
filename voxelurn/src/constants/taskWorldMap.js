import task from './tasks/task1.json'


const defaultConfig = {
  world: task,
  xMin: -1,
  yMax: 9
}


function getDefaultMap(/*config = defaultConfig*/) {
  let walls = [];
  let config = defaultConfig;
  //let xMax = config.world.reduce((acc, x) => Math.max(acc, x.length));
  let world = config.world;
  console.log("task world is....")
  console.log(world)

}

export const taskConfig = getDefaultMap();
