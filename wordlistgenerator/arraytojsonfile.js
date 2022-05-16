"use strict";
exports.__esModule = true;
var fs = require("fs");
var oldwordlist_1 = require("./constants/oldwordlist");
var oldvalidGuesses_1 = require("./constants/oldvalidGuesses");
var arrayToJsonFile = function (arr, writeFilePath) {
    var data = JSON.stringify(arr);
    fs.writeFile(writeFilePath, data, function (err) {
        if (err)
            throw err;
    });
};
arrayToJsonFile(oldwordlist_1.WORDS, 'constants/oldwordlist.json');
arrayToJsonFile(oldvalidGuesses_1.VALID_GUESSES, 'constants/oldvalidGuesses.json');
