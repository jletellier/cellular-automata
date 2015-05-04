'use strict';
var _ = require('lodash');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    offState: 0,
    onState: 1,
    dyingState: 2
};

var BriansBrain = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(BriansBrain.prototype, {
    tick: function(grid) {
        var self = this;
        var cells = grid.cells;

        var newStates = {};

        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);

            if (cellState === self.onState) {
                newStates[cellIndex] = self.dyingState;
            }
            else if (cellState === self.dyingState) {
                newStates[cellIndex] = self.offState;
            }

            _.each(neighborhood.states, function(neighborState, neighborIndex) {
                if (newStates[neighborIndex] === undefined &&
                        mooreNeighborhood(grid, neighborIndex).stateCounts[self.onState] === 2) {
                    newStates[neighborIndex] = self.onState;
                }
            });
        });

        return newStates;
    }
});