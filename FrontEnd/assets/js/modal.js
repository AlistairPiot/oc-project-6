//* Displaying projects with an API *//
// Function for performing the Fetch request and manipulating the data
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Retrieving the parent element from the DOM
        const gallery2 = document.querySelector(".grid-projects");

        // Clear existing projects in the gallery
        gallery2.innerHTML = "";

        // Parcourir les projets et ajouter chaque projet à la galerie
        projects.forEach((project) => {
            const projectElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            imgElement.src = project.imageUrl;
            imgElement.alt = project.title;

            imgElement.classList.add("img");

            projectElement.appendChild(imgElement);

            // Add project to gallery
            gallery2.appendChild(projectElement);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//* Modal *//
let modal = null;
let previouslyFocusedElement = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));

    previouslyFocusedElement = document.querySelector(":focus");
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-stop")
        .addEventListener("click", stopPropagation);

    fetchProjects();
};

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);

    // Delete the body class to reactivate scrolling
    document.body.classList.remove("modal-open");

    modal
        .querySelector(".js-modal-close")
        .removeEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-stop")
        .removeEventListener("click", stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener("animationend", hideModal);
        modal = null;
    };
    modal.addEventListener("animationend", hideModal);
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});

//* Modal ajout *//
// Recovery of the button "Ajout photo"
const btnAjout = document.getElementById("btn-ajout-js");
// Retrieving the parent element from the DOM
const modalAjout = document.getElementById("modal2");

btnAjout.addEventListener("click", openModalAjout);

function openModalAjout(e) {
    e.preventDefault();

    modal.setAttribute("aria-hidden", "true");
    modalAjout.style.display = null;
    modalAjout.removeAttribute("aria-hidden");
    modalAjout.setAttribute("aria-modal", "true");
    modalAjout.addEventListener("click", closeModalAjout);
    modalAjout
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModalAjout);
    modalAjout
        .querySelector(".js-modal-stop")
        .addEventListener("click", stopPropagation);
}

function closeModalAjout(e) {
    e.preventDefault();
    modal.removeAttribute("aria-hidden");
    modalAjout.setAttribute("aria-hidden", "true");
    modalAjout.removeAttribute("aria-modal");
    modalAjout.removeEventListener("click", closeModalAjout);
    modalAjout.style.display = "none";
    modalAjout
        .querySelector(".js-modal-close")
        .removeEventListener("click", closeModalAjout);
    modalAjout
        .querySelector(".js-modal-stop")
        .removeEventListener("click", stopPropagation);
}
