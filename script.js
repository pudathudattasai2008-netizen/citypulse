/* =========================================================
   CITYPULSE 2.0
   JavaScript
========================================================= */


/* =========================================================
   THEME
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("citypulse-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}


themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const isDark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "citypulse-theme",
    isDark ? "dark" : "light"
  );

  showToast(
    isDark
      ? "Dark mode enabled"
      : "Light mode enabled"
  );

});


/* =========================================================
   CITY CLOCK
========================================================= */

function updateClock() {

  const clock =
    document.getElementById("cityTime");

  if (!clock) return;

  const now = new Date();

  const time =
    now.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }
    );

  clock.textContent = time;

}


updateClock();

setInterval(
  updateClock,
  1000
);


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
  document.getElementById("searchInput");


searchInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      const query =
        searchInput.value.trim();

      if (!query) {

        showToast(
          "Type something to search"
        );

        return;
      }

      showToast(
        `Searching for "${query}"`
      );

    }

  }
);


/* =========================================================
   CTRL + K SEARCH
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      searchInput.focus();

      searchInput.select();

    }

  }
);


/* =========================================================
   NEAR ME
========================================================= */

const nearMeButton =
  document.getElementById("nearMeButton");


nearMeButton.addEventListener(
  "click",
  () => {

    if (!navigator.geolocation) {

      showToast(
        "Location is not supported"
      );

      return;
    }


    showToast(
      "Finding activity near you..."
    );


    navigator.geolocation.getCurrentPosition(

      () => {

        showToast(
          "Nearby city activity found"
        );

      },

      () => {

        showToast(
          "Showing Hyderabad activity"
        );

      }

    );

  }
);


/* =========================================================
   LOCATION BUTTON
========================================================= */

const locationButton =
  document.getElementById(
    "locationButton"
  );


locationButton.addEventListener(
  "click",
  () => {

    showToast(
      "Current city: Hyderabad"
    );

  }
);


/* =========================================================
   SCROLL
========================================================= */

function scrollToSection(id) {

  const section =
    document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById("toast");

  const toastText =
    document.getElementById("toastText");


  toastText.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove("show");

      },
      2600
    );

}


/* =========================================================
   ANIMATED NUMBERS
========================================================= */

function animateNumber(
  element,
  target,
  duration = 900
) {

  let start = 0;

  const startTime =
    performance.now();


  function update(currentTime) {

    const progress =
      Math.min(
        (currentTime - startTime) /
        duration,
        1
      );


    const value =
      Math.floor(
        progress * target
      );


    element.textContent =
      value;


    if (progress < 1) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


/* =========================================================
   INITIAL STATS
========================================================= */

window.addEventListener(
  "load",
  () => {

    const events =
      document.getElementById(
        "eventCount"
      );

    const updates =
      document.getElementById(
        "updateCount"
      );


    animateNumber(
      events,
      12
    );

    animateNumber(
      updates,
      24
    );

  }
);


/* =========================================================
   NAV ACTIVE STATE
========================================================= */

const navLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


navLinks.forEach(
  (link) => {

    link.addEventListener(
      "click",
      () => {

        navLinks.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        link.classList.add(
          "active"
        );

      }
    );

  }
);


/* =========================================================
   SEARCH FILTER FEEDBACK
========================================================= */

searchInput.addEventListener(
  "input",
  () => {

    const value =
      searchInput.value
        .toLowerCase()
        .trim();


    if (
      value.includes("food") ||
      value.includes("restaurant")
    ) {

      searchInput.style.borderColor =
        "#18a66a";

    }

    else if (
      value.includes("traffic") ||
      value.includes("alert")
    ) {

      searchInput.style.borderColor =
        "#ef4444";

    }

    else {

      searchInput.style.borderColor =
        "";

    }

  }
);


/* =========================================================
   INTERSECTION ANIMATION
========================================================= */

const animatedElements =
  document.querySelectorAll(
    ".activity-card, .event-card, .alert-card, .category-grid button"
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


animatedElements.forEach(
  (element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(18px)";

    element.style.transition =
      "opacity .6s ease, transform .6s ease";

    observer.observe(
      element
    );

  }
);


/* =========================================================
   MAP INTERACTION
========================================================= */

const mapPins =
  document.querySelectorAll(
    ".map-pin"
  );


mapPins.forEach(
  (pin, index) => {

    pin.addEventListener(
      "click",
      () => {

        const messages = [

          "Live music activity nearby",

          "Popular food location",

          "Art activity nearby",

          "Traffic update available"

        ];


        showToast(
          messages[index] ||
          "City activity selected"
        );

      }
    );

  }
);


/* =========================================================
   CONSOLE BRAND MESSAGE
========================================================= */

console.log(
  "%c CityPulse ",
  "background:#5b4df7;color:white;padding:8px;border-radius:8px;font-weight:bold"
);

console.log(
  "Your city. Your moment."
);
