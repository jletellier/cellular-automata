module.exports = [
    // demo round 0
    {
        gridWidth: 30,
        gridHeight: 10,
        automaton: 'gameOfLife',
        lifetime: 55,
        borderColors: [ 'rgba(23,84,187,0.3)' ],
        fillColors: [ 'rgba(23, 84, 187, 0.8)' ],
        cells: [
            // Beehive
            [ 9, 0, 1 ],
            [ 10, 0, 1 ],
            [ 8, 1, 1 ],
            [ 11, 1, 1 ],
            [ 9, 2, 1 ],
            [ 10, 2, 1 ],

            // Boat
            [ 17, 0, 1 ],
            [ 18, 0, 1 ],
            [ 17, 1, 1 ],
            [ 18, 2, 1 ],
            [ 19, 1, 1 ],

            // Beacon
            [ 0, 0, 1 ],
            [ 1, 0, 1 ],
            [ 0, 1, 1 ],
            [ 1, 1, 1 ],
            [ 2, 2, 1 ],
            [ 3, 2, 1 ],
            [ 2, 3, 1 ],
            [ 3, 3, 1 ],

            // Blinker
            [ 26, 3, 1 ],
            [ 26, 4, 1 ],
            [ 26, 5, 1 ],

            // Lightweight Spaceship
            [ 5, 6, 1 ],
            [ 6, 6, 1 ],
            [ 7, 6, 1 ],
            [ 8, 6, 1 ],
            [ 4, 7, 1 ],
            [ 4, 9, 1 ],
            [ 7, 9, 1 ],
            [ 8, 7, 1 ],
            [ 8, 8, 1 ]
        ]
    },
    // demo round 1
    {
        gridWidth: 120,
        gridHeight: 40,
        automaton: 'briansBrain',
        lifetime: 100,
        borderColors: [],
        fillColors: [
            '',
            'rgba(23, 187, 84, 0.8)',
            'rgba(23, 187, 84, 0.3)'
        ],
        randomCells: true
    }
];