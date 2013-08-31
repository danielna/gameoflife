;(function(exports){

    function Gui(id){
        this.id = id;
        this.el = document.getElementById(id);
    }

    Gui.prototype = {

        buildTable: function(rows, cols){
            for (var i = rows-1; i >= 0; i--) {
                var tr = this.el.insertRow();
                for (var j = cols-1; j >= 0; j--) {
                    var td = tr.insertCell();
                    td.id = i + "x" + j;
                }
            }
        },

        setCell: function(cell){
            var row = cell.row,
                col = cell.col,
                isAlive = cell.isAlive();

            var domCell = document.getElementById(row + "x" + col);
            if (isAlive){
                domCell.className = "on";
            } else {
                domCell.className = "off";
            }
        }
    };

    exports.Gui = Gui;

})(this);