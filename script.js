const materials = [
  {
    title: "Dark shadow",
    short: "Dark metal",
    image: "./assets/materials/approved-dark-metal.webp",
    description:
      "The baseline surface treatment: deep sandblasted metal with a restrained cyan response from the central volume light.",
    meta: [
      ["Family", "Sandblasted metal"],
      ["Finish", "Deep matte"],
      ["Light response", "Soft cyan falloff"],
      ["Transparency", "Opaque"],
    ],
  },
  {
    title: "Satin graphite",
    short: "Satin graphite",
    image: "./assets/materials/satin-graphite.webp?v=halo-free-1",
    description:
      "A softer graphite surface with broad highlights and enough diffusion to separate every sphere without losing depth.",
    meta: [
      ["Family", "Coated metal"],
      ["Finish", "Satin"],
      ["Light response", "Broad"],
      ["Transparency", "Opaque"],
    ],
  },
  {
    title: "Black chrome",
    short: "Black chrome",
    image: "./assets/materials/black-chrome.webp",
    description:
      "A near-black reflective finish with granular light falloff, balancing crisp reflections against the dark lattice.",
    meta: [
      ["Family", "Polished metal"],
      ["Finish", "Granular gloss"],
      ["Light response", "Reflective"],
      ["Transparency", "Opaque"],
    ],
  },
  {
    title: "Oxidized steel",
    short: "Oxidized steel",
    image: "./assets/materials/oxidized-steel.webp?v=halo-free-1",
    description:
      "Weathered steel introduces a dry, irregular surface while preserving the disciplined geometry of the system.",
    meta: [
      ["Family", "Weathered metal"],
      ["Finish", "Oxidized"],
      ["Light response", "Diffuse"],
      ["Transparency", "Opaque"],
    ],
  },
  {
    title: "Matte ceramic",
    short: "Matte ceramic",
    image: "./assets/materials/matte-ceramic.webp?v=halo-free-1",
    description:
      "A dense ceramic interpretation with quiet highlights, soft tonal transitions, and a tactile mineral quality.",
    meta: [
      ["Family", "Ceramic"],
      ["Finish", "Matte"],
      ["Light response", "Soft"],
      ["Transparency", "Opaque"],
    ],
  },
  {
    title: "Smoky glass",
    short: "Smoky glass",
    image: "./assets/materials/smoky-glass.webp",
    description:
      "The selected glass direction. Dark absorption, noisy refraction, and a powerful cyan core reveal the lattice from within.",
    meta: [
      ["Family", "Architectural glass"],
      ["Finish", "Smoky gloss"],
      ["Light response", "Refractive"],
      ["Transparency", "Low"],
    ],
  },
  {
    title: "Physical-light glass",
    short: "Physical glass",
    image: "./assets/materials/physical-light-glass.webp?v=halo-free-1",
    description:
      "A physically motivated glass test in which reflections and refractions respond directly to the authored scene lights.",
    meta: [
      ["Family", "Physical glass"],
      ["Finish", "Polished"],
      ["Light response", "Scene-driven"],
      ["Transparency", "Medium"],
    ],
  },
  {
    title: "Translucent smoky glass",
    short: "Translucent glass",
    image: "./assets/materials/translucent-smoky-glass.webp",
    description:
      "A more transparent smoky glass that subtly reveals spheres behind the foreground layer while retaining the dark silhouette.",
    meta: [
      ["Family", "Smoky glass"],
      ["Finish", "Polished"],
      ["Light response", "Refractive"],
      ["Transparency", "Elevated"],
    ],
  },
];

const motions = [
  {
    title: "Orbital repulsion",
    image: "./assets/animations/orbital-repulsion.webp",
    description:
      "The cyan core orbits on a tight spherical path, acting as a magnetic field that pushes nearby spheres outward.",
    meta: ["Perfect loop", "Force field", "Smoky glass"],
  },
  {
    title: "Falling field",
    image: "./assets/animations/falling-field.webp",
    description:
      "An invisible force falls through the center. The top sphere and core light attract while the remaining lattice repels.",
    meta: ["Perfect loop", "Attract + repel", "Eased"],
  },
  {
    title: "Rubik rotations",
    image: "./assets/animations/rubiks-rotations.webp",
    description:
      "Nine rigid ninety-degree group rotations reconfigure the lattice with the deliberate logic of a mechanical puzzle.",
    meta: ["Perfect loop", "9 rotations", "Half speed"],
  },
  {
    title: "Endless summer",
    image: "./assets/animations/continuous-wave.webp",
    description:
      "One continuous phase field travels left to right, joining all twenty-seven spheres into a single fluid surface.",
    meta: ["Perfect loop", "Continuous field", "Final study"],
  },
];

