const input = document.getElementById("create-todo");
const todosBox = document.querySelector(".todos");

const themeBtn = document.querySelector(".mode-toggle");
const submitBtn = document.querySelector(".submit-btn");

const itemsLeft = document.getElementById("items-left");
const sortBtns = document.querySelectorAll(".sort-btn"); 
const clearCompleted = document.getElementById("clear-completed");


submitBtn.addEventListener("click", createTodo);

function createTodo() {
    if (input.value !== "") {
    const newTodo = document.createElement("DIV");
    newTodo.classList.add("all");
    newTodo.classList.add("todo");
    newTodo.classList.add("active");
   

    const newFlexDiv = document.createElement("DIV");
    newFlexDiv.classList.add("flex");
 
    const newCheckBox = document.createElement("input");
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.classList.add("todo-check");

    const newPara = document.createElement("p");
    newPara.classList.add("todo-text");
    newPara.textContent = input.value;

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
           setTimeout(() => {checkCount()}, 500);
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
    })
        input.value = "";
        checkCount()
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

themeBtn.addEventListener("click", function() {
    if (themeBtn.checked){
        body.style.background = "var(--bg-Light) url(images/bg-desktop-light.jpg) top no-repeat";

        r.style.setProperty("--todos-bg-dark", "#fff");
        r.style.setProperty("--Light-Grayish-Blue-Dark", "hsl(240deg 12% 10% / 58%)");
        r.style.setProperty("--Very-Dark-Grayish-Blue2D", "lightgray");

        submitBtn.style.background = "#d9d9d9 url(images/icons8-enter-24.png) center no-repeat";
    
    } else {
        body.style.background = "var(--bg-Dark) url(images/bg-desktop-dark.jpg) top no-repeat";
        
        r.style.setProperty("--todos-bg-dark", "hsl(235, 24%, 19%)");
        r.style.setProperty("--Light-Grayish-Blue-Dark", "hsl(234, 39%, 85%)");
        r.style.setProperty("--Very-Dark-Grayish-Blue2D", "hsl(237, 14%, 26%)");

        submitBtn.style.background = "lightslategray url(images/icons8-enter-24.png) center no-repeat";
    
    }
})
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
        .map(x=>setTimeout(() => {x.remove()}, 500))
        

})


function checkCount() {
    let count = Array.from(todosBox.children).filter(x=>x.classList.contains("active")).length

    itemsLeft.textContent = count
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
}))
