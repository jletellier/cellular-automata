var langeroids = require('langeroids');
var _ = langeroids._;

var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer');

var Grid = require('../lib/grid');

var GameOfLife = require('../lib/logic/game-of-life');
var BriansBrain = require('../lib/logic/brians-brain');
var Wireworld = require('../lib/logic/wireworld');
var HighLife = require('../lib/logic/high-life');
var FractalLike = require('../lib/logic/fractal-like');

var demoData = require('./demo-data');

var cm = new ComponentManager();

cm.add(new AnimationLoop());
cm.add(new Canvas2dRenderer({
    canvas: 'canvas',
    width: 600,
    height: 200
}));

cm.add({
    onInit: function() {
        this.automata = {
            'gameOfLife': new GameOfLife(),
            'briansBrain': new BriansBrain(),
            'wireworld': new Wireworld(),
            'highLife': new HighLife(),
            'fractalLike': new FractalLike()
        };

        this.demoRound = Math.floor(Math.random() * demoData.length);
        this.demoIsInitialized = false;

        var animationLoop = this.getComponent('animation-loop');
        this.gridStepTimer = animationLoop.getTimer(125);

        this.grid = new Grid();

        this.initGrid();
    },

    initGrid: function() {
        var data = this.roundData = demoData[this.demoRound];

        this.grid.generation = 0;
        this.grid.clearCells();
        if (data) {
            this.grid.width = data.gridWidth;
            this.grid.height = data.gridHeight;
            this.grid.automaton = this.automata[data.automaton];

            if (data.step) this.gridStepTimer.tDuration = data.step;

            var cells = (data.randomCells) ? this.getRandomCells() : data.cells;

            for (var i = 0; i < cells.length; i++) {
                this.grid.setCell(cells[i][0], cells[i][1], cells[i][2]);
            }
        }

        var renderer = this.getComponent('renderer');
        this.cellWidth = Math.round(renderer.width / this.grid.width);
        this.cellHeight = Math.round(renderer.height / this.grid.height);

        this.demoIsInitialized = true;
    },

    getRandomCells: function() {
        var cells = [];
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                if (Math.random() > 0.92) {
                    cells.push([ x, y, 1 ]);
                }
            }
        }
        return cells;
    },

    onUpdate: function() {
        if (this.gridStepTimer.done(true)) {
            if (!this.demoIsInitialized) {
                this.initGrid();
            }

            if (this.grid.generation >= this.roundData.lifetime) {
                this.demoRound = (this.demoRound + 1) % demoData.length;
                this.demoIsInitialized = false;
            }

            this.grid.update();
        }
    },

    onDraw: function(renderer) {
        var ctx = renderer.ctx;
        renderer.clear('rgb(0,0,0)');

        var borderColors = this.roundData.borderColors;
        if (borderColors.length === 1) ctx.strokeStyle = borderColors[0];

        var fillColors = this.roundData.fillColors;
        if (!fillColors.length) ctx.fillStyle = 'rgba(23, 84, 187, 0.8)';
        else if (fillColors.length === 1) ctx.fillStyle = fillColors[0];

        // draw grid
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var state = this.grid.getCell(x, y);

                if (borderColors.length > 1) {
                    ctx.strokeStyle = borderColors[state || 0];
                }
                if (borderColors.length) {
                    ctx.strokeRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                }

                if (state) {
                    if (fillColors.length > 1) {
                        ctx.fillStyle = fillColors[state];
                    }
                    ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
        }
    }
});

cm.init();