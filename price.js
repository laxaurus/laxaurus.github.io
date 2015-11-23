/* Extension demonstrating a blocking reporter block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */


new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_px = function(priceType, symbol, callback) {
        // Make an AJAX call to the Open Weather Maps API
	//callback('hello');
	var u;
	u = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20' + symbol + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
	console.log('url-> ' + u);
	console.log('pricetype-> ' + priceType);
        $.ajax({
              url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20"' + symbol + '"&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
              dataType: 'jsonp',
              success: function( json_data ) {
                  // Got the data - parse it and return the value
		  switch (priceType){
			case 'Hi':
	                	price = json_data['query']['results']['quote']['DaysHigh'];
				break;
			case 'Lo':
	                	price = json_data['query']['results']['quote']['DaysLow'];
				break;
			case 'Last':
	                	price = json_data['query']['results']['quote']['LastTradePriceOnly'];
				break;
		  }
                  callback(price);
              }
        });


/*
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              },
	      error: function(weather_data){
		msg = weather_data;
		callback(msg);
	      }
        });
*/  
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current %m.priceType price of %s', 'get_px', 'Last', '^HSI'],
        ],

	menus: {
        	priceType: ['Hi', 'Lo', 'Last' ],
        	
    	}
    };

    // Register the extension
    ScratchExtensions.register('Yahoo Finance extension', descriptor, ext);
})();
