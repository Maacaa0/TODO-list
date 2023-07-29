const input = document.getElementById("create-todo");
const todosBox = document.querySelector(".todos");

const themeBtn = document.querySelector(".mode-toggle");
const submitBtn = document.querySelector(".submit-btn");

const itemsLeft = document.getElementById("items-left");
const sortBtns = document.querySelectorAll(".sort-btn"); 
const clearCompleted = document.getElementById("clear-completed");
const emptyBox = document.getElementById("empty");

submitBtn.addEventListener("click", ()=> createTodo(input.value));

if(localStorage.todos) {
  const getTodosFromStorage = JSON.parse(localStorage.getItem("todos"))
  getTodosFromStorage.map(todo => createTodo(todo))
}

function saveTodo() {
  const currentArr = []
      document.querySelectorAll(".todo-text").forEach(x => currentArr.push(x.innerHTML))
      localStorage.setItem("todos", JSON.stringify(currentArr))
}

function createTodo(text) {
  if (text !== "") {
    
    const newTodo = document.createElement("DIV");
    newTodo.classList.add("all");
    newTodo.classList.add("todo");
    newTodo.classList.add("active");
    newTodo.setAttribute("id", "item");
    newTodo.setAttribute("draggable", true)
   

    const newFlexDiv = document.createElement("DIV");
    newFlexDiv.classList.add("flex");
 
    const newCheckBox = document.createElement("input");
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.classList.add("todo-check");
    newCheckBox.checked = false;

    const newPara = document.createElement("p");
    newPara.classList.add("todo-text");
    newPara.textContent = text;

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("remove-todo-btn");

    //DELETE TODO 
    newDeleteBtn.addEventListener("click", function(e) {
         setTimeout(() => {newDeleteBtn.parentElement.remove()}, 500);
     
         newDeleteBtn.parentElement.animate([
             // keyframes
             { opacity: 1},
             { opacity: 0},
             { transform: 'translateX(700px)' },
             { opacity: 0}
           ], {
             // timing options
             duration: 500,
             iterations: 1,
           });
           setTimeout(() => {saveTodo()}, 600);
           setTimeout(() => {checkCount()}, 500);
           setTimeout(() => {checkEmpty()}, 500);
     })

    //DISPLAY X (for deleting todos) ON MOUSEOVER
    newTodo.addEventListener("mouseover", function() {
        newTodo.lastElementChild.classList.add("toggle-block");
    })

    //HIDE X (for deleting todos) ON MOUSEOUT
    newTodo.addEventListener("mouseout", function() {
        newTodo.lastElementChild.classList.remove("toggle-block");
    })

    newFlexDiv.appendChild(newCheckBox);
    newFlexDiv.appendChild(newPara);
    newTodo.appendChild(newFlexDiv);
    newTodo.appendChild(newDeleteBtn);
    todosBox.appendChild(newTodo);
  
    //SWITCH ACTIVE / COMPLETED STATE
    newTodo.addEventListener("click", function(e) {
        if (e.target == newDeleteBtn) {
            return
        }
        if (!newTodo.classList.contains("completed")) {
            newTodo.classList.add("completed");
            newTodo.classList.remove("active");
            newTodo.firstChild.firstChild.nextSibling.classList.add("completed");
            newTodo.firstChild.firstChild.checked = true; 
        } else {
            newTodo.classList.remove("completed");
            newTodo.classList.add("active");
            newTodo.firstChild.firstChild.nextSibling.classList.remove("completed");
            newTodo.firstChild.firstChild.checked = false; 
        }
        checkCount();
        checkEmpty();
      })
      input.value = "";
      checkCount(),
      checkEmpty();
      saveTodo()
  }
}

// BUTTON CLICK ON ENTER PRESS
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      submitBtn.click();
    }
  });


// THEME CHANGE

const r = document.querySelector(":root");
const body = document.querySelector("body");

function setLightTheme() {
  body.classList.remove("dark");
  body.style.background = "var(--bg-Light)";
  
  submitBtn.style.color = "black";


  r.style.setProperty("--theme", "#fff")
  r.style.setProperty("--theme-text", "#393a4c")
}

function setDarkTheme() {
  body.classList.add("dark");
  body.style.background = "var(--bg-Dark)";

  submitBtn.style.color = "white";

  r.style.setProperty("--theme", "#221e1e")
  r.style.setProperty("--theme-text", "#989dcb")
}

function toggleTheme() {
  if (themeBtn.checked) {
    setLightTheme();
  } else {
    setDarkTheme();
  }
}

themeBtn.addEventListener("click", toggleTheme);

// CLEAR COMPLETED TODOS
clearCompleted.addEventListener("click", function() {

  Array.from(todosBox.children)
       .filter(x=>x.classList.contains("completed"))
       .map(x=>x.animate([
          // keyframes
          { opacity: 1},
          { opacity: 0},
          { transform: 'translateX(700px)' },
          { opacity: 0}
        ], {
          // timing options
          duration: 500,
          iterations: 1,
        }))

  Array.from(todosBox.children)
       .filter(x=>x.classList.contains("completed"))
       .map(x=>setTimeout(() => {x.remove()}, 500));
        
        setTimeout(() => {checkEmpty()}, 500);
        setTimeout(() => {saveTodo()}, 600);
        
})


function checkCount() {
    let count = Array.from(todosBox.children).filter(x=>x.classList.contains("active")).length;
    
    itemsLeft.textContent = count;
    return count
}

//SORT TODOS FUNCTION
sortBtns.forEach(sortingBtn => sortingBtn.addEventListener("click", function() {
    sortBtns.forEach(btn => btn.style.color = "var(--Very-Dark-Grayish-Blue1D)"),
        this.style.color = "#3a48c7";

    const nodeToArr = Array.from(todosBox.children);
    for (let i = 0; i < todosBox.childElementCount; i++) {
      if (!nodeToArr[i].classList.contains(this.id)) {
        nodeToArr[i].classList.add("display-none")
      } else {
        nodeToArr[i].classList.remove("display-none")
      }

    }
}));

function checkEmpty() {
  if (emptyBox.nextElementSibling !== null) {
    emptyBox.style.display = "none";
  } else {
    setTimeout(() => {emptyBox.style.display = "flex";}, 800);
  }
}

//  https://www.youtube.com/watch?v=viTWjfJ9CbY
//Drag n drop USING SORTABLE JS 
let drag = document.querySelector("#list");

new Sortable(drag, {
  animation: 150
});