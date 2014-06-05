'use strict';
var _ = require('underscore');

var defaults = {
    delimiter: '.',
    width: 500,
    height: 500,
    cells: null
};

var Grid = module.exports = function(options) {
    _.extend(this, defaults, options);

    this.cells = {};
};

_.extend(Grid.prototype, {
    getCell: function(x, y) {
        return this.cells[x + this.delimiter + y];
    },

    setCell: function(x, y, state) {
        this.cells[x + this.delimiter + y] = state;
    }
});