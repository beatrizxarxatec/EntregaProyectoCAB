const total = 350;
const received=0;

async function receivedReward(){
    const xp_target = Number(document.getElementById("pointQty").value);
    const available = total-xp_sent;

    if(available >= xp_target){
    const form = document.getElementById("form");
    let formData = new FormData(form);

    const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')
    formData.set('date', datetime);

    const body = new URLSearchParams(formData);
    const doLoginResult = await fetch("http://localhost:3000/addreward", {
        method: 'POST', 
        body: body
    });
    const loginResultJSON = await doLoginResult.json();
    if(loginResultJSON){
        createSentHistory();
    };
    /*     if(loginResultJSON.isOk){
        sessionStorage.setItem('currentUserEmail', loginResultJSON.email);// En el sessionStorage, poner en la llave 'currentUser' el valor de 'email' en el formulario
        sessionStorage.setItem('currentUserId', loginResultJSON.studentId);
        window.location.href ="mispuntosEnviados.html";
    } */
}
else{
    alert(`No puedes enviar ${xp_target} puntos porque solo te quedan ${available} del total de ${total} puntos.`);
}
}

document.getElementById("sendPoints").addEventListener("click", receivedReward); //sendPoints(id button)
