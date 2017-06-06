export function findPath(from, to, world) {
  // Placeholder code until path finding is fully implemented
  const path =  [
    {x:-3,y:-2,z:0,color:"fuchsia",names:["path"]},
    {x:-2,y:-2,z:0,color:"fuchsia",names:["path"]},
    {x:-1,y:-2,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:-2,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:-2,z:0, names:["pickup"], spec: "red", completed: false},
    {x:0,y:-1,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:0,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:1,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:2,z:0,color:"fuchsia",names:["path"]},
    {x:0,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:1,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:2,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:3,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:4,y:3,z:0,color:"fuchsia",names:["path"]},
    //{x:4,y:3,z:0, names:["putdown"], spec: "red", completed: false},
    {x:4,y:3,z:0, names:["pickup"], spec: "blue", completed: false},
    {x:3,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:2,y:3,z:0,color:"fuchsia",names:["path"]},
    {x:1,y:3,z:0,color:"fuchsia",names:["destination"]}
  ];
  // THIS MAY BE INEFFICIENT
  // Check if there are any conflicts with respect to x,y coordinates
  for (let a = 0; a < path.length; ++a) {
    let z = 0;
    for (let b = 0; b < world.length; ++b) {
      if (path[a].x === world[b].x && path[a].y === world[b].y)
        // Assuming that any object is only 1 unit in the z-direction
        z += 1;
    }
    path[a]['z'] = z;
  }
  //return world.concat(path);
  return path;
}
