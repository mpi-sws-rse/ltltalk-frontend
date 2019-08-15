import { strict } from "assert";

export function selectTask(id,tasks) {

  var keys = [];
  var num = 0
 for (var key in tasks) {      
    num = Number(key.slice(4))
    if(num === id)
    { 
      console.log("matched task is ")
      console.log(num)
      console.log(tasks[key])
      return tasks[key]
    }
   
 }

//   return task
    
}