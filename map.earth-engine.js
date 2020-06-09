

var dates=["2019-06-10","2019-06-14","2019-06-19","2019-06-20","2019-07-19","2019-07-20","2019-07-21","2019-08-08","2019-10-10","2019-10-16","2019-10-18","2019-10-22","2019-10-25","2019-11-04","2019-11-06","2019-12-06","2019-12-09","2019-12-10","2019-12-11","2019-12-12","2019-12-13","2019-12-14","2019-12-16","2019-12-17","2019-12-18","2019-12-19","2019-12-31","2020-01-06","2020-01-07","2020-01-09","2020-01-10","2020-01-13","2020-01-14","2020-01-15","2020-01-23","2020-01-27","2020-01-29","2020-01-31","2020-02-01","2020-02-06","2020-02-07","2020-02-11","2020-02-13","2020-02-14","2020-02-19","2020-02-20","2020-02-21","2020-02-24","2020-02-25","2020-02-26","2020-02-27","2020-02-28","2020-03-02","2020-03-03","2020-03-04","2020-03-05","2020-03-06","2020-03-09","2020-03-10","2020-03-11","2020-03-12","2020-03-13","2020-03-17","2020-03-19","2020-03-20","2020-03-23","2020-03-24","2020-03-26","2020-03-27","2020-03-30","2020-03-31","2020-04-02","2020-04-03","2020-04-15","2020-04-16","2020-04-17","2020-04-20","2020-04-21","2020-04-22","2020-04-24","2020-04-27","2020-04-28","2020-04-30","2020-05-01","2020-05-04","2020-05-05","2020-05-06","2020-05-07","2020-05-08","2020-05-09","2020-05-11","2020-05-12","2020-05-13","2020-05-15","2020-05-16","2020-05-18","2020-05-19","2020-05-20","2020-05-21","2020-05-27","2020-05-28","2020-05-29","2020-05-30","2020-06-01","2020-06-02","2020-06-03","2020-06-04"]
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

 
// Create legend title
var legendTitle = ui.Label({
  value: 'CBP Drones',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
legend.add(legendTitle);
var makeRow = function(color, name) {
 
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
 
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette =['red', 'green', 'blue','black','purple','violet','orange'];
var names = ['CBP216','CBP213','CBP113','CBP110','CBP108','CBP104','CBP125'];
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
}  
// above thisI isI legend

var get_flights = function (drone){
  return drone.first().get('flight')
}


var start = function(){
  Map.add(inspector)
  var CBP216 = filt.filterMetadata('drone','equals','CBP216')
  var CBP213 = filt.filterMetadata('drone','equals','CBP213')
  var CBP113 = filt.filterMetadata('drone','equals','CBP113')
  var CBP125 = filt.filterMetadata('drone','equals','CBP125')
  var CBP110 = filt.filterMetadata('drone','equals','CBP110')
  var CBP108 = filt.filterMetadata('drone','equals','CBP108')
  var CBP104 = filt.filterMetadata('drone','equals','CBP104')
  var drones = [CBP216,CBP213,CBP113,CBP110,CBP108,CBP104,CBP125]
  drones.map(function(drone){
    var sort = drone.sort('ts');
    sort.size().evaluate(function(s){
      if (s > 1){
        sort.first().get('drone').evaluate(function(drone_id){
          var geo = sort.geometry().coordinates()
          var line = ee.Geometry.LineString(geo);
          if (drone_id=='CBP216'){ Map.addLayer(line,{'color':"red"})}
          else if (drone_id=="CBP213"){ Map.addLayer(line,{'color':"green"})}
          else if (drone_id=="CBP113"){ Map.addLayer(line,{'color':"blue"})}
          else if (drone_id=="CBP110"){ Map.addLayer(line,{'color':"black"})}
          else if (drone_id=="CBP108"){ Map.addLayer(line,{'color':"purple"})}
          else if (drone_id=="CBP104"){ Map.addLayer(line,{'color':"violet"})}
          else if (drone_id=="CBP125"){ Map.addLayer(line,{'color':"orange"})}
        })
      }
    })
  })
}

var draw_line=function(){
  var CBP216 = filt.filterMetadata('drone','equals','CBP216')
  var CBP213 = filt.filterMetadata('drone','equals','CBP213')
  var CBP113 = filt.filterMetadata('drone','equals','CBP113')
  var CBP125 = filt.filterMetadata('drone','equals','CBP125')
  var CBP110 = filt.filterMetadata('drone','equals','CBP110')
  var CBP108 = filt.filterMetadata('drone','equals','CBP108')
  var CBP104 = filt.filterMetadata('drone','equals','CBP104')
  
  var drones = [CBP216,CBP213,CBP113,CBP110,CBP108,CBP104,CBP125]
  
  drones.map(function(drone){
    drone.size().evaluate(function(size){
      if (size > 1){
       var flight = get_flights(drone)
       var flight_feature = data.filterMetadata('flight','equals',flight)
       var sort = flight_feature.sort('ts');
       var geo = sort.geometry().coordinates()
       var line = ee.Geometry.LineString(geo)
       sort.first().get('drone').evaluate(function(drone_id){
         if (drone_id=='CBP216'){ Map.addLayer(line,{'color':"red"})}
         else if (drone_id=="CBP213"){ Map.addLayer(line,{'color':"green"})}
         else if (drone_id=="CBP113"){ Map.addLayer(line,{'color':"blue"})}
         else if (drone_id=="CBP110"){ Map.addLayer(line,{'color':"black"})}
         else if (drone_id=="CBP108"){ Map.addLayer(line,{'color':"purple"})}
         else if (drone_id=="CBP104"){ Map.addLayer(line,{'color':"violet"})}
         else if (drone_id=="CBP125"){ Map.addLayer(line,{'color':"orange"})}
       })

      }
    })
  })

// add legend to map (alternatively you can also print the legend to the console)
  Map.add(legend);
  
}

var select = ui.Select({
  items: dates,
  onChange: function(key) {
    print(key)
    filt=data.filterMetadata('d','contains',ee.String(key))
    Map.clear()
    draw_line()
    Map.add(inspector)
  }
});

// Set a place holder.
select.setPlaceholder('Choose a Date');
var inspector = new ui.Panel([select]);

Map.setCenter(-97.961977,47.6900294,3)
// start
var filt=data
start()

