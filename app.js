const modal = document.querySelector(".modal-overlay");
// const openMod = document.querySelector(".add-bookmark-button");
// const closeMod = document.querySelector(".cancel-button");

const dropDownCategories = document.getElementById("category")
const plusBtn = document.querySelector(".plus-button")

function openModal() {
    modal.classList.remove("hide");
}
 
function closeModal() {
    // if (clickedOutside) {
    //     if (e.target.classList.contains("modal-overlay"))
    //         modal.classList.add("hide");
    // } else 
    modal.classList.add("hide");
}
// openMod.addEventListener("click", openModal);
// modal.addEventListener("click", (e) => closeModal(e, true));
// closeMod.addEventListener("click", closeModal);

function newCategory() {
    // JSON.parse()
    // JSON.stringify()
    
    let str = '<input type="text" id="category" placeholder="Category" name="category" required />';
    dropDownCategories.outerHTML = str; 
}