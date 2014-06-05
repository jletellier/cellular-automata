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
    var neighborIndices = [
        (x - 1) + delimiter + (y - 1),
        (x - 1) + delimiter + (y),
        (x - 1) + delimiter + (y + 1),
        (x) + delimiter + (y - 1),
        (x) + delimiter + (y + 1),
        (x + 1) + delimiter + (y - 1),
        (x + 1) + delimiter + (y),
        (x + 1) + delimiter + (y + 1)
    ];

    for (var i = 0; i < neighborIndices.length; i++) {
        var neighborIndex = neighborIndices[i];
        var cellState = cells[neighborIndex];

        n.states[neighborIndex] = cellState;
        n.stateCounts[cellState] = (n.stateCounts[cellState] > 0) ? n.stateCounts[cellState] + 1 : 1;
    }

    return n;
};