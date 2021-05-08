const request = require('request');
const api_key = '';
const region = ['euw1', 'ru']
const pseudo = ['YasuoJaxGodLike', 'Hentai Fiora', 'TheK%C3%AEngOfHell', 'QLF YasuoJax', 'TATO%20M%C3%84LE%20ALPHA', 'JeTeMangeEnKebab', 'CompteSouterrain', 'TheKlondes', 'LeB%C3%A9b%C3%A9DeMichel', 'meinpower'];

function vip(pseudo, region, callback) {

    let API1 = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${pseudo}`;
    const options = {
        'method': 'GET', 'url': API1, 'headers': {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
            "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": `${api_key}`
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        let yolo = JSON.parse(response.body).id;

        let API2 = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${yolo}/by-champion/24?api_key=${api_key}`;


        request(API2, function (error, response) {
            if (error) throw new Error(error);
            let champions = JSON.parse(response.body).championPoints;
            callback(champions);
        });
    });
};

let yolo = 0;
let tg = 0;

function point() {
    if (yolo === 10) {
        console.log('Total de Points sur Jax : ' + tg);
    } else {
        if (yolo === 9) {
            vip(pseudo[yolo], region[1], function (str) { console.log(str); tg = tg + str; })
            yolo++;
            setTimeout(point, 1 * 1000);
        } else {

            vip(pseudo[yolo], region[0], function (str) { console.log(str); tg = tg + str; })
            yolo++;
            setTimeout(point, 1 * 1000);
        };
    }
};

point();
