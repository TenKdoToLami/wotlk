document.addEventListener("DOMContentLoaded", () => {
	const sidebar = document.querySelector(".sidebar");
	const trigger = document.getElementById("sidebar-trigger");
	const indicator = document.getElementById("sidebar-indicator");
	const links = sidebar.querySelectorAll("a");

	const defaultTop = trigger.offsetHeight / 2;

	// Open sidebar on hover
	trigger.addEventListener("mouseenter", () => {
		sidebar.style.left = "0";
		moveIndicatorToActive();
	});

	// Close sidebar and reset arrow
	sidebar.addEventListener("mouseleave", () => {
		sidebar.style.left = "-200px";
		resetIndicator();
	});

	// Touch gestures for mobile
	let touchStartX = 0;
	document.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
	document.addEventListener("touchmove", (e) => {
		let touchX = e.touches[0].clientX;
		if (touchStartX < 50 && touchX > 100) {
			sidebar.style.left = "0";
			moveIndicatorToActive();
		}
		if (touchStartX > 150 && touchX < 50) {
			sidebar.style.left = "-200px";
			resetIndicator();
		}
	});

	// Move arrow next to active link
	function moveIndicatorToActive() {
		const activeLink = sidebar.querySelector("a.active");
		if (activeLink) {
			const rect = activeLink.getBoundingClientRect();
			const sidebarRect = sidebar.getBoundingClientRect();
			const topPosition = rect.top - sidebarRect.top + rect.height / 2;
			indicator.style.top = `${topPosition}px`;
		}
	}

	// Reset arrow to default position
	function resetIndicator() {
		indicator.style.top = `${defaultTop}px`;
	}
});
