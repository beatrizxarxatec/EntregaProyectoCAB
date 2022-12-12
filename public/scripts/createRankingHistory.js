const comments = ["TOCANDO EL CIELO", "EN LA CRESTA DE LA OLA", "SABOREANDO EL PODIO", "FUTURO PROMETEDOR", "EN EL TOP 5"];

async function createRankingHistory() {
    const url = "http://localhost:3000/top5";
    const ranking = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const rankingJSON = await ranking.json();
    let rankingString = '';
    let rankingItem = '';
    for (let pos = 0; pos < rankingJSON.length; pos++) {
        const ranking = rankingJSON[pos];
        rankingItem = `
        <div class="rankingList1">
            <p class="rankingPositionPodium item1">${pos+1}</p>
            <p class="item2">${ranking.name + " " + ranking.first_surname}</p>
            <p class="item3"><em class="red">${comments[pos]}</em></p>
            <p class="item4"><span id="pointSize"><b>${ranking.all_xp_points}</b></span> PUNTOS ACTIVA</p>
        </div>
        <hr id="rankingHr" />
        `;
        rankingString += rankingItem;
    }
    document.getElementById("historialRanking").innerHTML = rankingString; // id="historialRanking" está en ranking.html
}

async function setRankingPosition() { // Puesto actual
    const currentUserId = sessionStorage.getItem('currentUserId');
    const url = "http://localhost:3000/currentpos?" + new URLSearchParams({ currentUserId: currentUserId });
    const ranking = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const rankingJSON = await ranking.json();
    document.getElementById("myPositionNumber").innerHTML = rankingJSON.position; // id="myPositionNumber" está en ranking.html
}

async function doAll(){
    createRankingHistory();
    setRankingPosition();
}

window.addEventListener('load', doAll); 

