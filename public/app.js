const app = function () {
    var url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json';

    makeRequest(url, function () {
        if (this.status !== 200) return;
        const jsonString = this.responseText;
        const beers = JSON.parse(jsonString);
        console.log(beers);
        render(beers);
    });
};

const makeRequest = function (url, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

const render = function (beers) {
    const divContainer = document.getElementById('beers-list');
    beers.forEach(function (beer) {
        const div = document.createElement('div');
        div.innerText = beer.name;
        addImage(div, beer);
        divContainer.appendChild(div);
    })
}

const addImage = function (div, beer) {
    const image = document.createElement('img');
    image.src = beer.image_url;
    image.width = 50;
    image.height = 120;
    div.appendChild(image);
}

document.addEventListener('DOMContentLoaded', app);
