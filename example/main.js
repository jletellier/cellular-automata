var langeroids = require('langeroids/lib/langeroids.js');
var _ = langeroids._;
var Game = require('langeroids/lib/game.js');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer.js');
var Timer = require('langeroids/lib/timer.js');

var Grid = require('../lib/grid.js');
var GridLogic = require('../lib/grid-logic.js');

var GameOfLife = require('../lib/logic/game-of-life.js');
var BriansBrain = require('../lib/logic/brians-brain.js');
var Wireworld = require('../lib/logic/wireworld.js');
var HighLife = require('../lib/logic/high-life.js');

var demoData = require('./demo-data.js');

_.extend(GridLogic.prototype, {
    init: function() {
        this.automata = {
            'gameOfLife': new GameOfLife(),
            'briansBrain': new BriansBrain(),
            'wireworld': new Wireworld(),
            'highLife': new HighLife()
        };
        this.currentAutomaton = 'gameOfLife';
    },

    updateStates: function() {
        return this.automata[this.currentAutomaton].tick(this.grid);
    }
});

(function() {
    var game = new Game();

    game.addComponent(new Canvas2dRenderer({
        canvas: 'canvas'
    }));

    game.addComponent({
        onInit: function(game) {
            this.demoRound = 0;
            this.demoIsInitialized = false;
            this.gridStepTimer = new Timer({ game: game, tDuration: 125 });

            this.grid = new Grid();
            this.gridLogic = new GridLogic({
                grid: this.grid
            });

            this.initGrid();
        },

        initGrid: function() {
            var data = this.roundData = demoData[this.demoRound];

            this.gridLogic.generation = 0;
            this.grid.clearCells();
            if (data) {
                this.grid.width = data.gridWidth;
                this.grid.height = data.gridHeight;
                this.gridLogic.currentAutomaton = data.automaton;

                if (data.step) this.gridStepTimer.tDuration = data.step;

                var cells = (data.randomCells) ? this.getRandomCells() : data.cells;

                for (var i = 0; i < cells.length; i++) {
                    this.grid.setCell(cells[i][0], cells[i][1], cells[i][2]);
                }
            }

            var renderer = game.getComponent('renderer');
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
            if (this.gridStepTimer.done()) {
                if (!this.demoIsInitialized) {
                    this.initGrid();
                }

                if (this.gridLogic.generation >= this.roundData.lifetime) {
                    this.demoRound = (this.demoRound + 1) % demoData.length;
                    this.demoIsInitialized = false;
                }

                this.gridLogic.tick();
                this.gridStepTimer.repeat();
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

    game.start();
})();