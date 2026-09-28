document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    setupTheme();

    setupSearch();

    setupKeyboardShortcut();

});


/* ================= THEME ================= */

function setupTheme() {

    const themeButton =
        document.getElementById("themeBtn");

    const savedTheme =
        localStorage.getItem("citypulse-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");

        if (themeButton) {
            themeButton.textContent = "☀";
        }
    }

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "citypulse-theme",
            dark ? "dark" : "light"
        );

        themeButton.textContent =
            dark ? "☀" : "☾";

        showToast(
            dark
                ? "Dark mode enabled"
                : "Light mode enabled",
            dark ? "☀" : "☾"
        );

    });

}


/* ================= SEARCH ================= */

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const cards =
            document.querySelectorAll(
                ".feature-card"
            );

        if (!query) {

            cards.forEach(card => {
                card.style.display = "";
            });

            return;
        }

        let found = false;

        cards.forEach(card => {

            const searchableText =
                (
                    card.innerText +
                    " " +
                    (card.dataset.search || "")
                ).toLowerCase();

            if (searchableText.includes(query)) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";

            }

        });

        if (found) {

            document
                .getElementById("discover")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        }

    });

}


/* ================= KEYBOARD ================= */

function setupKeyboardShortcut() {

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            focusSearch();

        }

    });

}


/* ================= SEARCH FOCUS ================= */

function focusSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    input.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= HOME ================= */

function goHome(event) {

    if (event) {
        event.preventDefault();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= SCROLL ================= */

function scrollToId(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================= NEAR ME ================= */

function nearMe() {

    showToast(
        "Finding useful places near you...",
        "⌖"
    );

    if (!navigator.geolocation) {
        return;
    }

    navigator.geolocation.getCurrentPosition(

        () => {

            showToast(
                "Nearby results are ready",
                "✓"
            );

        },

        () => {

            showToast(
                "Showing Hyderabad city results",
                "📍"
            );

        }

    );

}


/* ================= CATEGORIES ================= */

function categoryMessage(category) {

    showToast(
        `Exploring ${category}`,
        "→"
    );

}


function showAll() {

    const cards =
        document.querySelectorAll(
            ".feature-card"
        );

    cards.forEach(card => {
        card.style.display = "";
    });

    scrollToId("discover");

    showToast(
        "All city categories are visible",
        "✦"
    );

}


/* ================= MAP ================= */

function mapNotice(message) {

    showToast(
        message,
        "📍"
    );

}


/* ================= ALERTS ================= */

function alertInfo(type) {

    showToast(
        `${type} selected`,
        "ℹ"
    );

}


function showAllAlerts() {

    showToast(
        "Showing all city updates",
        "✓"
    );

}


/* ================= PLACES ================= */

function nearbyMessage() {

    showToast(
        "More nearby places coming soon",
        "⌖"
    );

}


/* ================= PROFILE ================= */

function showProfile() {

    showToast(
        "Profile dashboard coming soon",
        "○"
    );

}


/* ================= FOOTER ================= */

function footerMessage(section) {

    const messages = {

        About:
            "CityPulse connects people with their city.",

        Privacy:
            "Your information should always stay protected.",

        Contact:
            "Contact tools are coming soon.",

        Feedback:
            "We would love to hear your feedback."

    };

    showToast(
        messages[section] || "CityPulse",
        "✦"
    );

}


/* ================= TOAST ================= */

let toastTimeout;


function showToast(message, icon = "✓") {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastText");

    const iconElement =
        document.getElementById("toastIcon");

    if (!toast || !text || !iconElement) {
        return;
    }

    text.textContent = message;

    iconElement.textContent = icon;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);

}
