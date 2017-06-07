export function findPath(from, to, world) {
  // Placeholder code until path finding is fully implemented
  const path1 =  [
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
  const path2 =  [
    {x:-3,y:-2,z:0,names:["path"]},
    {x:-2,y:-2,z:0,names:["path"]},
    {x:-1,y:-2,z:0,names:["path"]},
    {x:0,y:-2,z:0,names:["path"]},
    {x:0,y:-2,z:0, names:["pickup"], spec: "green", completed: false},
    {x:1,y:-2,z:0,names:["path"]},
    {x:2,y:-2,z:0,names:["path"]},
    {x:3,y:-2,z:0,names:["path"]},
    {x:4,y:-2,z:0,names:["path"]},
    {x:4,y:-3,z:0,names:["path"]},
    {x:4,y:-4,z:0,names:["path"]},
    {x:4,y:-4,z:0, names:["putdown"], spec: "green", completed: false},
    {x:3,y:-4,z:0,names:["path"]},
    {x:2,y:-4,z:0,names:["destination"]}
  ]
  return [path1, path2];
}
