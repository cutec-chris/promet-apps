console.log("enter history");
// In memory tasks store
entrys = [];
// This will change the view if localStorage isn't available. It
// returns true or false
function verifyLocalStorage() {
  if (!window.localStorage) {
    document.querySelector('.section').style.display="none";
    document.querySelector('#not-supported').style.display="block";
    return false;
  }
  return true;
}
function addEntry(entry){
  //To the view
  var list = document.querySelector('#entry-list');
  list.innerHTML += template("history_template", entry);
  // To memory
  entrys[entrys.length] = entry;
}
function LoadEntrys() {
// Set it all up
// Notify the user if local storage isn't supported
  console.log("LoadEntrys");
if (verifyLocalStorage() == true) {
    // Get the last stored tasks and restore them to the UI.
    // Default to an empty array
    var jsoncode = localStorage.getItem('history');
    var oldEntrys = JSON.parse(jsoncode || '[]');
    for (var i=0;i<=oldEntrys.length-1;i++){
      addEntry(oldEntrys[i]);
    }
}
}
LoadEntrys();
// Set up a handler for submission
function SubmitNewEntry(){
  console.log("SubmitNewEntry()");
  // Add the new Entry
  var aSummary = document.querySelector('#entry-name');
  var newEntry = { 'action' : aSummary.value,
                   'actionicon' : 8,
                  'sql_id' : undefined,
                  'external_id' : guid(),
                  'timestampd' : Date().toLocaleString()
                };
  addEntry(newEntry);
  // In storage
  localStorage['history'] = JSON.stringify(entrys);
  // Clear the input
  document.querySelector('#entry-name').value = '';
  // Don't post
  return false;
}
if (IsConnectionOK()){
  SyncList("history","",localStorage.getItem('history') || '[]',1,function (aSequence,aData){
  }
  );
}
//scroll to first task if there are enougth tasks
var aToolbar = document.querySelectorAll('.toolbar')[1];
if (aToolbar)
  var ToolbarHeight = aToolbar.offsetHeight;
var aHeight = findElementTop(document.querySelector('#entry-list'));
window.scrollTo(0,aHeight-ToolbarHeight);