const materialImage = document.querySelector("#material-image");
const materialPreview = document.querySelector(".material-preview");
const materialIndex = document.querySelector("#material-index");
const materialCaption = document.querySelector("#material-caption");
const materialTitle = document.querySelector("#material-title");
const materialDescription = document.querySelector("#material-description");
const materialMeta = document.querySelector("#material-meta");
const materialPosition = document.querySelector("#material-position");
const materialGrid = document.querySelector("#material-grid");
const motionGrid = document.querySelector("#motion-grid");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const lightbox = document.querySelector("#lightbox");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxType = document.querySelector("#lightbox-type");

let activeMaterial = 0;
let parallaxFrame = null;

const pad = (value) => String(value).padStart(2, "0");

function setTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  themeLabel.textContent = isLight ? "Dark room" : "Light room";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark viewing room" : "Switch to light viewing room",
  );
  localStorage.setItem("cube-showcase-theme", isLight ? "light" : "dark");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

setTheme(localStorage.getItem("cube-showcase-theme") || "dark");

function updateDotParallax() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = reduceMotion ? 0 : window.scrollY * -0.5;
  document.documentElement.style.setProperty("--dot-parallax-y", `${offset}px`);
  parallaxFrame = null;
}

window.addEventListener(
  "scroll",
  () => {
    if (parallaxFrame === null) {
      parallaxFrame = requestAnimationFrame(updateDotParallax);
    }
  },
  { passive: true },
);

updateDotParallax();

function selectMaterial(index, options = {}) {
  activeMaterial = (index + materials.length) % materials.length;
  const material = materials[activeMaterial];
  const label = `${pad(activeMaterial + 1)} / ${pad(materials.length)}`;

  materialPreview.classList.add("is-changing");
  window.setTimeout(() => {
    materialImage.src = material.image;
    materialImage.alt = `Cube of Spheres rendered in ${material.title}`;
    materialIndex.textContent = label;
    materialCaption.textContent = material.title;
    materialTitle.textContent = material.title;
    materialDescription.textContent = material.description;
    materialPosition.textContent = `${pad(activeMaterial + 1)} — ${pad(materials.length)}`;
    materialMeta.innerHTML = material.meta
      .map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`)
      .join("");

    document.querySelectorAll(".material-card").forEach((card, cardIndex) => {
      if (cardIndex === activeMaterial) {
        card.setAttribute("aria-current", "true");
      } else {
        card.removeAttribute("aria-current");
      }
    });

    requestAnimationFrame(() => materialPreview.classList.remove("is-changing"));
  }, options.immediate ? 0 : 160);
}

materials.forEach((material, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "material-card";
  card.setAttribute("aria-label", `View ${material.title}`);
  card.innerHTML = `
    <img src="${material.image}" alt="" loading="lazy" />
    <span class="material-card-copy">
      <span>${pad(index + 1)}</span>
      <strong>${material.short}</strong>
    </span>
  `;
  card.addEventListener("click", () => {
    selectMaterial(index);
    materialPreview.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  materialGrid.append(card);
});

motions.forEach((motion, index) => {
  const article = document.createElement("article");
  article.className = "motion-card";
  article.innerHTML = `
    <button class="motion-media" type="button" aria-label="View ${motion.title} fullscreen">
      <img src="${motion.image}" alt="${motion.title} animation" loading="lazy" />
      <span class="motion-number">${pad(index + 1)}</span>
    </button>
    <div class="motion-copy">
      <div>
        <h3>${motion.title}</h3>
        <div class="motion-meta">${motion.meta.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
      <p>${motion.description}</p>
    </div>
  `;
  article.querySelector(".motion-media").addEventListener("click", () => {
    openLightbox(motion.image, motion.title, `Motion ${pad(index + 1)}`);
  });
  motionGrid.append(article);
});

function openLightbox(source, title, type) {
  const image = new Image();
  image.src = source;
  image.alt = title;
  lightboxMedia.replaceChildren(image);
  lightboxTitle.textContent = title;
  lightboxType.textContent = type;
  lightbox.showModal();
}

document.querySelector("#previous-material").addEventListener("click", () => {
  selectMaterial(activeMaterial - 1);
});

document.querySelector("#next-material").addEventListener("click", () => {
  selectMaterial(activeMaterial + 1);
});

document.querySelector('[data-expand="material"]').addEventListener("click", () => {
  const material = materials[activeMaterial];
  openLightbox(material.image, material.title, `Material ${pad(activeMaterial + 1)}`);
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.open) return;
  if (event.key === "ArrowLeft") selectMaterial(activeMaterial - 1);
  if (event.key === "ArrowRight") selectMaterial(activeMaterial + 1);
});

selectMaterial(0, { immediate: true });
