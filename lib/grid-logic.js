'use strict';
var _ = require('underscore');

var GameOfLife = require('./logic/game-of-life.js');

var defaults = {
    grid: null
};

var GridLogic = module.exports = function(options) {
    _.extend(this, defaults, options);

    this.init();
};

_.extend(GridLogic.prototype, {
    init: function() {
        this.gameOfLife = new GameOfLife();
    },

    updateStates: function() {
        return this.gameOfLife.tick(this.grid);
    },

    tick: function() {
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