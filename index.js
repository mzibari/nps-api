'use strict';

// put your own value below!
const apiKey = 'taGexNvJXJDXB79JyIGuFPHWaZ3ZCI2m1uQOS4qQ'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      <p>Directions: ${responseJson.data[i].directionsInfo}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchState, maxResults);
  });
}

$(watchForm);