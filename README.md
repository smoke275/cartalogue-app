#Cartalogue App

Google Maps wasn't working after navigating to any page. Fixed by triggering a resize event slightly after initializing the map.
```sh
setTimeout(function(){
  google.maps.event.trigger(map, 'resize'); 
},500)
```