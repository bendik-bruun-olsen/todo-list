const inputForm = document.querySelector("#input-form");
const input = document.querySelector("#text-input")
const error = document.querySelector("#error");
const emptyNotifyTxt = document.querySelector("#empty-list")
const wrapper = document.querySelector("#wrapper")

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    input.value.length > 0 ? createItem(input.value, false) : input.placeholder = "Ye Field of Input Yearns for Letters!";
});

function createItem(text, checked) {

    const item = document.createElement("div");
    const iconContainer = document.createElement("div")

    const itemText = document.createElement("p");
    const btnRemove = document.createElement("i");
    const checkedIcon = document.createElement("i");

    item.classList.add("item-container");
    itemText.classList.add("item-itemText");
    btnRemove.classList.add("fas", "fa-minus-circle", "icon", "iconRemove");
    checkedIcon.classList.add("far", "fa-check-circle", "notChecked");

    itemText.textContent = text;

    btnRemove.addEventListener("click", () => {
        item.remove();
    });

    checkedIcon.addEventListener("click", () => {
        handleChecked(item, checked);
        // save();
    })

    iconContainer.append(checkedIcon, btnRemove)
    item.append(itemText, iconContainer);
    wrapper.append(item);
};

function handleChecked(item, checked) {
    const icon = item.querySelector(".fa-check-circle");
    const itemText = item.querySelector(".item-itemText");

    if (checked) {
        icon.classList.remove("notChecked", "far");
        icon.classList.add("checked", "fas");
        itemText.style.itemTextDecoration = "line-through";
        item.style.opacity = "50%"
    }
    else {
        icon.classList.remove("checked", "fas");
        icon.classList.add("notChecked", "far");
        itemText.style.itemTextDecoration = "none";
        item.style.opacity = "100%";
    };
};


// retrieveSaved();
// save();

// function generateList() {
//     // generate list items

//     checkListEmpty();

//     emptyNotifyTxt.style.display = "none";
//     input.value = "";
//     input.focus();
//     save();
// }


// function save() {
//     // Save list items to localStorage
//     const items = [];
//     document.querySelectorAll(".item").forEach(item => { 
//         const icon = item.querySelector(".fa-check-circle")
//         const checked = icon.classList.contains("checked") ? 1 : 0
//         const itemText = item.querySelector(".item-itemText")
//         items.push({ itemText: itemText.itemTextContent, checked: checked})
//     })
//     localStorage.setItem("listItems", JSON.stringify(items))
// } 

// function retrieveSaved() {
//     // Retrieve saved list items from localStorage
//     const storedItems = JSON.parse(localStorage.getItem("listItems"))
//     if (storedItems) {
//         storedItems.forEach(item => {
//             input.value = item.itemText
//             generateList();

//             if (item.checked) {
//                 const lastAddedItem = orderedList.lastChild
//                 handleChecked(lastAddedItem);
//             }
//         })


//     }
//     checkListEmpty();
// }