document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll(".landing-container h1, .landing-container h2, .landing-container h3");

    lines.forEach((line, i) => {
        line.style.opacity = 0;
        line.style.transform = "translateY(20px)";
        setTimeout(() => {
            line.style.transition = "all 0.8s ease";
            line.style.opacity = 1;
            line.style.transform = "translateY(0)";
        }, i * 600);
    });
});
