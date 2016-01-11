var startCity, endCity;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  startCity = new google.maps.places.Autocomplete(document.getElementById('start-city'));
  endCity = new google.maps.places.Autocomplete(document.getElementById('end-city'));
}

$('#tripForm').submit(function() {
  $('#start-city').val(startCity.getPlace().id);
  $('#end-city').val(endCity.getPlace().id);
});