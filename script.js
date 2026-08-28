const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

menuButton.addEventListener("click", () => {
    const menuIsOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", menuIsOpen);
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const projectsTrack = document.querySelector(".projects-track");
const projectCards = document.querySelectorAll(".project-card");
const previousProjectButton = document.querySelector(".previous-project");
const nextProjectButton = document.querySelector(".next-project");

let currentProject = 0;

function projectsVisible() {
    return window.innerWidth <= 900 ? 1 : 2;
}

function updateProjectSlider() {
    const visibleProjects = projectsVisible();
    const maximumIndex = Math.max(
        0,
        projectCards.length - visibleProjects
    );

    currentProject = Math.min(currentProject, maximumIndex);

    const cardWidth = projectCards[0].getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(projectsTrack);
    const gap = parseFloat(trackStyles.gap) || 0;
    const distance = currentProject * (cardWidth + gap);

    projectsTrack.style.transform = `translateX(-${distance}px)`;

    previousProjectButton.disabled = currentProject === 0;
    nextProjectButton.disabled = currentProject === maximumIndex;
}

previousProjectButton.addEventListener("click", () => {
    if (currentProject > 0) {
        currentProject -= 1;
        updateProjectSlider();
    }
});

nextProjectButton.addEventListener("click", () => {
    const maximumIndex = Math.max(
        0,
        projectCards.length - projectsVisible()
    );

    if (currentProject < maximumIndex) {
        currentProject += 1;
        updateProjectSlider();
    }
});

window.addEventListener("resize", updateProjectSlider);

updateProjectSlider();