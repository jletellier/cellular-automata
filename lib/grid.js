'use strict';
var _ = require('underscore');

var defaults = {
    delimiter: '.',
    width: 500,
    height: 500,
    cells: null,
    generation: 0,
    automaton: null
};

var Grid = module.exports = function(options) {
    _.extend(this, defaults, options);

    this.clearCells();
};

_.extend(Grid.prototype, {
    clearCells: function() {
        this.cells = {};
    },

    getCell: function(x, y) {
        return this.cells[x + this.delimiter + y];
    },

    setCell: function(x, y, state) {
        this.cells[x + this.delimiter + y] = state;
    },

    updateStates: function(newStates) {
        var cells = this.cells;

        _.each(newStates, function(state, index) {
            if (state > 0) {
                cells[index] = state;
            }
            else {
                delete cells[index];
            }
        });
    },

    update: function() {
        this.generation++;
        var newStates = this.automaton.tick(this);
        this.updateStates(newStates);
    }
});