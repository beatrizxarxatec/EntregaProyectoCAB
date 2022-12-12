let xp_sent = 0;
let xp_received = 0;

function createPerfil(studentJSON) { 
    document.getElementById("name").innerHTML = studentJSON.name;
    document.getElementById("firstSurname").innerHTML = studentJSON.first_surname;
    document.getElementById("secondSurname").innerHTML = studentJSON.second_surname;
    document.getElementById("personalEmailAddress").innerHTML = studentJSON.email_personal;
    document.getElementById("activaEmailAddress").innerHTML = studentJSON.email_activa;
    document.getElementById("description").innerHTML = studentJSON.description;
    document.getElementById("phoneNumber").innerHTML = studentJSON.phone_number;
    document.getElementById("city").innerHTML = studentJSON.city;
    document.getElementById("zipCode").innerHTML = studentJSON.zip_code;

    const avatarBytes = new Uint8Array(studentJSON.avatar.data);
    const avatarText = new TextDecoder().decode(avatarBytes);
    document.getElementById("avatar").src = avatarText;

    const cvBytes = new Uint8Array(studentJSON.cv.data);
    const cvText = new TextDecoder().decode(cvBytes);
    document.getElementById("cv").href = cvText;
    document.getElementById("cv").download = "CV";
}

async function loadAll() {
    const studentJSON = await getStudentDataJson(); 
    createPerfil(studentJSON);
}

window.addEventListener('load', loadAll); 
