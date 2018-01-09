var Masterdata;
dhtmlxEvent(window,"load",function(){
  Masterdata = newPrometList('masterdata','Stammdaten');
  Masterdata.Grid.setHeader(["Name","Nummer","Status","Kategorie"]);
  Masterdata.Grid.setColumnIds('NAME,ID,STATUS,CATEGORY')
  Masterdata.Grid.setColTypes("ro,ro,ro,ro");
  Masterdata.Grid.attachHeader("#text_filter,#text_filter,#select_filter,");
  Masterdata.Grid.setInitWidths('*,70,150,*');
  Masterdata.Grid.init();
});
