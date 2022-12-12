async function createSocialHistory() {
    const url = "http://localhost:3000/social";
    const socialHistory = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const socialHistoryJSON = await socialHistory.json();
    let socialHistoryString = '';
    let socialHistoryItem = '';
    for (let socialHistory of socialHistoryJSON) {
        socialHistoryItem = `
            <div class="pAlign">
                <div id="headerPoints"><span class="pointsRed"><b>${socialHistory.xp_points}</b> PuntosActiva </span>
                    Ganó <b>${socialHistory.rewarded_name + " " + socialHistory.rewarded_first_surname}</b>
                </div>
                <br>${socialHistory.description}<br>
                <p>de parte de <b>${socialHistory.sender_name + " " + socialHistory.sender_first_surname}</b>
            </div>
            <hr id="rankingHr" />
        `;
        socialHistoryString += socialHistoryItem;
    }
    document.getElementById("socialHistory").innerHTML = socialHistoryString;
}

window.addEventListener('load', createSocialHistory); 



