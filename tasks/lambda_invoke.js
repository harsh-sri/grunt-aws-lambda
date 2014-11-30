/*
 * grunt-aws-lambda
 * https://github.com/Tim-B/grunt-aws-lambda
 *
 * Copyright (c) 2014 Tim-B
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');
    var fs = require('fs');


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask('lambda_invoke', [], function () {

        var options = this.options({
            'handler': 'handler',
            'file_name': 'index.js',
            'event': 'event.json'
        });

        console.log("");

        var done = this.async();
        var context = {
            done: function (status, message) {
                var success = status === null;
                console.log("");
                console.log("Message");
                console.log("-------");
                console.log(message);
                done(success)
            }
        }

        var lambda = require(path.resolve(options.file_name));
        var event = JSON.parse(fs.readFileSync(path.resolve(options.event), "utf8"));
        lambda[options.handler](event, context);

    });

};
