/**
	Create a Game object. A Game contains information about the 
	Conway's Game of Life board. It keeps track of whether the
	cells are dead or alive.
	@constructor
**/
var Game = function(width, height) {
	var that = Object.create(Game.prototype);
	var interval = null;

	/* Makes a game board where all cells are dead */
	var makeNewBoard = function(){
		var newCells = new Array(height);
		for (var i = 0; i<height; i++){
			newCells[i] = new Array(width).fill(0);
		}
		return newCells;
	}

	var cells = makeNewBoard();
	var subscribers = [];
	/**
		Subscribe to changes to this object.
		@param subscriber a function that is callled whenever
		Game is changed
	**/
	that.subscribe = function(subscriber){
		subscribers.push(subscriber);
	}

	var publishChanges = function() {
		subscribers.forEach(function(subscriberFunc){
			subscriberFunc();
		});
	};

	/**
		Set a cell to a live state.
		@param {int} x, y values of the cell, which translate to
		x - index in the array (column)
		y - index of the array in the 2D array (row)
	**/
	that.setLive = function(x, y){
		cells[y][x] = 1;
		publishChanges();
	}

	/**
		Set a cell to a dead state.
		@param {int} x, y values of the cell, which translate to
		x - index in the array (column)
		y - index of the array in the 2D array (row)
	**/
	that.setDead = function(x, y){
		cells[y][x] = 0;
		publishChanges();
	}

	/**
		Returns the 2D array of cells that represent the game cells.
	**/
	that.getBoard = function(){
		return cells;
	}

	/**
		Update the game a timestep according to the rules of 
		Conway's game of life. There are five possible courses of action:
		1) The cell was alive but has <2 live neighbors so is now dead
		2) The cell was alive but had >3 live neighbors so is now dead
		3) The cell was dead but had 3 live neighbors so is now alive
		4) The cell was alive and had 2,3 live neighbors so is still alive
		5) the cell was dead but had not 3 live neighbors so it is still dead
	**/
	that.updateGame = function(){
		// Initialize 2D array
		var newCells = makeNewBoard();

		for (var i = 0; i<height; i++){
			for (var j = 0; j<width; j++){
				newCells[i][j] = updateCell(j, i);
			}
		}

		cells = newCells;
		publishChanges();
	}

	// Resets the board so that all cells are dead.
	var resetBoard = function(){
		cells = makeNewBoard();
	}



	// Retrieves the number of live neighbors of the x,y cell
	var getLiveNeighbors = function(x, y){
		var liveCount = 0;
		var offsets = [-1,0,1];
		offsets.forEach(function(dx){
			offsets.forEach(function(dy){
				if (dx === 0 && dy === 0){}
				else if ((y+dy < 0) || (x+dx < 0) || (y+dy > height - 1) || (x+dx 
					> width - 1)){}
				else {
					if (cells[y+dy][x+dx] === 1){
						liveCount += 1;
					}
				}
			});
		});
		return liveCount;
	}

	// Updates one cell based on Conway's rules.
	var updateCell = function(x, y){
		var liveCount = getLiveNeighbors(x, y);

		if (cells[y][x] === 1){
			if (liveCount < 2){ return 0; }
			else if (liveCount > 3){ return 0; } 
			else { return 1;}
		} else {
			if (liveCount === 3){ return 1; } 
			else { return 0;}
		}
	}


	/* Preset generation methods 
		All patterns are taken from https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
		in the Examples of patterns section.
	*/

	/* Generates a blinker pattern on the game board. */
	that.buildBlinker = function(){
		resetBoard();
		cells[6][11] = 1;
		cells[7][11] = 1;
		cells[8][11] = 1;
		publishChanges();
	}

	/* Generates a toad pattern on the game board. */
	that.buildToad = function(){
		resetBoard();
		cells[6][10] = 1;
		cells[6][11] = 1;
		cells[6][12] = 1;
		cells[7][9] = 1;
		cells[7][10] = 1;
		cells[7][11] = 1;
		publishChanges();
	}

	/* Generates a beacon pattern on the game board. */
	that.buildBeacon = function(){
		resetBoard();
		cells[6][10] = 1;
		cells[6][11] = 1;
		cells[7][10] = 1;
		cells[8][13] = 1;
		cells[9][12] = 1;
		cells[9][13] = 1;
		publishChanges();
	}

	/* Generates a pulsar pattern on the game board. */
	that.buildPulsar = function(){
		resetBoard();
		rows = [2, 7, 9, 14];
		rowCols = [8,9,10,14,15,16];

		cols = [6, 11, 13, 18];
		colRows = [4,5,6,10,11,12];

		rows.forEach(function(row){
			rowCols.forEach(function(col){
				cells[row][col] = 1;
			});
		});

		cols.forEach(function(col){
			colRows.forEach(function(row){
				cells[row][col] = 1;
			})
		})

		publishChanges();
	}

	/* Generates a glider pattern on the game board. */
	that.buildGlider = function(){
		resetBoard();
		cells[2][5] = 1;
		cells[2][7] = 1;
		cells[3][6] = 1;
		cells[3][7] = 1;
		cells[4][6] = 1;
		publishChanges();
	}

	/* Generates a lightweight spaceship pattern on the game board. */
	that.buildLwss = function(){
		resetBoard();
		cells[1][1] = 1;
		cells[3][1] = 1;
		cells[4][2] = 1;
		cells[4][3] = 1;
		cells[1][4] = 1;
		cells[4][4] = 1;
		cells[2][5] = 1;
		cells[3][5] = 1;
		cells[4][5] = 1;
		publishChanges();
	}

	Object.freeze(that);
	return that;
}
