/* =========================================================
CITYPULSE
JavaScript
========================================================= */

/* ================= INITIAL SETUP ================= */

document.addEventListener("DOMContentLoaded", function () {

```
updateYear();

loadTheme();

setupKeyboardShortcut();

animateCounters();
```

});

/* ================= YEAR ================= */

function updateYear() {

```
const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
```

}

/* ================= THEME ================= */

function toggleTheme() {

```
document.body.classList.toggle("dark");

const isDark =
    document.body.classList.contains("dark");

localStorage.setItem(
    "citypulse-theme",
    isDark ? "dark" : "light"
);

updateThemeIcon();

showToast(
    isDark
        ? "Dark mode enabled"
        : "Light mode enabled",
    "☀"
);
```

}

function loadTheme() {

```
const savedTheme =
    localStorage.getItem("citypulse-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeIcon();
```

}

function updateThemeIcon() {

```
const button =
    document.getElementById("themeButton");

if (!button) return;

const isDark =
    document.body.classList.contains("dark");

button.textContent =
    isDark ? "☀" : "☾";
```

}

/* ================= SEARCH ================= */

function searchCity(query) {

```
const search =
    query.toLowerCase().trim();

const cards =
    document.querySelectorAll(
        ".category-card"
    );

if (!search) {

    cards.forEach(card => {

        card.style.display = "";

    });

    return;

}


let found = false;


cards.forEach(card => {

    const text =
        card.innerText.toLowerCase();

    const keywords =
        card.dataset.search || "";

    if (
        text.includes(search) ||
        keywords.includes(search)
    ) {

        card.style.display = "";

        found = true;

    } else {

        card.style.display = "none";

    }

});


if (found) {

    document
        .getElementById("trending")
        .scrollIntoView({
            behavior: "smooth"
        });

}
```

}

/* ================= SEARCH FOCUS ================= */

function focusSearch() {

```
const desktop =
    document.getElementById(
        "desktopSearch"
    );

const mobile =
    document.getElementById(
        "mobileSearch"
    );


if (window.innerWidth <= 700) {

    if (mobile) {

        mobile.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

} else {

    if (desktop) {

        desktop.focus();

    }

}
```

}

/* ================= KEYBOARD ================= */

function setupKeyboardShortcut() {

```
document.addEventListener(
    "keydown",
    function (event) {

        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            focusSearch();

        }

    }
);
```

}

/* ================= SCROLL ================= */

function scrollToSection(id) {

```
const section =
    document.getElementById(id);

if (!section) return;

section.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
```

}

/* ================= HOME ================= */

function showHome() {

```
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
```

}

/* ================= LOCATION ================= */

function getLocation() {

```
showToast(
    "Finding places near you...",
    "⌖"
);


if (!navigator.geolocation) {

    showToast(
        "Location is not supported",
        "!"
    );

    return;

}


navigator.geolocation.getCurrentPosition(

    function () {

        showToast(
            "Nearby results updated",
            "✓"
        );

    },

    function () {

        showToast(
            "Using Hyderabad as your city",
            "📍"
        );

    }

);
```

}

/* ================= MAP ================= */

let mapScale = 1;

function zoomMap(direction) {

```
const map =
    document.getElementById(
        "cityMap"
    );

if (!map) return;


if (direction === "+") {

    mapScale =
        Math.min(
            mapScale + 0.08,
            1.25
        );

} else {

    mapScale =
        Math.max(
            mapScale - 0.08,
            0.9
        );

}


map.style.transform =
    `scale(${mapScale})`;
```

}

function focusMap() {

```
scrollToSection("cityMap");

showToast(
    "Explore the live city map",
    "🗺"
);
```

}

function mapMessage(message) {

```
showToast(
    message,
    "📍"
);
```

}

/* ================= ALERTS ================= */

function alertDetails(type) {

```
showToast(
    `${type}: More information available`,
    "ℹ"
);
```

}

/* ================= CATEGORIES ================= */

function showAllCategories() {

```
const cards =
    document.querySelectorAll(
        ".category-card"
    );

cards.forEach(card => {

    card.style.display = "";

});


scrollToSection("trending");

showToast(
    "Showing all city categories",
    "✦"
);
```

}

/* ================= NEARBY ================= */

function showNearby() {

```
showToast(
    "More nearby places coming soon",
    "📍"
);
```

}

/* ================= DISCOVER ================= */

function discoverMore() {

```
showToast(
    "Discovering more around Hyderabad...",
    "✦"
);


setTimeout(function () {

    scrollToSection("trending");

}, 700);
```

}

/* ================= PROFILE ================= */

function openProfile() {

```
showToast(
    "Profile feature coming soon",
    "◯"
);
```

}

/* ================= FOOTER ================= */

function showAbout() {

```
showToast(
    "CityPulse helps you discover your city",
    "✦"
);
```

}

function showPrivacy() {

```
showToast(
    "Your privacy matters to CityPulse",
    "🔒"
);
```

}

function showContact() {

```
showToast(
    "Contact feature coming soon",
    "✉"
);
```

}

function showFeedback() {

```
const feedback =
    prompt(
        "Tell us what you think about CityPulse:"
    );

if (
    feedback &&
    feedback.trim().length > 0
) {

    showToast(
        "Thanks for your feedback!",
        "♥"
    );

}
```

}

/* ================= TOAST ================= */

let toastTimer;

function showToast(message, icon = "✓") {

```
const toast =
    document.getElementById(
        "toast"
    );

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

const toastIcon =
    document.getElementById(
        "toastIcon"
    );


if (!toast) return;


toastMessage.textContent =
    message;

toastIcon.textContent =
    icon;


toast.classList.add("show");


clearTimeout(toastTimer);


toastTimer =
    setTimeout(function () {

        toast.classList.remove(
            "show"
        );

    }, 2800);
```

}

/* ================= COUNTERS ================= */

function animateCounters() {

```
const eventCount =
    document.getElementById(
        "eventCount"
    );

if (!eventCount) return;


const target = 12;

let current = 0;


const interval =
    setInterval(function () {

        current++;

        eventCount.textContent =
            current;


        if (current >= target) {

            clearInterval(interval);

        }

    }, 60);
```

}

/* ================= CARD INTERACTION ================= */

document.addEventListener(
"click",
function (event) {

```
    const card =
        event.target.closest(
            ".category-card"
        );


    if (!card) return;


    const title =
        card.querySelector("h3");


    if (title) {

        showToast(
            `Exploring ${title.textContent}`,
            "→"
        );

    }

}
```

);

/* ================= ONLINE STATUS ================= */

window.addEventListener(
"online",
function () {

```
    showToast(
        "You are back online",
        "✓"
    );

}
```

);

window.addEventListener(
"offline",
function () {

```
    showToast(
        "You are offline",
        "!"
    );

}
```

);
