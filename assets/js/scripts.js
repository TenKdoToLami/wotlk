document.addEventListener("DOMContentLoaded", () => {
  const createParticle = () => {
    const particle = document.createElement("div");
    particle.classList.add("frost-particle");
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = 8 + Math.random() * 5 + "s";
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 15000);
  };

  setInterval(createParticle, 60);
});
