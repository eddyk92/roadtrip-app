function initialize() {
  /*
      Get lattitude and longitude of start, end, and waypoints
      push to array
  */
  var waypts = [{location: 'Berkeley, CA'}];

  var directionsDisplay = new google.maps.DirectionsRenderer();

  //  default lat and long to San Francisco in case route unavailable
  var latlng = new google.maps.LatLng(37.7749295,-122.41941550000001);
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };

  //  display the map
  var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title:"My location"
  });

  //  display route between locations
  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: "San Francisco",
    destination: "Oakland",
    waypoints: waypts,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(
    directionsRequest,
    function(response, status)
    {
      if (status == google.maps.DirectionsStatus.OK)
      {
        new google.maps.DirectionsRenderer({
          map: map,
          directions: response
        });
      }
    }
  );
}