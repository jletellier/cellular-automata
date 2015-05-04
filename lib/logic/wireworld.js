'use strict';
var _ = require('lodash');

var mooreNeighborhood = require('./moore-neighborhood.js');

var defaults = {
    emptyState: 0,
    headState: 1,
    tailState: 2,
    conductorState: 3
};

var Wireworld = module.exports = function(options) {
    _.extend(this, defaults, options);
};

_.extend(Wireworld.prototype, {
    tick: function(grid) {
        var self = this;
        var cells = grid.cells;

        var newStates = {};

        _.each(cells, function(cellState, cellIndex) {
            var neighborhood = mooreNeighborhood(grid, cellIndex);
            var headNeighbors = neighborhood.stateCounts[self.headState];

            if (cellState === self.headState) {
                newStates[cellIndex] = self.tailState;
            }
            else if (cellState === self.tailState) {
                newStates[cellIndex] = self.conductorState;
            }
            else if (cellState === self.conductorState && (headNeighbors === 1 || headNeighbors === 2)) {
                newStates[cellIndex] = self.headState;
            }
        });

        return newStates;
    }
});