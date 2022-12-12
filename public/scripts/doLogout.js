async function doLogout() {
    sessionStorage.removeItem('currentUserEmail');
    sessionStorage.removeItem('currentUserId');
    window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", doLogout);
