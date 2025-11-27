// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const topNav = document.querySelector(".top-nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    topNav.classList.toggle("nav-open");
  });
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple crop database (you can extend this)
const crops = [
  {
    name: "Rice",
    climates: ["tropical", "subtropical"],
    seasons: ["kharif"],
    months: [6, 7, 8],
    maintenance: "High",
    duration: "100–150 days",
    water: "Requires standing water or frequent irrigation.",
    notes: "Suitable for low‑lying fields with good water availability."
  },
  {
    name: "Wheat",
    climates: ["subtropical", "temperate"],
    seasons: ["rabi"],
    months: [10, 11, 12],
    maintenance: "Medium",
    duration: "110–140 days",
    water: "Requires timely irrigation at critical stages.",
    notes: "Prefers cool, dry weather during growth."
  },
  {
    name: "Maize",
    climates: ["tropical", "subtropical", "temperate"],
    seasons: ["kharif", "summer"],
    months: [6, 7, 2, 3, 4],
    maintenance: "Medium",
    duration: "90–120 days",
    water: "Moderate, sensitive to drought at flowering.",
    notes: "Good starter crop, used for grain, fodder, and silage."
  },
  {
    name: "Tomato",
    climates: ["tropical", "subtropical"],
    seasons: ["rabi", "summer"],
    months: [7, 8, 9, 10, 11, 12, 1, 2],
    maintenance: "High",
    duration: "90–120 days",
    water: "Regular light irrigation, especially at fruit set.",
    notes: "High value but sensitive to pests, diseases, and heat."
  },
  {
    name: "Okra (Lady’s finger)",
    climates: ["tropical", "subtropical"],
    seasons: ["kharif", "summer"],
    months: [3, 4, 5, 6, 7, 8],
    maintenance: "Medium",
    duration: "60–90 days",
    water: "Moderate, avoid waterlogging.",
    notes: "Good for small farmers, continuous picking required."
  },
  {
    name: "Chickpea (Gram)",
    climates: ["subtropical", "temperate", "arid"],
    seasons: ["rabi"],
    months: [10, 11],
    maintenance: "Low",
    duration: "100–120 days",
    water: "Low to moderate; suitable for residual moisture.",
    notes: "Good option for low‑input, rainfed areas."
  },
  {
    name: "Groundnut (Peanut)",
    climates: ["tropical", "subtropical"],
    seasons: ["kharif", "summer"],
    months: [6, 7, 8, 3, 4],
    maintenance: "Medium",
    duration: "110–130 days",
    water: "Moderate, sensitive to waterlogging.",
    notes: "Improves soil through biological nitrogen fixation."
  }
];

// Planner logic
const plannerForm = document.getElementById("plannerForm");
const plannerResults = document.getElementById("plannerResults");

if (plannerForm && plannerResults) {
  plannerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const climate = document.getElementById("climate").value;
    const month = Number(document.getElementById("month").value);
    const season = document.getElementById("season").value;
    const landSize = document.getElementById("landSize").value;

    if (!climate || !month || !season) {
      plannerResults.innerHTML =
        '<p class="placeholder" style="color:#b91c1c;">Please select climate, month, and season.</p>';
      return;
    }

    const matches = crops.filter((crop) => {
      const climateMatch = crop.climates.includes(climate);
      const seasonMatch = crop.seasons.includes(season);
      const monthMatch = crop.months.includes(month);
      return climateMatch && seasonMatch && monthMatch;
    });

    if (!matches.length) {
      plannerResults.innerHTML =
        '<p class="placeholder">No direct match found. Try adjusting month or season, or consult local experts.</p>';
      return;
    }

    const list = document.createElement("div");
    matches.forEach((crop) => {
      const card = document.createElement("article");
      card.className = "crop-card";

      const header = document.createElement("div");
      header.className = "crop-card-header";

      const name = document.createElement("div");
      name.className = "crop-name";
      name.textContent = crop.name;

      const tag = document.createElement("span");
      tag.className = "crop-tag";
      tag.textContent = `${crop.maintenance} maintenance`;

      header.appendChild(name);
      header.appendChild(tag);

      const meta = document.createElement("div");
      meta.className = "crop-meta";

      const duration = document.createElement("span");
      duration.textContent = `Duration: ${crop.duration}`;

      const water = document.createElement("span");
      water.textContent = `Water: ${crop.water}`;

      meta.appendChild(duration);
      meta.appendChild(water);

      const note = document.createElement("p");
      note.style.margin = "6px 0 0";
      note.style.fontSize = "12px";
      note.style.color = "#4b5563";
      note.textContent = crop.notes;

      if (landSize === "small" && crop.maintenance === "High") {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = "Consider starting on a small area";
        meta.appendChild(badge);
      }

      card.appendChild(header);
      card.appendChild(meta);
      card.appendChild(note);

      list.appendChild(card);
    });

    plannerResults.innerHTML = "";
    plannerResults.appendChild(list);
  });
}

// Timeline expand/collapse
const steps = document.querySelectorAll(".timeline-step");
steps.forEach((step) => {
  const header = step.querySelector(".step-header");
  header.addEventListener("click", () => {
    const isOpen = step.classList.contains("open");
    steps.forEach((s) => s.classList.remove("open"));
    if (!isOpen) {
      step.classList.add("open");
    }
  });
});
