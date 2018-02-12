import $ from 'jquery'

const getTopWord = () => {
  return fetch(`https://wordwatch-api.herokuapp.com/api/v1/top_word`)
  .then(response => handleResponse(response))
  .then(topWord => addTopWord(topWord))
  .catch((error) => console.error({errors}));
}

const handleResponse = (response) => {
  return response.json()
  .then(json => {
    if(!response.ok) {
      const error = {
      status: response.status,
      statusTest: response.statusTest,
      };
    return Promise.reject(error);
    }
    return json;
  })
}

const addTopWord = (topWord) => {

  var wordObject = topWord.word
  var word = Object.keys(wordObject)[0]
  var count = Object.values(wordObject)[0]
  return renderTopWord(word, count)
}

const renderTopWord = (word, count) => {
  $('.top-word').append(`<h3>  ${word} </h3>`)
  $('.word-count').append(`<span>${count}</span>`)
}


$(document).ready(() => {
  getTopWord();
})
