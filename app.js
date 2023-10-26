

const dropDownCategories = document.getElementById("categoriesDropDown")

const plusBtn = document.querySelector(".plus-button")
const openMod = document.querySelector(".add-bookmark-button");

const modal = document.querySelector(".modal-overlay");
const closeMod = document.querySelector(".cancel-button");
const bookmarkForm = document.getElementById("addBookmarkForm");
const bookmarksContainer = document.querySelector(".bookmarks");
const titleInput = bookmarkForm["title"];
const urlInput = bookmarkForm["url"];
const categoryInput = bookmarkForm["category"];

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

const saveBtn = document.querySelector(".save-button")
 

// Form input modal stuff

function openModal() {
    modal.classList.remove("hide");
}
 
function closeModal(e, clickedOutside) {
    // if (clickedOutside) {
    //     if (e.target.classList.contains("modal-overlay"))
    //         modal.classList.add("hide");
    // } else 
    modal.classList.add("hide");
}
 
openMod.addEventListener("click", openModal);
// modal.addEventListener("click", (e) => closeModal(e, true));
closeMod.addEventListener("click", closeModal);


// plus button


function newCategory() {
    dropDownCategories.style.display = "none"
    dropDownCategories.removeAttribute("required")
    let item = `<input type="text" placeholder="Category" name="category" required />`
    bookmarkForm.innerHTML += item
}

plusBtn.addEventListener("click", newCategory);


// localStorage creation of bookmarks stuff



const addBookmark = (title, url, category) => {
    bookmarks.push({
      title,
      url,
      category,
    });
  
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  
    return { title, url, category };
};


const getAllCategories = (bookmarks) => { // get all unique categories
    let categories = []
    for(let i = 0; i < bookmarks.length; i++) {
        if (categories.indexOf(bookmarks[i].category) < 0) {
            // console.log("BRUH "+ bookmarks[i].category)
            categories.push(bookmarks[i].category)
        }
    }
    return categories
}


const createBookmarkElement = ({ title, url, category }) => {

    let item = `<div class="bookmark"> 
                    <a href="${url}" target="_blank">${title}</a>
                    <p> ${category} </p>
                    <button id="detailsButton"> Details </button>
                </div>`
    bookmarksContainer.innerHTML += item;

    bookmarksContainer.style.display = bookmarks.length === 0 ? "none" : "flex";
};

closeMod.addEventListener("click", closeModal);

// sorting by categories

const uniqueCategories = getAllCategories(bookmarks)

// dynamic dropdown
for (let key in uniqueCategories) {
    let option = document.createElement("option");
    option.setAttribute('value', uniqueCategories[key]);
    
    let optionText = document.createTextNode(uniqueCategories[key]);
    option.appendChild(optionText);
  
    dropDownCategories.appendChild(option);
}

for(let i = 0; i < uniqueCategories.length; i++) {
    for(let j = 0; j < bookmarks.length; j++) {
        if(bookmarks[j].category === uniqueCategories[i]) {
            createBookmarkElement(bookmarks[j])
        }
    }
}


function saveForm (e) {
  e.preventDefault();

  const newBookmark = addBookmark(
    titleInput.value,
    urlInput.value,
    categoryInput.value
  );

  createBookmarkElement(newBookmark);

  titleInput.value = "";
  urlInput.value = "";
  categoryInput.value = "";
};

saveBtn.addEventListener("click", saveForm);

const detailsBtn = document.getElementById("detailsButton")
const showDetails = document.querySelector(".details")

function displayDetails() {
    item = `<p> </p>
            <p> </p>
            <p> </p>`
    .innerHTML += item
}


detailsBtn.addEventListener("click", displayDetails);


