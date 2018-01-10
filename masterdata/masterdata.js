var Masterdata;
dhtmlxEvent(window,"load",function(){
  Masterdata = newPrometList('masterdata','Stammdaten');
  Masterdata.Grid.setHeader(["Nummer","Kurztext","Version","Status","Kategorie"]);
  Masterdata.Grid.setColumnIds('ID,SHORTTEXT,VERSION,STATUS,CATEGORY')
  Masterdata.Grid.setColTypes("ro,ro,ro,ro,ro");
  Masterdata.Grid.attachHeader("#text_filter,#text_filter,#text_filter,#select_filter,#text_filter");
  Masterdata.Grid.setInitWidths('150,*,70,100,150');
  Masterdata.Grid.init();
});
