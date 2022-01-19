// // background.js
// console.log('background loaded!')

// chrome.runtime.onInstalled.addListener(function(details) {
//     chrome.storage.sync.set({reset_timer: true});
//     console.log('reset_timer stored as true')
// });


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// console.log('(background.js) message recieved: '+request.message);
	if (request.message === "reload") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = 'window.location.reload(true);';
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}


	if (request.message === "hi") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = `
    fetch('https://mee6.xyz/api/plugins/levels/leaderboard/'+document.URL.split('/leaderboard/')[1]+'')
		  .then(response => {
			  return response.json()
		  })
		  .then(data => {
			  for (let q = 1; q < 100; q++) {
				let newHTML1 = '<span class="tooltiptext">' + data.players[q - 1].message_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '</span>'
				let newHTML2 = '<span class="tooltiptext">' + data.players[q - 1].xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '</span>'
				document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(1)").innerHTML += newHTML1
				document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(2)").innerHTML += newHTML2
				document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(1) > div.leaderboardPlayerStatValue").innerHTML = abbreviateNumber(data.players[q - 1].message_count)
				document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(2) > div.leaderboardPlayerStatValue").innerHTML = abbreviateNumber(data.players[q - 1].xp)
				document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div.leaderboardPlayerStat").classList = "leaderboardPlayerStat p" + Math.floor(progress(data.players[q - 1].detailed_xp[0], data.players[q - 1].detailed_xp[1])) + ""
				}
		  })
		  function addCommas(count) {
			return count.toLocaleString("en-US");
		   }
		   function progress(partialValue, totalValue) {
			return (100 * partialValue) / totalValue;
		 } 
		 function abbreviateNumber(value) {
			let newValue = value;
			const suffixes = ["", "K", "M", "B","T"];
			let suffixNum = 0;
			while (newValue >= 1000) {
			  newValue /= 1000;
			  suffixNum++;
			}
			newValue = newValue.toFixed(1);
			newValue += suffixes[suffixNum];
			return newValue;
		  }
		  `;
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}

	if (request.message === "start") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = `
    fetch('https://mee6.xyz/api/plugins/levels/leaderboard/'+document.URL.split('/leaderboard/')[1]+'')
				.then(response => {
					return response.json()
				})
				.then(data => {
					for (let q = 1; q < 100; q++) {
						let newHTML1 = '<span class="tooltiptext">' + data.players[q - 1].message_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '</span>'
						let newHTML2 = '<span class="tooltiptext">' + data.players[q - 1].xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '</span>'
						document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(1)").innerHTML += newHTML1
						document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(2)").innerHTML += newHTML2
						document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(1) > div.leaderboardPlayerStatValue").innerHTML = abbreviateNumber(data.players[q - 1].message_count)
						document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div:nth-child(2) > div.leaderboardPlayerStatValue").innerHTML = abbreviateNumber(data.players[q - 1].xp)
						document.querySelector("#app-mount > div > div > div.leaderboardBody > div.leaderboardPlayersListContainer > div > div > div:nth-child(" + q + ") > div.leaderboardPlayer > div.leaderboardPlayerStats > div.leaderboardPlayerStat").classList = "leaderboardPlayerStat p" + Math.floor(progress(data.players[q - 1].detailed_xp[0], data.players[q - 1].detailed_xp[1])) + ""
					}
				})
				function abbreviateNumber(value) {
					let newValue = value;
					const suffixes = ["", "K", "M", "B","T"];
					let suffixNum = 0;
					while (newValue >= 1000) {
					  newValue /= 1000;
					  suffixNum++;
					}
					newValue = newValue.toFixed(1);
					newValue += suffixes[suffixNum];
					return newValue;
				  }
				function addCommas(count) {
				  return count.toLocaleString("en-US");
				 }
				 function progress(partialValue, totalValue) {
					return (100 * partialValue) / totalValue;
				 } 
		  `;
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}
});
