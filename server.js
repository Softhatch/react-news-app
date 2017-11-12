const express = require("express");
const axios = require("axios");

const app = express();

const newsapi = 'https://newsapi.org/v1';
const apikey = '5a41d13f76c94e1e843dea2fc51580b8';

app.set("port", process.env.PORT || 3001);

app.get("/news/sources", (req, res) => {
    let queryString = '';
    if (Object.keys(req.query).length > 0) {
        Object.keys(req.query).forEach(key => {
            queryString += (key + '=' + req.query[key] + '&');
        });
    }

    return axios.get(`${newsapi}/sources?${queryString}`)
        .then(function (response) {
            if (!(response.status >= 200 && response.status < 300)) {
                return res.send(" API not found");
            }
            return response;
        })
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (response) {
            return res.status(400).send(response.response.data);
        });
});

app.get("/news/articles", (req, res) => {
    let queryString = '';

    if (Object.keys(req.query).length > 0) {
        Object.keys(req.query).forEach(key => {
            queryString += (key + '=' + req.query[key] + '&');
        });
    }

    return axios.get(`${newsapi}/articles?${queryString}apiKey=${apikey}`)
        .then(function (response) {
            if (!(response.status >= 200 && response.status < 300)) {
                return res.send(" API not found");
            }
            return response;
        })
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (response) {
            return res.status(400).send(response.response.data);
        });
});

app.listen(app.get("port"), () => {
    console.log('Server started'); // eslint-disable-line no-console
});