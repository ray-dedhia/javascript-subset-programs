var sleep;
sleep = require("./sleep.js");

function print_board(rows, cols, grid) {
    /****************************************************
    * Print board to console
    ****************************************************/
    // clear console
    console.clear();
    // print board
    var i;
    i = 0;
    while (i < rows) {
        var row_string;
        row_string = "";
        var j;
        j = 0;
        while (j < cols) {
            if (grid[i][j] == 1) {
                row_string = row_string + "O";
            } else {
                row_string = row_string + " ";
            }
            j = j + 1;
        }
        console.log(row_string);
        i = i + 1;
    }
}

function apply_rules(row, col, rows, cols, grid, next_grid) {
    /****************************************************
    * Rules
    * - Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    * - Any live cell with two or three live neighbours lives on to the next generation.
    * - Any live cell with more than three live neighbours dies, as if by overcrowding.
    * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    ****************************************************/
    var num_neighbors;
    num_neighbors = count_neighbors(grid, row, col, rows, cols);
    if (grid[row][col] == 1) {
        if (num_neighbors < 2) {
            next_grid[row][col] = 0;
        } else if (num_neighbors == 2 || num_neighbors == 3) {
            next_grid[row][col] = 1;
        } else if (num_neighbors > 3) {
            next_grid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (num_neighbors == 3) {
                next_grid[row][col] = 1;
        }
    }
    return [grid, next_grid];
}
    
function count_neighbors(grid, row, col, rows, cols) {
    /****************************************************
    * Return number of "living" neighbors
    ****************************************************/
    var count;
    count = 0;
    if (row-1 >= 0) {
        if (grid[row-1][col] == 1) {
            count = count + 1;
        }
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] == 1) {
            count = count + 1;
        }
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] == 1) {
            count = count + 1;
        }
    }
    if (col-1 >= 0) {
        if (grid[row][col-1] == 1) {
            count = count + 1;
        }
    }
    if (col+1 < cols) {
        if (grid[row][col+1] == 1) {
            count = count + 1;
        }
    }
    if (row+1 < rows) {
        if (grid[row+1][col] == 1) {
            count = count + 1;
        }
    }
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] == 1) {
            count = count + 1;
        }
    }
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] == 1) {
            count = count + 1;
        }
    }
    return count;
}

function compute_next_gen(rows, cols, grid, next_grid) {
    /****************************************************
    * Return values of grid and next_grid in next round
    ****************************************************/
    var i;
    i = 0;
    while (i < rows) {
        var j;
        j = 0;
        while (j < cols) {
            var grids;
            grids = apply_rules(i, j, rows, cols, grid, next_grid);
            grid = grids[0];
            next_grid = grids[1];
            j = j + 1;
        }
        i = i + 1;
    }

    i = 0;
    while (i < rows) {
        var j;
        j = 0;
        while (j < cols) {
            grid[i][j] = next_grid[i][j];
            next_grid[i][j] = 0;
            j = j + 1;
        }
        i = i + 1;
    }
    return [grid, next_grid];
}

function randomize_board(rows, cols, grid, next_grid) {
    /****************************************************
    * Randomize grid and set next_grid to zeros
    ****************************************************/
    var i;
    i = 0;
    while (i < rows) {
        var j;
        j = 0;
        while (j < cols) {
            var is_live;
            is_live = Math.round(Math.random());
            if (is_live == 1) {
                grid[i][j] = 1;
            } else {
                grid[i][j] = 0;
            }
            next_grid[i][j] = 0;
            j = j + 1;
        }
        i = i + 1;
    }
    return [grid, next_grid];
}

var start_cgol;
start_cgol = function(rows, cols) {
    /****************************************************
    * Start Conway's Game of Life
    ****************************************************/
    // set variables
    var playing;
    playing = true;
    var reproduction_time;
    reproduction_time = 500;

    // initialize grids
    var grid;
    grid = new Array(rows);
    var next_grid;
    next_grid = new Array(rows);
    var i;
    i = 0;
    while (i < rows) {
        grid[i] = new Array(cols);
        next_grid[i] = new Array(cols);
        i = i + 1;
    }
    var grids;
    grids = randomize_board(rows, cols, grid, next_grid);
    grid = grids[0];
    next_grid = grids[1];

    // start game
    while (playing) {
        grids = compute_next_gen(rows, cols, grid, next_grid);
        grid = grids[0];
        next_grid = grids[1];
        print_board(rows, cols, grid);
        sleep(reproduction_time);
    }
}

module.exports = { start_cgol };
