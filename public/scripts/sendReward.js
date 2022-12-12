const total = 350;

async function sendReward() {
    const xp_target = Number(document.getElementById("pointQty").value); 
    const available = total - xp_sent;

    if (available >= xp_target) {
        const form = document.getElementById("form");
        let formData = new FormData(form);
        const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')
        formData.set('date', datetime);
        const body = new URLSearchParams(formData);
        const addRewardResult = await fetch("http://localhost:3000/addreward", {
            method: 'POST',
            body: body
        });
        const addRewardResultJSON = await addRewardResult.json();
        if (addRewardResultJSON) {
            loadAll();
        };
    }
    else {
        alert(`No puedes enviar ${xp_target} puntos porque solo te quedan ${available} del total de ${total} puntos.`);
    }
}

document.getElementById("sendPoints").addEventListener("click", sendReward);
