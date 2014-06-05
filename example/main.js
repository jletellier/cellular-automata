var langeroids = require('langeroids/lib/langeroids.js');
var Game = require('langeroids/lib/game.js');
var Canvas2dRenderer = require('langeroids/lib/canvas-2d-renderer.js');
var Timer = require('langeroids/lib/timer.js');

var Grid = require('../lib/grid.js');
var GridLogic = require('../lib/grid-logic.js');

(function() {
    var game = new Game();

    game.addComponent(new Canvas2dRenderer({
        canvas: 'canvas'
    }));

    game.addComponent({
        onInit: function(game) {
            this.grid = new Grid({
                width: 30,
                height: 13
            });

            // Glider
            /*
            this.grid.setCell(6, 5, 1);
            this.grid.setCell(7, 5, 1);
            this.grid.setCell(5, 6, 1);
            this.grid.setCell(7, 6, 1);
            this.grid.setCell(7, 7, 1);
            */

            // Beehive
            this.grid.setCell(9, 0, 1);
            this.grid.setCell(10, 0, 1);
            this.grid.setCell(8, 1, 1);
            this.grid.setCell(11, 1, 1);
            this.grid.setCell(9, 2, 1);
            this.grid.setCell(10, 2, 1);

            // Boat
            this.grid.setCell(17, 0, 1);
            this.grid.setCell(18, 0, 1);
            this.grid.setCell(17, 1, 1);
            this.grid.setCell(18, 2, 1);
            this.grid.setCell(19, 1, 1);

            // Beacon
            this.grid.setCell(0, 0, 1);
            this.grid.setCell(1, 0, 1);
            this.grid.setCell(0, 1, 1);
            this.grid.setCell(1, 1, 1);
            this.grid.setCell(2, 2, 1);
            this.grid.setCell(3, 2, 1);
            this.grid.setCell(2, 3, 1);
            this.grid.setCell(3, 3, 1);

            // Blinker
            this.grid.setCell(26, 3, 1);
            this.grid.setCell(26, 4, 1);
            this.grid.setCell(26, 5, 1);

            // Lightweight Spaceship
            this.grid.setCell(5, 6, 1);
            this.grid.setCell(6, 6, 1);
            this.grid.setCell(7, 6, 1);
            this.grid.setCell(8, 6, 1);
            this.grid.setCell(4, 7, 1);
            this.grid.setCell(4, 9, 1);
            this.grid.setCell(7, 9, 1);
            this.grid.setCell(8, 7, 1);
            this.grid.setCell(8, 8, 1);

            this.gridLogic = new GridLogic({
                grid: this.grid
            });

            var renderer = game.getComponent('renderer');
            this.cellWidth = Math.round(renderer.width / this.grid.width);
            this.cellHeight = Math.round(renderer.height / this.grid.height);

            this.gridStepTimer = new Timer({ game: game, tDuration: 125 });
        },

        onUpdate: function() {
            if (this.gridStepTimer.done()) {
                this.gridLogic.tick();
                this.gridStepTimer.repeat();
            }
        },

        onDraw: function(renderer) {
            var ctx = renderer.ctx;
            renderer.clear('rgb(0,0,0)');

            // draw grid
            ctx.strokeStyle = 'rgba(23,84,187,0.5)';
            ctx.fillStyle = 'rgba(23, 84, 187, 0.8)';
            for (var y = 0; y < this.grid.height; y++) {
                for (var x = 0; x < this.grid.width; x++) {
                    ctx.strokeRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                    if (this.grid.getCell(x, y)) {
                        ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                    }
                }
            }
        }
    });

    game.start();
})();