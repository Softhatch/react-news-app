var fetch = require('fetch');

function search() {
    return fetch('https://newsapi.org/v1/sources?language=en', {
            accept: 'application/json',
        }).then(checkStatus)
        .then(parseJSON);
}

search();