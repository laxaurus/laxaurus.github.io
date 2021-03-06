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

    ext.get_px = function(stock, callback) {
        // Make an AJAX call to the Open Weather Maps API
	//callback('hello');
        $.ajax({
              url: 'https://developer.yahoo.com/yql/console/?q=select%20%2a%20from%20yahoo.finance.quote%20where%20symbol%20in%20%28%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22%29&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys#h=select+*+from+yahoo.finance.quote+where+symbol+%3D+"'+stock+'"',
              dataType: 'jsonp',
              success: function( json_data ) {
                  // Got the data - parse it and return the temperature
                  price = json_data['query']['results']['quote']['LastTradePriceOnly'];
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
            ['R', 'current stock px of %s', 'get_px', 'GOOG'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Yahoo Finance extension', descriptor, ext);
})();
