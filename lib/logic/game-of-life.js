'use strict';
var _ = require('lodash');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    deadState: 0,
    aliveState: 1
};

var GameOfLife = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(GameOfLife.prototype, {
    tick: function(grid) {
        var deadState = this.deadState;
        var aliveState = this.aliveState;
        var cells = grid.cells;

        var newStates = {};

        // iterate through all living cells and their dead neighbors
        // inspired by https://github.com/fkling/Game-of-Life
        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);
            var neighbors = neighborhood.stateCounts[aliveState];

            // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
            // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
            if (cellState === aliveState && (!neighbors || neighbors < 2 || neighbors > 3)) {
                newStates[cellIndex] = deadState;
            }

            _.each(neighborhood.states, function(neighborState, neighborIndex) {
                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if (newStates[neighborIndex] === undefined &&
                        mooreNeighborhood(grid, neighborIndex).stateCounts[aliveState] === 3) {
                    newStates[neighborIndex] = aliveState;
                }
            });

            // 2. Any live cell with two or three live neighbours lives on to the next generation.
            // ... so nothing changes since we are already iterating through living cells
        });

        return newStates;
    }
});