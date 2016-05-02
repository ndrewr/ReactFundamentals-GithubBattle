const axios = require('axios');

const ID = 'MYCLIENTID';
const SECRET = 'MYCLIENTSECRET';
// const params = '?client_id=' + ID + '&client_secret=' + SECRET;
const params = `?client_id=${ID}&client_secret=${SECRET}`;

function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + params);
}

const helpers = {
	getPlayersInfo: (players) => {
		return axios.all(players.map((username) => { return getUserInfo(username) }))
		.then((info) => { return info.map((user) => { return user.data; }) })
		.catch((e) => {
			console.warn(e);
		})
	}
}

module.exports = helpers;
