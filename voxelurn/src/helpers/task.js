import { strict } from "assert";

export function selectTask(id,tasks) {
  console.log("in heersdfdgasd")
  console.log(tasks)
  // for (let i = 0; i <= tasks.length; ++i) {

  //   console.log("id is " + i)
  //   console.log("task id is " + id)

  //   if(i === id)
  //   { 
  //       console.log("matched task is ")
  //       console.log(i)
  //       return tasks[i]
  //   }

  // }


  var keys = [];
  var num = 0
 for (var key in tasks) {      
    //  if (tasks.hasOwnProperty(key)) keys.push(key);

    // console.log("inside for loop...")
    num = Number(key.slice(4))
    console.log(id)
    console.log(".........")
    console.log(num)

    if(num === id)
    { 
          console.log("matched task is ")
          console.log(num)
          // return tasks[i]
    }
   
 }

//   return task
    
}