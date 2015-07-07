#!/usr/bin/env node

(function() {
    'use strict';
    
    var dirsize     = require('..'),
        path        = require('path'),
        glob        = require('glob'),
        format      = require('format-io'),
        args        = process.argv.slice(2),
        arg         = args[0];
        
    if (/^-(v|-version)$/.test(arg))
        version();
    else if (!arg || /^-(h|-help)$/.test(arg))
        help();
    else
        glob(arg, function(error, names) {
            var from,
                name = names[0];
            
            if (!name)
                error = Error('not found');
            else if (~name.indexOf('/'))
                from    = name;
            else
                from    = path.join(process.cwd(), name);
            
            if (error)
                console.error(error.message);
            else
                main(from);
        });
       
    function main(from) {
        var size,
            n = 0;
        
        size = dirsize(from);
        
        size.on('error', function(error, name) {
            console.error(name, ':', error.message);
        });
        
        size.on('size', function(value) {
            var sz  = format.size(value),
                len = sz.length;
            
            if (n < len)
                n   = len; 
            else if (n >= len)
                sz  = addSpaces(n, sz);
            
            process.stdout.write('\r' + sz);
        });
        
        size.on('end', function() {
            process.stdout.write('\n');
        });
    }
    
    function addSpaces(n, str) {
        var spaces  = Array(n - str.length + 1).join(' ');
        
        str         = str.concat(spaces);
        
        return str;
    }
    
    function version() {
        console.log('v' + info().version);
    }
    
    function info() {
        return require('../package');
    }
    
    function help() {
        var bin         = require('../json/bin'),
            usage       = 'Usage: ' + info().name + ' [path]';
            
        console.log(usage);
        console.log('Options:');
        
        Object.keys(bin).forEach(function(name) {
            var line = '  ' + name + ' ' + bin[name];
            console.log(line);
        });
    }
})();
