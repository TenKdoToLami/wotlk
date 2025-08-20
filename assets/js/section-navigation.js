document.addEventListener("DOMContentLoaded", () => {
  const navList = document.getElementById("section-nav-list");
  const sections = document.querySelectorAll("section[id]");
  const links = [];

  sections.forEach(section => {
    const title = section.id;
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${section.id}`;
    link.textContent = title;

    link.addEventListener("click", e => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    li.appendChild(link);
    navList.appendChild(li);
    links.push({ link, section });
  });

  // Function to update active link
  function updateActiveLink() {
    const viewportMiddle = window.innerHeight / 2;

    let current = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
        current = section;
      }
    });

    links.forEach(({ link, section }) => {
      if (section === current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("resize", updateActiveLink);

  // Initialize active link
  updateActiveLink();
});
