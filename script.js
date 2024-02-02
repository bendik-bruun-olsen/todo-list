const input = document.querySelector("#text-input");
const error = document.querySelector("#error");
const emptyTxt = document.querySelector("#empty-list")
const orderedList = document.querySelector("#orderedList")
let currentItems = document.querySelectorAll(".item")

document.getElementById("addToList").addEventListener("click", function() {
    input.value.length > 0 ? generateList() : input.placeholder = "Ye Field of Input Yearns for Letters!"
});
const checkListEmpty = () => {
    currentItems = document.querySelectorAll(".item");
    emptyTxt.style.display = currentItems.length > 0 ? "none" : "block";
}

retrieveSaved();
save();

function generateList() {
    // generate list items

    checkListEmpty();
    
    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("item-container") 

    const text = document.createElement("p");
    text.textContent = input.value;
    text.classList.add("item-text");

    const btnRemove = document.createElement("i");
    btnRemove.classList.add("fas", "fa-minus-circle", "icon", "iconRemove");
    btnRemove.addEventListener("click", function(event) {
        removeItem(event);
    });

    const completed = document.createElement("i");
    completed.classList.add("far", "fa-check-circle", "notChecked")
    completed.addEventListener("click", function() {
        if (completed.classList.contains("notChecked")) {
            completed.classList.remove("notChecked", "far");
            completed.classList.add("checked", "fas");
        }
        else {
            completed.classList.remove("checked", "fas");
            completed.classList.add("notChecked", "far");
        }
        save();
    })

    newItemContainer.append(text, completed, btnRemove);
    newItem.append(newItemContainer);
    orderedList.append(newItem);

    emptyTxt.style.display = "none";
    input.value = "";
    input.focus();
    save();
}

function removeItem(event) {
    // Remove list items

    event.target.closest("li").remove();
    checkListEmpty();
    save();
}

function save() {
    // Save list items to localStorage

    const items = [];
    document.querySelectorAll(".item").forEach(item => { 
        const icon = item.querySelector(".fa-check-circle")
        const checked = icon.classList.contains("checked") ? 1 : 0
        const text = item.querySelector(".item-text")
        items.push({ text: text.textContent, checked: checked})
    })
    localStorage.setItem("listItems", JSON.stringify(items))
    console.log("Saved: ", items)
} 

function retrieveSaved() {
    // Retrieve saved list items from localStorage

    const storedItems = JSON.parse(localStorage.getItem("listItems"))
    if (storedItems) {
        storedItems.forEach(item => {
            input.value = item.text
            generateList();

            if (item.checked) {
                const lastAddedItem = orderedList.lastChild
                const icon = lastAddedItem.querySelector(".fa-check-circle")
                icon.classList.remove("notChecked", "far")
                icon.classList.add("checked", "fas")
            }
        })


    }
    console.log("Retrieved: ", storedItems)
    checkListEmpty();
}