const modal = document.querySelector(".modal-overlay");
const dropDownCategories = document.getElementById("category")
const bookmarkForm = document.getElementById("addBookmarkForm");

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];



function openModal() {
    modal.classList.remove("hide");
}




bookmarkForm.addEventListener("submit", function(e){
    const titleInput = bookmarkForm["title"];
    const urlInput = bookmarkForm["url"];
    const categoryInput = bookmarkForm["category"];
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


function addNewCategory() {
    const dropDownCategories = document.getElementById("category");
    const plusBtn = document.getElementById("plus-button");
    plusBtn.hidden = true;
    // plusBtn.outerHTML = "";
    let str = '<input type="text" id="category" placeholder="Category" name="category" required />';
    dropDownCategories.outerHTML = str; 
}



const getAllCategories = () => { // get all unique categories
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let categories = []
    for(let i = 0; i < bookmarks.length; i++) {
        if (categories.indexOf(bookmarks[i].category) < 0) {
            categories.push(bookmarks[i].category)
        }
    }
    return categories
}

const uniqueCategories = getAllCategories()

const dynamicDropdown = () => {
    // dynamic dropdown
    const dropDownCategories = document.getElementById("category")
    const uniqueCategories = getAllCategories()
    for (let key in uniqueCategories) {
        let option = document.createElement("option");
        option.setAttribute('value', uniqueCategories[key]);
        
        let optionText = document.createTextNode(uniqueCategories[key]);
        option.appendChild(optionText);
    
        dropDownCategories.appendChild(option);
}
}

dynamicDropdown();


function checkIfDefault() {
    const categoryThingy = document.getElementById("category");
    if (categoryThingy.tagName === 'INPUT') {
        categoryThingy.outerHTML = '<select id="category" placeholder="Category" name="category" required></select>';
        dynamicDropdown();
    }
    const plusBtn = document.getElementById("plus-button");
    plusBtn.hidden = false;
}

function closeModal() {
    checkIfDefault()    // to bring back dropdown category
    modal.classList.add("hide");
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


const createNewCategoryDiv = (category) => {
    const bookmarksSection = document.querySelector(".bookmarks")
    let categoryHeading = `<h3>Category: ${category}</h3>`;
    bookmarksSection.innerHTML += categoryHeading;
    bookmarksSection.innerHTML += `<div class='bookmark' id='${category}'></div>`
}


const createBookmarkElement = ({ title, url, category }) => {
    let eachBookmarksContainer = document.getElementById(`${category}`);
    if (eachBookmarksContainer === null) {
        createNewCategoryDiv(category)
        eachBookmarksContainer = document.getElementById(`${category}`);
    }
    let item = `<p><a href="${url}" target="_blank">${title}</a> <input type="button" onclick="displayDetails('${title}','${url}','${category}')" value="Details"/></p>`
    eachBookmarksContainer.innerHTML += item;

    // bookmarksContainer.style.display = bookmarks.length === 0 ? "none" : "flex";
};


const displayAllBookmarks = () => {
    for(let i = 0; i < uniqueCategories.length; i++) {
        createNewCategoryDiv(uniqueCategories[i])
        for(let j = 0; j < bookmarks.length; j++) {
            if(bookmarks[j].category === uniqueCategories[i]) {
                createBookmarkElement(bookmarks[j])
            }
        }
    }
}

displayAllBookmarks();





function displayDetails(title, url, category) {
    const bookmarkDetails = document.getElementById("details");
    const toShow = `<p>Title: ${title}</p>
                    <p>URL: <a href='${url}' target=_blank>${url}</a></p>
                    <p>Category: ${category}</p>`
    bookmarkDetails.innerHTML = toShow;
}

