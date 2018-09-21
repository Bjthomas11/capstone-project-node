

// var schedule = {
//   "url": "https://api.fantasydata.net/v3/cfb/stats/json/Games/2018?key=80dbc7beb0db44ad829b53b0193a5bf2",
//   "method": "GET",
// }



// $.ajax(schedule).done(function (response) {
//   console.log(response);
// });

var teamInfo = {
	'url': 'https://api.fantasydata.net/v3/cfb/scores/JSON/LeagueHierarchy?key=80dbc7beb0db44ad829b53b0193a5bf2',
	'method': 'GET'
}

function getTeamInfo(data) {
	$.ajax({
		type: 'GET',
		'url': 'https://api.fantasydata.net/v3/cfb/scores/JSON/LeagueHierarchy?key=80dbc7beb0db44ad829b53b0193a5bf2',
		success: function(teams) {
			console.log(teams)
		} 
	})
}



// // function displayScores(data) {
// 	for (var i = 0; i < data.scores.length; i++) {
// 		$('.scores').append(
// 			`<p>${data.scores[i].away} ${data.scores[i].away_score} ${data.scores[i].home} ${data.scores[i].home_score}</p>
// 			`);
// 		console.log(data.scores[i])
// 	}
// }




// 	getAndDisplayScores();
// })

// $(function(scores) {
// 	var $scores =$('.scores');
// 	$.ajax({
// 		type: 'GET',
// 		url: '/api/scores',
// 		success: function(score) {
// 			console.log(score.scores[0])
// 		}
// 	});
// })


function getGameData(data) {
	$.ajax({
		type: 'GET',
		url: '/api/scores',
		success: function(data) {
			console.log(data.scores)
			let gameData = displayMatchups(data)
			$('.score-form').html(gameData)
		}
	});
}

function displayMatchups(data) {
	var results = ''

	// for(var i = 0; i < data.scores.length; i++) {
		results = `
		<span>${data.scores[257].AwayTeamName} </span><input type="text" name="score away" class="score-away">
		<span>${data.scores[257].HomeTeamName}</span><input type="text" name="score home" class="score-home">
		<button class="submit">Submit</button>
		`
	return results
	}

$('.score-form').submit(function(event) {
  event.preventDefault();
  const away = $('.score-away').val();
  $('.score-away').val('')
  const home = $('.score-home').val()
  $('.score-home').val('')

  $('.scores').append(
`<p>${away} ${home}</p>`)
});

function getGameWeek(week) {
	$.ajax({
		type: 'GET',
		url: 'api/scores/week/4',
		success: function(week) {
			console.log(week)
		}
	})
}


let dropdown = $('#week');
dropdown.empty();

dropdown.append('<option selected ="true" disabled> Choose Week</option>')
dropdown.prop('selectedIndex', 0);
let week = 0;
let WEEK_URL = '/api/scores/week/{week}'

$.getJSON(WEEK_URL, function(data) {
	$.each(data, function(key, entry) {
		dropdown.append($('<option></option').attr('value').text(entry.name));
	})
})
