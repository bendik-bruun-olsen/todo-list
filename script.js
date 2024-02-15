const inputForm = document.querySelector("#input-form");
const input = document.querySelector("#text-input")
const error = document.querySelector("#error");
const emptyNotifyText = document.querySelector("#empty-list")
const wrapper = document.querySelector("#wrapper")

const itemList = [];

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
        const newItem = {text: input.value, checked: false}
        itemList.unshift(newItem);
        input.value = "";
        generateList();
    }
    else input.placeholder = "The Field of Input Years for Letters!";

});

function generateList() {
    const previousItems = document.querySelectorAll(".item-container")
    previousItems.forEach(e => e.remove());

    itemList.forEach((e, i) => {
        const item = document.createElement("div");
        const iconContainer = document.createElement("div");
        const itemText = document.createElement("p");
        const btnRemove = document.createElement("i");
        const checkedIcon = document.createElement("i");

        item.classList.add("item-container");
        itemText.classList.add("item-text");
        btnRemove.classList.add("fas", "fa-minus-circle", "icon", "iconRemove");
        checkedIcon.classList.add("far", "fa-check-circle", "notChecked");

        itemText.textContent = e.text;

        iconContainer.append(checkedIcon, btnRemove);
        item.append(itemText, iconContainer);
        wrapper.append(item);

        btnRemove.addEventListener("click", () => {
            itemList.splice(i, 1);
            generateList();
        });
    
        checkedIcon.addEventListener("click", () => {
            e.checked = !e.checked;
            handleCheck(item, e.checked);
            // save();
        });

        
        console.log(itemList.length)
    });
    
    itemList.length === 0 ? emptyNotifyText.style.display = "block" : emptyNotifyText.style.display = "none"
};

function handleCheck(item, isChecked) {
    const icon = item.querySelector(".fa-check-circle");
    const itemText = item.querySelector(".item-text");

    if (isChecked) {
        icon.classList.remove("notChecked", "far");
        icon.classList.add("checked", "fas");
        itemText.style.textDecoration = "line-through";
        item.style.opacity = "50%"
    }
    else {
        icon.classList.remove("checked", "fas");
        icon.classList.add("notChecked", "far");
        itemText.style.textDecoration = "none";
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