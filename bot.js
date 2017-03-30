var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

var retweet = function () {
	var paramms = {
		q:'#nodejs, #mongodb, #angularjs',
		result_type: 'mixed',
		lang: 'en'
	}

	Twitter.get('search/tweets' , paramms, function(err, data){
		//if there no errors
		if(!err) {
			//grab ID of tweet to retweet
			var retweetId = data.statuses[0].id_str;

			Twitter.post('statuses/retweet/:id', {
				id:retweetId
			}, function(err , res) {
				if(res) {
					console.log('Retweeted!');
				}
				else {
					console.log('error retweeting');
				}
			});
		}
		else {
			console.log('error searching')
		}
	});
}

retweet();
setInterval(retweet, 3000000);
