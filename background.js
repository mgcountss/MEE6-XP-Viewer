chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "reload") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = 'window.location.reload(true);';
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}

	if (request.message === "hi") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = `
			fetch('https://mee6.xyz/api/plugins/levels/leaderboard/' + document.URL.split('/leaderboard/')[1] + '')
			.then(response => {
			  return response.json()
			})
			.then(data => {
			  for (let q = 1; q < 100; q++) {
				document.querySelector("#app-mount > div > div > div.w-full.max-w-\\[1440px\\].flex.flex-col-reverse.lg\\:flex-row.lg\\:p-8 > div.flex.grow.rounded-sm.lg\\:bg-legacy-card.shadow > div > div > div:nth-child(" + q + ") > div.flex.h-14.items-center.group.flex-col.py-8.sm\\:flex-row > div.hidden.sm\\:flex.items-center.self-center.ml-auto.text-legacy-faded > div:nth-child(1) > div.font-bold.text-lg.mt-1.text-white").innerHTML = data.players[q - 1].message_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				document.querySelector("#app-mount > div > div > div.w-full.max-w-\\[1440px\\].flex.flex-col-reverse.lg\\:flex-row.lg\\:p-8 > div.flex.grow.rounded-sm.lg\\:bg-legacy-card.shadow > div > div > div:nth-child(" + q + ") > div.flex.h-14.items-center.group.flex-col.py-8.sm\\:flex-row > div.hidden.sm\\:flex.items-center.self-center.ml-auto.text-legacy-faded > div:nth-child(2) > div.font-bold.text-lg.mt-1.text-white").innerHTML = data.players[q - 1].xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
			  }
			})
		}
		  `;
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}

	if (request.message === "start") {
		chrome.tabs.getSelected(null, function (tab) {
			var code = `
			fetch('https://mee6.xyz/api/plugins/levels/leaderboard/' + document.URL.split('/leaderboard/')[1] + '')
			.then(response => {
			  return response.json()
			})
			.then(data => {
			  for (let q = 1; q < 100; q++) {
				document.querySelector("#app-mount > div > div > div.w-full.max-w-\\[1440px\\].flex.flex-col-reverse.lg\\:flex-row.lg\\:p-8 > div.flex.grow.rounded-sm.lg\\:bg-legacy-card.shadow > div > div > div:nth-child(" + q + ") > div.flex.h-14.items-center.group.flex-col.py-8.sm\\:flex-row > div.hidden.sm\\:flex.items-center.self-center.ml-auto.text-legacy-faded > div:nth-child(1) > div.font-bold.text-lg.mt-1.text-white").innerHTML = data.players[q - 1].message_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
				document.querySelector("#app-mount > div > div > div.w-full.max-w-\\[1440px\\].flex.flex-col-reverse.lg\\:flex-row.lg\\:p-8 > div.flex.grow.rounded-sm.lg\\:bg-legacy-card.shadow > div > div > div:nth-child(" + q + ") > div.flex.h-14.items-center.group.flex-col.py-8.sm\\:flex-row > div.hidden.sm\\:flex.items-center.self-center.ml-auto.text-legacy-faded > div:nth-child(2) > div.font-bold.text-lg.mt-1.text-white").innerHTML = data.players[q - 1].xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
			  }
			})
		} 
		  `;
			chrome.tabs.executeScript(tab.id, { code: code });
		});
	}
});