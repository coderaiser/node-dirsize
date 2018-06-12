'use strict';

var util    = require('util'),
    findit  = require('findit'),
    assert  = require('assert'),
    Emitter = require('events').EventEmitter;
    
util.inherits(DirSize, Emitter);
    
module.exports = function(from) {
    var emitter;
    
    assert(typeof from === 'string', 'from should be string!');
    
    emitter = new DirSize(from);
    
    return emitter;
};

function DirSize(from) {
    this._from          = from;
    this._size          = 0;
    this._findFiles(from);
}

DirSize.prototype.abort   = function() {
    this._abort = true;
};

DirSize.prototype._findFiles     = function(filename) {
    var all         = 0,
        self        = this,
        finder      = findit(filename),
        onFind      = function(name, stat) {
            var size = stat.size;
            
            all += size;
            self.emit('size', all, size, name);
            
            if (self._abort)
                finder.stop();
        };
    
    finder.on('file', onFind);
    finder.on('link', onFind);
    
    finder.on('error', function(error) {
        self.emit('error', error, error.path);
    });
    
    finder.on('end', function() {
        self.emit('end');
    });
    
    finder.on('stop', function() {
        self.emit('end');
    });
};
