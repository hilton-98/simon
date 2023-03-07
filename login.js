function login() {
    const name = document.getElementById("name");
    console.log(name);
    console.log(name.value);
    localStorage.setItem("userName", name.value);
    window.location.href = "play.html";
}