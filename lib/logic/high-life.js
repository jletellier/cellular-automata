'use strict';
var _ = require('lodash');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    deadState: 0,
    aliveState: 1
};

var HighLife = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(HighLife.prototype, {
    tick: function(grid) {
        var deadState = this.deadState;
        var aliveState = this.aliveState;
        var cells = grid.cells;

        var newStates = {};

        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);
            var neighbors = neighborhood.stateCounts[aliveState];

            if (cellState === aliveState && (!neighbors || neighbors < 2 || neighbors > 3)) {
                newStates[cellIndex] = deadState;
            }

            _.each(neighborhood.states, function(neighborState, neighborIndex) {
                if (newStates[neighborIndex] === undefined) {
                    var neighborNeighbors = mooreNeighborhood(grid, neighborIndex).stateCounts[aliveState];
                    if (neighborNeighbors === 3 || neighborNeighbors === 6) {
                        newStates[neighborIndex] = aliveState;
                    }
                }
            });
        });

        return newStates;
    }
});