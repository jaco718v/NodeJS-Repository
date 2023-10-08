const response = fetch("/welcomeMessage")
.then((n) => n.json())
.then((n)=> {
    document.getElementById("welcome").innerText = n.data
    console.log(n.data)})

const response2 = fetch("/yourMessage")
.then((n) => n.json())
.then((n)=> {
    document.getElementById("your").innerText = n.data
    console.log(n.data)})
