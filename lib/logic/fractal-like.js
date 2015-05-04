'use strict';
var _ = require('lodash');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    offState: 0,
    onState: 1,
    headState: 2,
    tailState: 3
};

// TODO: find a proper name for this automaton

var FractalLike = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(FractalLike.prototype, {
    tick: function(grid) {
        var self = this;
        var cells = grid.cells;

        var newStates = {};

        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);

            if (cellState === self.headState) {
                newStates[cellIndex] = self.tailState;
            }
            else if (cellState === self.tailState) {
                newStates[cellIndex] = self.onState;
            }

            _.each(neighborhood.states, function(neighborState, neighborIndex) {
                if (newStates[neighborIndex] === undefined) {
                    var nN = mooreNeighborhood(grid, neighborIndex);
                    if (nN.stateCounts[self.headState] === 1) {
                        newStates[neighborIndex] = self.headState;
                    }
                }
            });
        });

        return newStates;
    }
});