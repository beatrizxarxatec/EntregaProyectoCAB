
let xp_sent = 0;
let xp_received = 0;

async function createReceivedHistory(receivedJSON) { 
    let receivedString = '';
    let receivedItem = '';
    for (let received of receivedJSON) {
        const theDate = new Date(received.date).toDateString();
        receivedItem = `
        <div class="pAlign">
            <div>
                <span class="pointsRed"><b>${received.xp_points}</b></span> PUNTOS RECIBIDOS ${theDate}
            </div>
            <p> ${received.description} de parte de <b>${received.name} ${received.first_surname}</b></p>
           
        </div>
        <hr id="hrHistory"/>
        </p>
        `;
        receivedString += receivedItem;
    }
    document.getElementById("elementosrecibidos").innerHTML = receivedString; 
}

async function loadAll() {
    const rewardsJSON = await getSentHistoryJson(); 
    const receivedJSON = await getReceivedHistoryJson() 
    createReceivedHistory(receivedJSON);
    xp_sent = getTotalSentPoints(rewardsJSON); 
    xp_received = getTotalReceiveddPoints(receivedJSON);
    DrawGraphics(xp_sent, xp_received); 
}

window.addEventListener('load', loadAll); 
