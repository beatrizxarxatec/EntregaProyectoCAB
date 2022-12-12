let avatarValue = null;
let cvValue = null;

async function sendRegistration() {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.set("avatar", avatarValue);   
    formData.set("cv", cvValue);           
    const body = new URLSearchParams(formData);
    const registratonResult = await fetch("http://localhost:3000/register", {
        method: 'POST',
        body: body
    });
    const registratonResultSON = await registratonResult.json();
    if (registratonResultSON) {
        window.location.href = "index.html";
    };
}

function getBase64(file, callback) {
    var reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        callback(null);
    };
}

document.getElementById("avatar").addEventListener("change", function () { 
    if (this.files.length) {
        getBase64(this.files[0], (value) => {
            avatarValue = value;
        });
    }
    else {
        avatarValue = null;
    }
});

document.getElementById("cv").addEventListener("change", function () {
    if (this.files.length) {
        getBase64(this.files[0], (value) => {
            cvValue = value;
        });
    }
    else {
        cvValue = null;
    }
});

document.getElementById("sendRegistration").addEventListener("click", sendRegistration);
