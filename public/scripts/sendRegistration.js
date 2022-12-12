let avatarValue = null;
let cvValue = null;

async function sendRegistration() {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.set("avatar", avatarValue);    // La codificacion a base64 ya se hizo en el evento change del input avatar y se guardó en avatarValue
    formData.set("cv", cvValue);            // La codificacion a base64 ya se hizo en el evento change del input cv y se guardó en cvValue
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
    reader.readAsDataURL(file); // leo el archivo como un texto codificado en base 64
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        callback(null);
    };
}

document.getElementById("avatar").addEventListener("change", function () { // Cuando el usuario selecciona un archivo se ejecuta el código para convertir el contenido del archivo en un texto codificado en base64
    if (this.files.length) {
        getBase64(this.files[0], (value) => {
            avatarValue = value;
        });
    }
    else {
        avatarValue = null;
    }
});

document.getElementById("cv").addEventListener("change", function () { // Lo mismo para el CV
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
