async function changePass(){
    const form = document.getElementById("form");
    let formData = new FormData(form);
    const body = new URLSearchParams(formData);
    const doLoginResult = await fetch("http://localhost:3000/password", {
        method: 'POST', 
        body: body
    });
    const loginResultJSON = await doLoginResult.json();
    if(loginResultJSON.isOk){
        window.location.href ="index.html";
    }
}

document.getElementById("enter").addEventListener("click", changePass);
