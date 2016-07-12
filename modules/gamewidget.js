/**
	Install a GameWidget in the specified DOM container. A GameWidget
	is an user interface for playing Conway's Game of Life. It contains
	a game board component, where the game itself is visualized,
	a start/stop button, and a list of buttons that create preset
	patterns on the game board.

	@param domContainer a jQuery wrapper around a single empty div element to 
	install the GameWidget in
	@param {Game} game  the Game object to use as a model for the Game of Life being 
	displayed and interacted with
**/
GameWidget_install = function(domContainer, game) {
	var leftElm = $("<div id='game-left'>");
	var rightElm = $("<div id='game-right'>");

	/* Boolean that keeps track of whether the game of life is running or not */
	var isRunning = false;
	var interval = null;

	domContainer.append(leftElm);
	domContainer.append(rightElm);

	var tableElm = $("<table>");
	leftElm.append(tableElm);

	/* Add start button */
	var startElem = $("<button type='button' id='startButton'>Start</button>");
	rightElm.append(startElem);

	startElem.click(function(){
		if ($(this).html() === 'Start'){
			isRunning = true;
			$(this).html('Stop');
			interval = setInterval(function(){
				  game.updateGame();
				}, 200);
		} else {
			isRunning = false;
			$(this).html('Start');
			clearInterval(interval);
		}
	});

	/* Add presets */
	var presetsElm = $("<table id='presets-table'>");
	presetsElm.append($("<tr><td id='presets-header'>Preset Boards</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='blinker'>Blinker</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='toad'>Toad</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='beacon'>Beacon</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='pulsar'>Pulsar</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='glider'>Glider</td></tr>"));
	presetsElm.append($("<tr><td class='presets-row' id='lwss'>Lightweight Spaceship</td></tr>"));
	rightElm.append(presetsElm);

	$("#blinker").click(function(){
		if (!isRunning){game.buildBlinker();}
	});

	$("#toad").click(function(){
		if (!isRunning){game.buildToad();}
	});

	$("#beacon").click(function(){
		if (!isRunning){game.buildBeacon();}
	});

	$("#pulsar").click(function(){
		if (!isRunning){game.buildPulsar();}
	});

	$("#glider").click(function(){
		if (!isRunning){game.buildGlider();}
	});

	$("#lwss").click(function(){
		if (!isRunning){game.buildLwss();}
	});

	/* Game redrawing method */
	var rebuildGame = function(){
		var newTableElm = $("<table id='game-widget'>");

		$.each(game.getBoard(), function(y, row){
			var rowElm = $("<tr>");
			newTableElm.append(rowElm);
			$.each(row, function(x, cell){
				if (cell === 1){
					var newCellElm = $("<td class='live-cell'>");
					rowElm.append(newCellElm);
					newCellElm.click(function(){
						if (!isRunning){game.setDead(x, y);}
					});

				} else {
					var newCellElm = $("<td class='dead-cell'>");
					rowElm.append(newCellElm);
					newCellElm.click(function(){
						if (!isRunning){game.setLive(x, y);}
					});
				}
				
			});
		});

		tableElm.replaceWith(newTableElm);
		tableElm = newTableElm;
	}

	rebuildGame();
	game.subscribe(function() {
    	rebuildGame();
  	});
}