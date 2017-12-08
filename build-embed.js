#!/usr/bin/env node

var fs = require('fs')
var worker = fs.readFileSync('dist/worker.js', 'utf8')
var binary = fs.readFileSync('dist/mp3gain-bin.js', 'utf8')
var embed = fs.readFileSync('dist/mp3gain.js', 'utf8')

var data = embed.replace('%MP3GAINWORKER%', new Buffer(worker).toString('base64')).replace('%MP3GAINBINARY%', new Buffer(binary).toString('base64'))

fs.writeFileSync('dist/mp3gain.js', data)
