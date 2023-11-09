fetch('https://mee6.xyz/api/plugins/levels/leaderboard/' + document.URL.split('/leaderboard/')[1] + '')
  .then(response => {
    return response.json()
  })
  .then(data => {
    for (let q = 1; q < data.players.length; q++) {
      document.querySelector("#root > div:nth-child(3) > div > div.flex.flex-col.w-full.relative > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-2.lg\\:gap-10.z-1.relative > div.lg\\:col-span-2 > div > div.grid.grid-cols-1.gap-1\\.5 > div:nth-child(" + q + ") > div > div.grid.grid-cols-1.lg\\:grid-cols-3 > p:nth-child(1)").innerHTML = (data.players[q - 1].message_count).toLocaleString('en-US');
      document.querySelector("#root > div:nth-child(3) > div > div.flex.flex-col.w-full.relative > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-2.lg\\:gap-10.z-1.relative > div.lg\\:col-span-2 > div > div.grid.grid-cols-1.gap-1\\.5 > div:nth-child(" + q + ") > div > div.grid.grid-cols-1.lg\\:grid-cols-3 > p:nth-child(1)").style.fontSize = "0.8em";
      document.querySelector("#root > div:nth-child(3) > div > div.flex.flex-col.w-full.relative > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-2.lg\\:gap-10.z-1.relative > div.lg\\:col-span-2 > div > div.grid.grid-cols-1.gap-1\\.5 > div:nth-child(" + q + ") > div > div.grid.grid-cols-1.lg\\:grid-cols-3 > p:nth-child(2)").innerHTML = (data.players[q - 1].xp).toLocaleString('en-US');
      document.querySelector("#root > div:nth-child(3) > div > div.flex.flex-col.w-full.relative > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-2.lg\\:gap-10.z-1.relative > div.lg\\:col-span-2 > div > div.grid.grid-cols-1.gap-1\\.5 > div:nth-child(" + q + ") > div > div.grid.grid-cols-1.lg\\:grid-cols-3 > p:nth-child(2)").style.fontSize = "0.8em";
    }
  }).catch(err => {
    console.log(err);
  });