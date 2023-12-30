import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../../../js/utils/utils.js";

getBooks();
async function getBooks() {
  const response = await fetch(backendURL + "/api/book", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    const json = await response.json();
    displayBooks(json);

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

getLoggedUser();
// Submit Form Functionality; This is for Create and Update
const event_form = document.getElementById("event_form");

event_form.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#event_form button[type='submit']").disabled = true;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(event_form);

  // Fetch API Carousel Item Store Endpoint
  const response = await fetch(backendURL + "/api/book", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  if (response.ok) {
    const json = await response.json();

    console.log(json);

    event_form.reset();

    successNotification("Successfully added an Event!", 5);
  } else if (response.status == 422) {
    const json = await response.json();

    // Close Modal Form
    //document.getElementById("modal_close").click();

    //errorNotification(json.message, 10);
  }

  document.querySelector("#event_form button[type='submit']").disabled = false;
  document.querySelector("#event_form button[type='submit']").innerHTML =
    "Submit";
};

function displayBooks(books) {
  const bookListContainer = document.getElementById("bookList");

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "card mb-4 shadow"; // Add Bootstrap card class and shadow for a more creative look

    bookCard.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${backendURL}/storage/${book.image}" alt="Image" class="img-fluid rounded-start" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3 class="card-title text-primary">${book.title}</h3>
            <p class="card-text">Author: ${book.author}</p>
            <p class="card-text">ISBN: ${book.ISBN}</p>
            <p class="card-text">Condition: ${book.condition}</p>
            <p class="card-text">Department ID: ${book.department_id}</p>
            <p class="card-text">Description: ${book.description}</p>
            <p class="card-text">Publication Year: ${book.publication_year}</p>
            <p class="card-text">Status: ${book.status}</p>
          </div>
        </div>
      </div>
      <hr class="my-2">
    `;

    bookListContainer.appendChild(bookCard);
  });
}

// Assuming you have a div with the id "bookList" in your HTML
// <div id="bookList"></div>

// Assuming you have a div with the id "bookList" in your HTML
// <div id="bookList"></div>

// Assuming you have a div with the id "bookList" in your HTML
// <div id="bookList"></div>
