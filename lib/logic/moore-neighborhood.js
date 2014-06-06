'use strict';

module.exports = function mooreNeighborhood(grid, cellIndex) {
    var n = {
        states: {},
        stateCounts: {}
    };
    var cells = grid.cells;
    var delimiter = grid.delimiter;

    var xy = cellIndex.split(delimiter);
    var x = parseFloat(xy[0]);
    var y = parseFloat(xy[1]);

    // TODO: use modulo to transform the grid into a sphere
    var west = (x - 1 + grid.width) % grid.width;
    var east = (x + 1) % grid.width;
    var north = (y - 1 + grid.height) % grid.height;
    var south = (y + 1) % grid.height;

    var neighborIndices = [
        west + delimiter + north,
        west + delimiter + (y),
        west + delimiter + south,
        (x) + delimiter + north,
        (x) + delimiter + south,
        east + delimiter + north,
        east + delimiter + (y),
        east + delimiter + south
    ];

    for (var i = 0; i < neighborIndices.length; i++) {
        var neighborIndex = neighborIndices[i];
        var cellState = cells[neighborIndex];

        n.states[neighborIndex] = cellState;
        n.stateCounts[cellState] = (n.stateCounts[cellState] > 0) ? n.stateCounts[cellState] + 1 : 1;
    }

    return n;
};