function run() {
  clearInterval(a)
  yt = window.location.search;
  ytParams = new URLSearchParams(yt);
  id = ytParams.get('v');
  function appendStyle(styles) {
    let css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(css);
  }
  let styles = `leaderboardPlayerStatBlock {
                position: relative;
                display: inline-block;
                border-bottom: 1px dotted black;
              }
              .leaderboardPlayerStatBlock .tooltiptext {
                visibility: hidden;
                width: 120px;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                margin-top: 75px;
              }
              .leaderboardPlayerStatBlock:hover .tooltiptext {
                visibility: visible;
              }`;
  appendStyle(styles)
  fetch('https://mee6.xyz/api/plugins/levels/leaderboard/' + document.URL.split('/leaderboard/')[1] + '')
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
}

let a = setInterval(() => {
  if (document.querySelector('.leaderboardPlayersList') == null) { } else {
    run()
  }
}, 100);

function abbreviateNumber(value) {
  let newValue = value;
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum++;
  }
  newValue = newValue.toFixed(1);
  newValue += suffixes[suffixNum];
  return newValue;
}

function progress(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
} 