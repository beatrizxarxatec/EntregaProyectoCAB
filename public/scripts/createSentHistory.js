let xp_sent = 0;
let xp_received = 0;

function createSentHistory(rewardsJSON) { 
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
    const rewardsJSON = await getSentHistoryJson(); 
    const receivedJSON = await getReceivedHistoryJson() 
    createSentHistory(rewardsJSON);
    xp_sent = getTotalSentPoints(rewardsJSON); 
    xp_received = getTotalReceiveddPoints(receivedJSON); 
    DrawGraphics(xp_sent, xp_received); 
}

window.addEventListener('load', loadAll); 
