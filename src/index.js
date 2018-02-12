import $ from 'jquery'

const getTopWord = () => {
  return fetch(`https://wordwatch-api.herokuapp.com/api/v1/top_word`)
  .then(response => handleResponse(response))
  .then(topWord => addTopWord(topWord))
  .catch((error) => console.error({errors}));
}

const addWord = (newWord) => {
  var data = {word: { value: newWord }}
  return fetch(`https://wordwatch-api.herokuapp.com/api/v1/words`,{
  method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then((response) => handleResponse(response))
  .then((x) => console.log(x))
  .catch(error => console.log({ error }))
};

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
  $('.top-word').append(`<h3>  ${word} (${count})</h3>`)
}
const countText = (event) => {
   event.preventDefault()
  let sanitizedText = {};
  var newTextInput = document.getElementById("textareabox").value.split(" ")
  newTextInput.forEach(function(word){
    if(sanitizedText[word] === undefined){
      sanitizedText[word] = 1;
      }
    else
    sanitizedText[word] += 1

    })

  var words = Object.keys(sanitizedText)
  var frequency = Object.values(sanitizedText)
  words.forEach(function(word){
  $('.word-count').append(`<p> ${word}</p>`)
  addWord(word);
  })

}

$(document).ready(() => {
  getTopWord();
$('.text-submission').on('click', '.break-down-btn', countText);
})
