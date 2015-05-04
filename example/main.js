var langeroids = require('langeroids');
var _ = langeroids._;

var ComponentManager = require('langeroids/lib/component-manager');
var AnimationLoop = require('langeroids/lib/animation-loop');

var PIXI = require('pixi.js');

var Grid = require('../lib/grid');

var GameOfLife = require('../lib/logic/game-of-life');
var BriansBrain = require('../lib/logic/brians-brain');
var Wireworld = require('../lib/logic/wireworld');
var HighLife = require('../lib/logic/high-life');
var FractalLike = require('../lib/logic/fractal-like');

var demoData = require('./demo-data');

var cm = new ComponentManager();

cm.add(new AnimationLoop());

cm.add({
    onInit: function() {
        this.renderer = new PIXI.WebGLRenderer(300, 100);
        document.body.appendChild(this.renderer.view);

        this.graphics = new PIXI.Graphics();

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

        this.cellWidth = Math.round(this.renderer.width / this.grid.width);
        this.cellHeight = Math.round(this.renderer.height / this.grid.height);

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
        this.draw();
    },

    draw: function() {
        var graphics = this.graphics;
        graphics.clear();

        var borderColors = this.roundData.borderColors;
        if (borderColors.length === 1) {
            graphics.lineStyle(1, borderColors[0][0], borderColors[0][1]);
        }

        var fillColors = this.roundData.fillColors;
        if (!fillColors.length) fillColors = [ [ 0, 0 ], [ 0x1754bb, 0.8 ] ];

        // draw grid
        for (var y = 0; y < this.grid.height; y++) {
            for (var x = 0; x < this.grid.width; x++) {
                var state = this.grid.getCell(x, y);

                if (borderColors.length > 1) {
                    graphics.lineStyle(1, borderColors[state || 0][0], borderColors[state || 0][1]);
                }

                if (state) {
                    graphics.beginFill(fillColors[state][0], fillColors[state][1]);
                }
                graphics.drawRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                graphics.endFill();
            }
        }

        this.renderer.render(this.graphics);
    }
});

cm.init();