var startCity, endCity;

function initAutocomplete() {
  // Create the autocomplete object
  startCity = new google.maps.places.Autocomplete(document.getElementById('start-city'));
  endCity = new google.maps.places.Autocomplete(document.getElementById('end-city'));
}

//  Make AJAX request to send id and name of
//  start and end city which are stored in database
$('#tripForm').submit(function(e) {
  e.preventDefault();

  var data = {};
  data.startCityName = $('#start-city').val();
  data.startCityID = startCity.getPlace().id;
  data.endCityName = $('#end-city').val();
  data.endCityID = endCity.getPlace().id;

  $.ajax({
    type: 'POST',
    url: '/trip/new',
    data: data
  });
});