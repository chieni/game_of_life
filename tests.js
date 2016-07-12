/*---------------------------------------
setLive tests
*----------------------------------------*/
QUnit.test( "Test setting a cell as alive", function( assert ) {
	var game = Game(3, 3);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[0,0,0]]);

	// Set middle cell
	game.setLive(1,1);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,1,0],[0,0,0]]);

	// Set edge cell
	game.setLive(0,2);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,1,0],[1,0,0]]);

	// Set cell that is already alive
	game.setLive(0,2);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,1,0],[1,0,0]]);
});
/*---------------------------------------
setDead tests
*----------------------------------------*/
QUnit.test( "Test setting a cell as dead", function( assert ) {
	var game = Game(3, 3);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[0,0,0]]);

	// Set a cell that was alive (middle cell)
	game.setLive(1,1);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,1,0],[0,0,0]]);
	game.setDead(1,1);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[0,0,0]]);

	// Set a cell that was live (edge cell)
	game.setLive(0,2);
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[1,0,0]]);
	game.setDead(0,2)
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[0,0,0]]);

	// Set a cell that was already dead
	game.setDead(0,2)
	assert.deepEqual(game.getBoard(), [[0,0,0],[0,0,0],[0,0,0]]);
});

/*---------------------------------------
updateGame tests
*----------------------------------------*/
/* 
The tests for each type of cell will follow this order:
1) The cell was alive but has <2 live neighbors so is now dead
2) The cell was alive but had >3 live neighbors so is now dead
3) The cell was dead but had 3 live neighbors so is now alive
4) The cell was alive and had 2,3 live neighbors so is still alive
5) the cell was dead but had not 3 live neighbors so it is still dead
*/
QUnit.test( "Test updating the game for a corner cell", function( assert ) {
	var game = Game(5, 5);
	// Test 1 [0,0]
	game.setLive(0,0);
	assert.deepEqual(game.getBoard(), [[1,0,0,0,0],
										[0,0,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	// Test 2 - skipped because it is impossible
	// Test 3 [0,0]
	game.setLive(1,0);
	game.setLive(1,1);
	game.setLive(0,1);
	assert.deepEqual(game.getBoard(), [[0,1,0,0,0],
										[1,1,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[1,1,0,0,0],
										[1,1,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	// Test 4 [0,0], Test 5 [4,4]
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[1,1,0,0,0],
										[1,1,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);

});

QUnit.test( "Test updating the game for an edge cell", function( assert ) {
	var game = Game(5, 5);
	// Test 1 [0,2]
	game.setLive(0,2);
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[1,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);
	// Test 2 [0,2], Test 3 [0,3], Test 4 [0,1], Test 5 [0,4]
	game.setLive(0,1);
	game.setLive(0,2);
	game.setLive(1,1);
	game.setLive(1,2);
	game.setLive(1,3);
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[1,1,0,0,0],
										[1,1,0,0,0], 
										[0,1,0,0,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[1,1,0,0,0],
										[0,0,1,0,0], 
										[1,1,0,0,0], 
										[0,0,0,0,0]]);
});

QUnit.test( "Test updating the game for a center cell", function( assert ) {
	var game = Game(5, 5);

	// Test 1 [2,3]
	game.setLive(2,3);
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[0,0,0,0,0], 
										[0,0,1,0,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[0,0,0,0,0], 
										[0,0,0,0,0], 
										[0,0,0,0,0]]);

	// Test 2 [2,3], Test 3 [1,3], Test 4 [3,2], Test 5 [1,1]
	game.setLive(1,2);
	game.setLive(2,2);
	game.setLive(2,3);
	game.setLive(3,2);
	game.setLive(3,3);
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,0,0,0],
										[0,1,1,1,0], 
										[0,0,1,1,0], 
										[0,0,0,0,0]]);
	game.updateGame();
	assert.deepEqual(game.getBoard(), [[0,0,0,0,0],
										[0,0,1,0,0],
										[0,1,0,1,0], 
										[0,1,0,1,0], 
										[0,0,0,0,0]]);

});