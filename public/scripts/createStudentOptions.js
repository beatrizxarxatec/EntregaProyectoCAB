const currentUserId = sessionStorage.getItem('currentUserId');
const currentUserEmail = sessionStorage.getItem('currentUserEmail');

async function createOptionsForSelectStudent() {
    const students = await fetch("http://localhost:3000/students", { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const studentsJSON = await students.json();
    let optionsString = '';
    let option = '';
    for (let student of studentsJSON) {
        if (student.email_personal != currentUserEmail) {
            option = `<option value="${student.id}">${student.name} ${student.first_surname}</option>`;
            optionsString += option;
        }
    }
    document.getElementById("alumnos").innerHTML = optionsString;
}

window.addEventListener('load', createOptionsForSelectStudent);


const usuarioHidden = document.getElementById("usuario")
if(usuarioHidden) {
    usuarioHidden.value = currentUserId;
}
