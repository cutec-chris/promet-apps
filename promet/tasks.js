// In memory tasks store
tasks = [];
function DeleteDoneTasks(){
  console.log("DeleteDoneTasks");
  var i = 0;
  var list = document.querySelector('#task-list');
  list.innerHTML = "";
  var aTask = tasks[i];
  while (aTask) {
    var bTask = tasks[i+1];
    if (aTask.completed=='Y'){
      tasks.splice(i,1);
    } else {
      i++;
    }
    aTask = bTask;
  }
  localStorage['tasks'] = JSON.stringify(tasks);
  delete tasks;
  tasks = new Array();
  LoadTasks();
}
function TaskDone(event){
  console.log("TaskDone");
  e = event.target;
  aTask = tasks[e.parentElement.id];
  if (e.checked)
    aTask.completed='Y';
  else
    aTask.completed='N';
  localStorage['tasks'] = JSON.stringify(tasks);
}
// This adds a task
function addTask(task){
  // To the view
  var list = document.querySelector('#task-list');
  list.innerHTML += template("task_template", task);
  // To memory
  tasks[tasks.length] = task;
  var ndiv = list.lastElementChild.firstElementChild;
  ndiv.firstElementChild.addEventListener('change',TaskDone);
}
function LoadTasks() {
// Set it all up
// Notify the user if local storage isn't supported
  console.log("LoadTasks");
if (verifyLocalStorage() == true) {
    // Get the last stored tasks and restore them to the UI.
    // Default to an empty array
    var jsoncode = localStorage.getItem('tasks');
    var oldTasks = JSON.parse(jsoncode || '[]');
    for (var i=0;i<=oldTasks.length-1;i++){
      oldTasks[i].lpriority = i;
      addTask(oldTasks[i]);
    }
}
}
LoadTasks();
// Set up a handler for submission
function SubmitNewTask(){
  console.log("SubmitNewTask()");
  // Add the new task
  var aTaskName = document.querySelector('#task-name');
  var newTask = { 'summary' : aTaskName.value,
                  'sql_id' : undefined,
                  'external_id' : guid(),
                  'completed' : 'N',
                  'lpriority' : 0,
                  'timestampd' : Date().toLocaleString()
                };
  newTask.lpriority = tasks.length;
  addTask(newTask);
  // In storage
  localStorage['tasks'] = JSON.stringify(tasks);
  // Clear the input
  document.querySelector('#task-name').value = '';
  // Don't post
  return false;
}
if (IsConnectionOK()){
  GetList("tasks","HASCHILDS<>'Y'",1,function (aSequence,aData) {
    console.log("Sync started...");
    var RemoteTasks = aData;
    if (RemoteTasks)
      for (var r=0;r<=RemoteTasks.length-1;r++){
        var found = false;
        for (var i=0;i<=tasks.length-1;i++) {
          if (tasks[i].sql_id==RemoteTasks[r].sql_id)
            {
              if (tasks[i].timestampd>RemoteTasks[r].timestampd) {
                //sync out
              } else {
                //sync in
                tasks[i].summary = RemoteTasks[r].summary;
              }
              found = true;
              break;
            }
        }
        if (!found)
          addTask(RemoteTasks[r]);
      }
    localStorage['tasks'] = JSON.stringify(tasks);
  }
  );
}
//scroll to first task if there are enougth tasks
var aToolbar = document.querySelectorAll('.toolbar')[1];
if (aToolbar)
  var aToolbarHeight = aToolbar.offsetHeight;
var aHeight = findElementTop(document.querySelector('#task-list'))[0];
aHeight -= aToolbarHeight;
window.scrollTo(0,aHeight);
