
document.getElementById("loginBtn").onclick = evt => login(evt)


function login(){
    const usernameInput = document.getElementById("usernameField").value
    const passowordInput = document.getElementById("passwordField").value
    window.location.href = `/login?username=${usernameInput}&password=${passowordInput}`
   }
    