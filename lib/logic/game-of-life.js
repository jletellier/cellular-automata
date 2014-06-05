'use strict';
var _ = require('underscore');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    state: 1
};

// requires moore neighborhood discovery method
var GameOfLife = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(GameOfLife.prototype, {
    tick: function(grid) {
        var ownState = this.state;
        var cells = grid.cells;

        var newStates = {};

        // iterate through all living cells and their dead neighbors
        // inspired by https://github.com/fkling/Game-of-Life
        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);
            var neighbors = neighborhood.stateCounts[ownState];

            // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
            // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
            if (cellState === ownState && (!neighbors || neighbors < 2 || neighbors > 3)) {
                newStates[cellIndex] = 0;
            }

            _.each(neighborhood.states, function(neighborState, neighborIndex) {
                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if (newStates[neighborIndex] === undefined &&
                        mooreNeighborhood(grid, neighborIndex).stateCounts[ownState] === 3) {
                    newStates[neighborIndex] = 1;
                }
            });

            // 2. Any live cell with two or three live neighbours lives on to the next generation.
            // ... so nothing changes since we are already iterating through living cells
        });

        return newStates;
    }
});