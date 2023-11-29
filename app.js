const modal = document.querySelector(".modal-overlay");
const dropDownCategories = document.getElementById("category")
const bookmarkForm = document.getElementById("addBookmarkForm");

const titleInput = bookmarkForm["title"];
const urlInput = bookmarkForm["url"];
const categoryInput = bookmarkForm["category"];

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

// const plusBtn = document.querySelector(".plus-button")

function openModal() {
    modal.classList.remove("hide");
}

function checkIfDefault() {
    const categoryThingy = document.getElementById("category");
    if (categoryThingy.tagName === 'INPUT') {
        categoryThingy.outerHTML = '<select id="category" placeholder="Category" name="category" required></select>'
    }
}

function closeModal() {
    checkIfDefault()    // to bring back dropdown category
    modal.classList.add("hide");
}


function addNewCategory() {
    // JSON.parse()
    // JSON.stringify()
    const dropDownCategories = document.getElementById("category")
    let str = '<input type="text" id="category" placeholder="Category" name="category" required />';
    dropDownCategories.outerHTML = str; 
}


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


const uniqueCategories = getAllCategories(bookmarks)

// dynamic dropdown
for (let key in uniqueCategories) {
    let option = document.createElement("option");
    option.setAttribute('value', uniqueCategories[key]);
    
    let optionText = document.createTextNode(uniqueCategories[key]);
    option.appendChild(optionText);
  
    dropDownCategories.appendChild(option);
}




const addBookmark = (title, url, category) => {
    bookmarks.push({
      title,
      url,
      category,
    });
  
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  
    return { title, url, category };
};


const createBookmarkElement = ({ title, url, category }) => {
    const bookmarksContainer = document.querySelector(".bookmark");
    let item = `<p>${title} <input type="button" onclick="displayDetails('${title}','${url}','${category}')" value="Details"/></p>`
    bookmarksContainer.innerHTML += item;

    // bookmarksContainer.style.display = bookmarks.length === 0 ? "none" : "flex";
};


for(let i = 0; i < uniqueCategories.length; i++) {
    for(let j = 0; j < bookmarks.length; j++) {
        if(bookmarks[j].category === uniqueCategories[i]) {
            createBookmarkElement(bookmarks[j])
        }
    }
}


bookmarkForm.addEventListener("submit", function(e){
    alert("BLYAT")
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
});


function displayDetails(title, url, category) {
    const bookmarkDetails = document.getElementById("details");
    bookmarkDetails.innerHTML = `${title}, ${url}, ${category}`;
}

