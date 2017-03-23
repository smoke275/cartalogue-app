## Cartalogue App

Cartalogue is a cordova based hybrid app designed to boost sales of local customers. It is an advertising app where in the shopkeepers can advertise their products for local customers to know about their availability.

The key problem Cartalogue tried to solve is the losses suffered by local shopkeepers because clients prefer shopping malls for buying products because of their guaranteed availabilty. There are cases where a particular item is available at a local shop however people don't approach them because of the lack of knowledge and advertisement. Cartalogue aims to bridge that gap and foster local shop grow.

It uses GCM to notify the client when an item of their choice is available at their local shops.

## Bugs
Google Maps wasn't working after navigating to any page. Fixed by triggering a resize event slightly after initializing the map.
```sh
setTimeout(function(){
  google.maps.event.trigger(map, 'resize'); 
},500)
```
