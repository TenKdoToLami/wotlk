document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const trigger = document.getElementById("sidebar-trigger");

  trigger.addEventListener("mouseenter", () => { sidebar.style.left = "0"; });
  sidebar.addEventListener("mouseleave", () => { sidebar.style.left = "-200px"; });

  let touchStartX = 0;
  document.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
  document.addEventListener("touchmove", (e) => {
    let touchX = e.touches[0].clientX;
    if (touchStartX < 50 && touchX > 100) sidebar.style.left = "0"; // open
    if (touchStartX > 150 && touchX < 50) sidebar.style.left = "-200px"; // close
  });
});
