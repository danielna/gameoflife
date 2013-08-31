;(function(exports){

    // Click events for hiding/showing overview screen
    document.getElementById('close').addEventListener("click", function() {
        document.getElementById("overview").style.display = 'none';
    });
    document.getElementById('title').addEventListener("click", function() {
        document.getElementById("overview").style.display = 'block';
    });

    // Return an object with query string parameters
    function queryObj() {
        var result = {}, 
        keyValuePairs = location.search.slice(1).split('&');

        keyValuePairs.forEach(function(keyValuePair) {
            keyValuePair = keyValuePair.split('=');
            result[keyValuePair[0]] = keyValuePair[1] || '';
        });

        return result;
    }

    // rows, cols, seed threshold defaults
    // overridden with values from the querystring
    var defaults = {
            rows: '75',
            cols: '75',
            seed: '0.4'
        },
        qs = queryObj(),
        rows = qs.rows ? qs.rows : defaults.rows,
        cols = qs.cols ? qs.cols : defaults.cols,
        seed = qs.seed ? qs.seed : defaults.seed;

    seed = seed.replace('/', '');

    // run the show
    var life = new Life(rows, cols, seed);
    setInterval(function() { life.generate(); }, 150);        

})(this);