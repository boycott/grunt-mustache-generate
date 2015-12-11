'use strict';
var fs = require('fs'),
    path = require('path');
/**
 * Gets JSON data.
 *
 * @param file {String} Location of JSON file.
 *
 * @return data {Object} Javascript object data.
*/
module.exports = function (file, copy) {
    var fullpath = path.join(process.cwd(), file),
        dir      = path.dirname(fullpath),
        data     = getFile(fullpath);

    if (typeof copy === 'undefined') {
        copy = {};
    }

    for (var key in data.copy) {
        var file; 
        if (data.copy.hasOwnProperty(key)) {
            file = data.copy[key];
            copy[key] = getCopy(path.join(dir, file + (path.extname(file) ? '' : '.json')));
        }
    }
    return {
        copy: copy,
        content: applyCopy(data, copy)
    };
};

function getFile (file) {
    var data = {};
    try {
        data = require(file);
    } catch (e) {
        console.error(e.message);
    }
    return data;
};

function getCopy (file) {
    var copy = {},
        script = fs.readFileSync(file, 'utf-8'),
        object = script
            .replace(/^[^{]+/, '')
            .replace(/[^}]+$/, '');

    try {
        copy = JSON.parse(object);
    } catch (e) {
        console.error(e.message);
    }

    return copy;
}

function applyCopy (json, copy) {
    return JSON.parse(
        JSON.stringify(json).replace(/`(.*?)`/g, function (match, key) {
            var value = copy,
                map = key.split('.');

            for (var i = 0, max = map.length; i < max; i++) {
                if (!value[map[i]] || value[map[i]] === 'undefined') {
                    break;
                }
                value = value[map[i]];
            }

            return (typeof value === 'string' ? value : match);
        })
    );
}
