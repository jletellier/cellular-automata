'use strict';
var _ = require('underscore');

var defaults = {
    generation: 0,
    grid: null
};

var GridLogic = module.exports = function(options) {
    _.extend(this, defaults, options);

    this.init();
};

_.extend(GridLogic.prototype, {
    init: function() {

    },

    updateStates: function() {
        return {};
    },

    tick: function() {
        this.generation++;

        var cells = this.grid.cells;

        _.each(this.updateStates(), function(state, index) {
            if (state > 0) {
                cells[index] = state;
            }
            else {
                delete cells[index];
            }
        });
    }
});