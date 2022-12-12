
let xp_sent = 0;
let xp_received = 0;

async function createReceivedHistory(receivedJSON) { // En la funcion loadAll le proporcionan el valor del parametro receivedJSON
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
    document.getElementById("elementosrecibidos").innerHTML = receivedString; // id="elementosenviados" está en 
}

async function loadAll() {
    const rewardsJSON = await getSentHistoryJson(); // Esta función está en common.js
    const receivedJSON = await getReceivedHistoryJson() // Esta función está en common.js
    createReceivedHistory(receivedJSON);
    xp_sent = getTotalSentPoints(rewardsJSON); // Esta función está en common.js
    xp_received = getTotalReceiveddPoints(receivedJSON); // Esta función está en common.js
    DrawGraphics(xp_sent, xp_received); // Esta función está en common.js
}

window.addEventListener('load', loadAll); 
