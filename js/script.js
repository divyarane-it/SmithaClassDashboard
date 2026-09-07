function toggleMenu() {

    const nav = document.getElementById("mainNav");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.padding = "20px";
        nav.style.background = "white";
        nav.style.boxShadow = "0 10px 20px rgba(0,0,0,.1)";
    }
}