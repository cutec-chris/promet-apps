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
  // To the view
  var nli=document.createElement("li");
  var list = document.querySelector('#entry-list');
  list.appendChild(nli);
  var ndiv = document.createElement("div");
  nli.appendChild(ndiv);
  ndiv.setAttribute('id',entry.sql_id);
  ndiv.innerHTML = '<label>'+entry.action+'</label>';
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
if (IsConnectionOK){
  var jsoncode = localStorage.getItem('history');
  var oldEntrys = JSON.parse(jsoncode || '[]');
  SyncList("history","",1,oldEntrys,function (aSequence,aData)
    {
    console.log("Sync started...");
    var RemoteEntrys = aData;
    if (RemoteEntrys)
      for (var r=0;r<=RemoteEntrys.length-1;r++){
        var found = false;
        for (var i=0;i<=enrys.length-1;i++) {
          if (entrys[i].sql_id==RemoteEntrys[r].sql_id)
            {
              if (entrys[i].timestampd>RemoteEntrys[r].timestampd) {
                //sync out
              } else {
                //sync in
                entrys[i].action = RemoteEntrys[r].action;
              }
              found = true;
              break;
            }
        }
        if (!found)
          addEntry(RemoteEntrys[r]);
      }
  }
  );
}
//scroll to first task if there are enougth tasks
var aToolbar = document.querySelectorAll('.toolbar')[1];
if (aToolbar)
  var ToolbarHeight = aToolbar.offsetHeight;
var aHeight = findElementTop(document.querySelector('#entry-list'));
window.scrollTo(0,aHeight-ToolbarHeight);
