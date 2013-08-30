;(function(exports){

    function Cell(row,col){
        this.row = row;
        this.col = col;
        this.status = 0;
    }

    Cell.prototype.live = function() {
        this.status = 1;
    };

    Cell.prototype.die = function() {
        this.status = 0;
    };

    Cell.prototype.getStatus = function() { 
        return this.status;
    };

    Cell.prototype.isAlive = function() {
        return this.status === 1;
    };

    exports.Cell = Cell;

})(this);