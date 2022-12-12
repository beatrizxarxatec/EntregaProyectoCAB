let xp_sent = 0;
let xp_received = 0;

function createSentHistory(rewardsJSON) { // En la funcion loadAll le proporcionan el valor del parametro rewardsJSON
    let rewardsString = '';
    let rewardItem = '';
    for (let reward of rewardsJSON) {
        const theDate = new Date(reward.date).toDateString();
        rewardItem = `
        <div class="pAlign">
            <div>
                <span class="pointsRed"><b>${reward.xp_points}</b></span> PUNTOS ENVIADOS ${theDate}
            </div>
            <p> ${reward.description} </p>
            <p> para <b>${reward.name} ${reward.first_surname}</b></p>
        </div>
        <hr id="hrHistory"/>
        </p>
        `;
        rewardsString += rewardItem;
    }
    document.getElementById("elementosenviados").innerHTML = rewardsString;
}

async function loadAll() {
    const rewardsJSON = await getSentHistoryJson(); // Esta función está en common.js
    const receivedJSON = await getReceivedHistoryJson() // Esta función está en common.js
    createSentHistory(rewardsJSON);
    xp_sent = getTotalSentPoints(rewardsJSON); // Esta función está en common.js
    xp_received = getTotalReceiveddPoints(receivedJSON); // Esta función está en common.js
    DrawGraphics(xp_sent, xp_received); // Esta función está en common.js
}

window.addEventListener('load', loadAll); 
