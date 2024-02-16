const inputForm = document.querySelector("#input-form");
const input = document.querySelector("#text-input");
const emptyNotifyText = document.querySelector("#empty-list");
const wrapper = document.querySelector("#wrapper");
const hideCompleted = document.querySelector("#hide-completed");
const showNumbers = document.querySelector("#show-num")

let originalList = [];
const storedList = localStorage.getItem("originalList")
if (storedList) {
    originalList = JSON.parse(storedList);
    generateList(sortList());
};

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
        const newItem = {text: input.value, checked: false};
        originalList.unshift(newItem);
        input.value = "";
        generateList(sortList());
        saveList();
    }
    else input.placeholder = "The Field of Input Yearns for Letters!";
});

showNumbers.addEventListener("change", () => {
    generateList(sortList());
})

hideCompleted.addEventListener("change", () => {
    generateList(sortList());
});

function generateList(arr) {
    const previousItems = document.querySelectorAll(".item-container")
    previousItems.forEach(e => e.remove());

    arr.forEach((e, i) => {
        const item = document.createElement("div");
        const iconContainer = document.createElement("div");
        const arrowsContainer = document.createElement("div")
        const itemText = document.createElement("p");
        const btnRemove = document.createElement("i");
        const checkedIcon = document.createElement("i");
        const arrowUp = document.createElement("i");
        const arrowDown = document.createElement("i");

        item.classList.add("item-container");
        itemText.classList.add("item-text");
        iconContainer.classList.add("icon-container");
        arrowsContainer.classList.add("arrows-container");
        btnRemove.classList.add("fas", "fa-minus-circle", "remove-btn");
        checkedIcon.classList.add("far", "fa-check-circle", "notChecked");
        arrowUp.classList.add("fas", "fa-caret-up", "arrow-up");
        arrowDown.classList.add("fas", "fa-caret-down", "arrow-down");

        // itemText.textContent = e.text;
        itemText.textContent = showNumbers.checked ? `${i+1}. ${e.text}` : e.text;

        arrowsContainer.append(arrowUp, arrowDown)
        iconContainer.append(checkedIcon, btnRemove, arrowsContainer);
        item.append(itemText, iconContainer);
        wrapper.append(item);

        btnRemove.addEventListener("click", () => {
            originalList.splice(i, 1);
            generateList(sortList());
            saveList();
        });
    
        checkedIcon.addEventListener("click", () => {
            e.checked = !e.checked;
            handleCheck(item, e.checked);
            generateList(sortList());
            saveList();
        });

        if (e.checked) handleCheck(item, e.checked);
        if (i < arr.length - 1) item.style.borderBottom = "1px solid gray"; 
 
    });
    input.focus();
    arr.length === 0 ? emptyNotifyText.style.display = "block" : emptyNotifyText.style.display = "none"
};

function handleCheck(item, isChecked) {
    const icon = item.querySelector(".fa-check-circle");
    const itemText = item.querySelector(".item-text");

    if (isChecked) {
        icon.classList.remove("notChecked", "far");
        icon.classList.add("checked", "fas");
        itemText.style.textDecoration = "line-through";
        itemText.style.opacity = "25%"
    }
    else {
        icon.classList.remove("checked", "fas");
        icon.classList.add("notChecked", "far");
        itemText.style.textDecoration = "none";
        itemText.style.opacity = "100%";
    };
};

function sortList() {
    let modifiedList = [...originalList];
    if (hideCompleted.checked) modifiedList = modifiedList.filter(e => !e.checked);
    return modifiedList
};

function saveList() {
    localStorage.setItem("originalList", JSON.stringify(originalList));
};