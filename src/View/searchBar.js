import { receiveQueryFromView } from "../Controller/index.js";
import "./searchBarStyle.css";

export const loadSearchBar = (searchBarContainer) => {
  let searchForm = document.createElement("form");
  searchForm.classList.add("search-form");

  // Create label element
  let label = document.createElement("label");
  label.setAttribute("for", "search-bar");
  label.textContent = "Search:";
  label.classList.add("search-label");

  // Create input element
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("id", "search-bar");
  searchInput.setAttribute("name", "query");
  searchInput.setAttribute("placeholder", "Type here to search");

  // Create button element
  let searchButton = document.createElement("button");
  searchButton.setAttribute("type", "submit");
  searchButton.textContent = "Search";
  searchButton.classList.add("search-button");
  searchButton.addEventListener("click", (e) => actionUponSearch(e));

  // Append elements to the form
  searchForm.appendChild(label);
  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  // Append the form to the body or any other container element
  searchBarContainer.appendChild(searchForm);
};

const actionUponSearch = (e) => {
  e.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let searchQuery = searchInput.value;
  sendQueryToController(searchQuery);
  searchInput.value = "";
};

//send control back to the controller
const sendQueryToController = (searchQuery) => {
  receiveQueryFromView(searchQuery);
};

export const displayErrorMessage = () => {
  let errorDialog = document.getElementById("errorDialog");
  let message = "Location not found, please provide a proper input";

  if (!errorDialog) {
    // Create the dialog element
    errorDialog = document.createElement("dialog");
    errorDialog.classList.add("dialog-style");
    errorDialog.setAttribute("id", "errorDialog");

    // Create the message paragraph
    let messagePara = document.createElement("p");
    messagePara.classList.add("dialog-content");
    messagePara.textContent = message;

    // Create a close button
    let closeButton = document.createElement("button");
    closeButton.classList.add("dialog-close-button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      errorDialog.close(); // Close the dialog
    });

    // Append elements to the dialog
    errorDialog.appendChild(messagePara);
    errorDialog.appendChild(closeButton);

    // Append the dialog to the body
    document.body.appendChild(errorDialog);
  } else {
    // If the dialog already exists, just update the message
    errorDialog.querySelector("p").textContent = message;
  }

  // Show the dialog
  errorDialog.showModal();
};

export function loadBackgroundAnimation(animationData) {
    let body = document.querySelector("body");
    body.style.backgroundImage = `url(${animationData.data.images.original.url})`;
}
