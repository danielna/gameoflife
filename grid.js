;(function(exports){

    function Grid(rowsNum, colsNum, threshold) {
        this.rowsNum = rowsNum;
        this.colsNum = colsNum;
        this.threshold = (threshold) ? threshold : 0.1;
        this.grid = this.seed(rowsNum, colsNum);

        this.gui = new Gui('life');
        this.gui.buildTable(rowsNum, colsNum);
        this.displayGrid();

    }

    // Randomly seed a % of the cells to start (10% default, in constructor)
    Grid.prototype.seed = function(rows, cols){
        var grid = [];
        for (var i = 0; i < rows; i++){
            var row = [];
            for (var j = 0; j < cols; j++){
                var cell = new Cell(i, j);
                if (Math.random() <= this.threshold) {
                    cell.live();
                }
                row.push(cell);
            }
            grid.push(row);
        }
        return grid;
    };

    // Because future generation cell state is determined by a snapshot of the previous generation,
    // create a new Grid for every generation.
    Grid.prototype.updateCells = function(fn) {
        var newGrid = [];
        
        for (var i = 0; i < this.rowsNum; i++){    
            var newGridRow = [];
            for (var j = 0; j < this.colsNum; j++){
                var cell = this.grid[i][j],
                    neighbors = this.calculateNeighbors(cell),
                    newCell = new Cell(i, j);

                if (neighbors === 1){
                    newCell.live();
                } 
                else if (neighbors === 0) {
                    newCell.die();
                }

                newGridRow.push(newCell);
            }
            newGrid.push(newGridRow);
        }
        this.grid = newGrid;
    };

    // Print the grid to the console.
    Grid.prototype.printGrid = function() {
      for (var i = 0; i < this.rowsNum; i++){
            var row = "";
            for (var j = 0; j < this.colsNum; j++){
                row += this.grid[i][j].getStatus() + " ";
            }
            console.log("row" + i + ": " + row);
        }  
        console.log("\n");
    };


    // Display the grid in the GUI
    Grid.prototype.displayGrid = function() {
      for (var i = 0; i < this.rowsNum; i++){
            for (var j = 0; j < this.colsNum; j++){
                var cell = this.grid[i][j];
                this.gui.setCell(cell);
            }
        }  
    };

    // Calculate the #neighbors for a given cell, 
    // return its subsequent life/death state.
    // 
    // 0 for dead, 1 for alive, -1 for unchanged.
    Grid.prototype.calculateNeighbors = function(cell){
        var neighborCount = 0;
        var row = cell.row;
        var col = cell.col;
        var isAlive = this.grid[row][col].getStatus();
        var lowerBound = (row - 1 < 0) ? this.rowsNum - 1 : row - 1,
            upperBound = (row + 1 > this.rowsNum - 1) ? 0 : row + 1,
            leftBound = (col - 1 < 0) ? this.colsNum - 1 : col - 1,
            rightBound = (col + 1 > this.colsNum - 1) ? 0 : col + 1,
            rows = [lowerBound, row, upperBound],
            cols = [leftBound, col, rightBound];

        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < cols.length; j++) {
                var x = rows[i];
                var y = cols[j];

                if (this.grid[x][y].isAlive()){
                    neighborCount++;
                }
            }
        }

        // Remove the cell from the neighbor calculation if it's alive.
        if (isAlive) { 
            neighborCount--; 
        }

        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if (!isAlive && neighborCount === 3) {
            return 1;
        }
        // Any live cell with two or three live neighbours lives on to the next generation.
        if (isAlive && (neighborCount === 2 || neighborCount === 3)){
            return 1;
        }
        // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        // Any live cell with more than three live neighbours dies, as if by overcrowding.
        if (isAlive && (neighborCount < 2 || neighborCount > 3)) {
            return 0;
        }

        return -1;
    };

    Grid.prototype.generate = function() {
        this.updateCells();
        this.displayGrid();
    };

    exports.Grid = Grid;

})(this);