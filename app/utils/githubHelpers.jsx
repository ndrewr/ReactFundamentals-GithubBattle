const axios = require('axios');

const ID = 'MYCLIENTID';
const SECRET = 'MYCLIENTSECRET';
// const params = '?client_id=' + ID + '&client_secret=' + SECRET;
const params = `?client_id=${ID}&client_secret=${SECRET}`;

function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + params);
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getTotalStars (repos) {
  return repos.data.reduce(function( prev, current) {
    return prev + current.stargazers_count;
  }, 0);
}

function getPlayersData (player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

const helpers = {
	getPlayersInfo: (players) => {
		return axios.all(players.map((username) => { return getUserInfo(username) }))
		.then((info) => { return info.map((user) => { return user.data; }) })
		.catch((e) => {
			console.warn(e);
		})
	},
  battle: function(players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)});
  }
}

module.exports = helpers;
