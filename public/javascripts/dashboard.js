var startCity, endCity;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  startCity = new google.maps.places.Autocomplete(document.getElementById('start-city'));
  endCity = new google.maps.places.Autocomplete(document.getElementById('end-city'));
}

$('#tripForm').submit(function(e) {
  e.preventDefault();

  var data = {};
  data.startCityName = $('#start-city').val();
  data.startCityID = startCity.getPlace().id;
  data.endCityName = $('#end-city').val();
  data.endCityID = endCity.getPlace().id;

  //  AJAX request to send id and name of both start and end city
  $.ajax({
    type: 'POST',
    url: '/trip/new',
    data: data
  });
});