const input = document.getElementById("create-todo");
const todosBox = document.querySelector(".todos");
const todos = document.querySelectorAll(".todo");
const themeBtn = document.querySelector(".mode-toggle");

const itemsLeft = document.getElementById("items-left");

const sortAll = document.getElementById("all");
const sortActive = document.getElementById("active");
const sortCompleted = document.getElementById("completed");
const sortBtns = document.querySelectorAll(".sort-btn"); 

const clearCompleted = document.getElementById("clear-completed");
const removeBtn = document.querySelectorAll(".remove-todo-btn");



//DISPLAY X (for deleting todos) ON MOUSEOVER
todos.forEach(todo => todo.addEventListener("mouseover", function() {
    todo.lastElementChild.classList.add("toggle-block");
}))

//HIDE X (for deleting todos) ON MOUSEOUT
todos.forEach(todo => todo.addEventListener("mouseout", function() {
    todo.lastElementChild.classList.remove("toggle-block");
}))

//ENTER TO INSERT NEW TODO
input.addEventListener("keypress", function createTodo(event, newDiv) {
    if (event.key === "Enter") {
        if (input.value !== "") {
            //CREATE NEW DIV WITH ALL CHILDS + ASSIGN TEXT CONTEXT 
            newDiv = todos[1].cloneNode(true),
            newDiv.firstChild.nextSibling.childNodes[3].textContent = input.value,

            //ADD EVENT LISTENERS TO NEW TODO
            //adding whole function instead of just assigning existing function because i could not figure it out 
            newDiv.addEventListener("click", function(e) {
                if (e.target.nodeName == "BUTTON") {
                    return
                }
                if (!newDiv.classList.contains("completed")) {
                    newDiv.classList.add("completed");
                    newDiv.classList.remove("active");
                    newDiv.firstChild.nextSibling.childNodes[3].classList.add("completed");
                    newDiv.firstChild.nextSibling.childNodes[1].checked = true; 
                } else {
                    newDiv.classList.remove("completed");
                    newDiv.classList.add("active");
                    newDiv.firstChild.nextSibling.childNodes[3].classList.remove("completed");
                    newDiv.firstChild.nextSibling.childNodes[1].checked = false; 
                }
                todoCount()}),
                newDiv.addEventListener("mouseover", function() {
                    newDiv.lastElementChild.classList.add("toggle-block");
                }),
                newDiv.addEventListener("mouseout", function() {
                    newDiv.lastElementChild.classList.remove("toggle-block");
                }),
            todosBox.appendChild(newDiv),
                input.value = "";
                    todoCount()
            //at first I wanted to do it this way but it stopped javascript after adding new todo
    //     todosBox.innerHTML += `<div class="all todo active">
    //     <div class="flex">
    //       <input type="checkbox" class="todo-check">
    //       <p class="todo-text">${input.value}</p>
    //     </div>
    //     <button class="remove-todo-btn"></button>
    //   </div>`;
        
        }
    }
})


//REMOVE TODO BUTTON
removeBtn.forEach(btn => btn.addEventListener("click", function(e) {
   if (e.currentTarget.parentElement.classList.contains("active")) {
    
    console.log(btn.parentElement)
   }
    setTimeout(() => {btn.parentElement.remove()}, 500);

    btn.parentElement.animate([
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
      todoCount()
      
}))

//CHANGE STATE OF TODO (ACTIVE/COMPLETED)
todos.forEach(todo => todo.addEventListener("click", function(e) {
    if (e.target.nodeName == "BUTTON") {
        return
    }
    if (!todo.classList.contains("completed")) {
        todo.classList.add("completed");
        todo.classList.remove("active");
        todo.firstChild.nextSibling.childNodes[3].classList.add("completed");
        todo.firstChild.nextSibling.childNodes[1].checked = true; 
    } else {
        todo.classList.remove("completed");
        todo.classList.add("active");
        todo.firstChild.nextSibling.childNodes[3].classList.remove("completed");
        todo.firstChild.nextSibling.childNodes[1].checked = false; 
    }
    todoCount()
}))




//SHOW COUNT OF ACTIVE TODOS
function todoCount() {
    let count = 0;
    for (let i = 0; i<todos.length;i++) {
        if (todos[i].classList.contains("active") && !todos[i].classList.contains("display-none")) {
            count++
        }
    }

    itemsLeft.textContent = count
}
//improve counting / problem with deleting active todo

//sort completed/active todos? cant use sort on nodelist
// function sortFunc() {
    
//     todosBox.sort((a,b) => a.classList.contains("active") > b.classList.contains("active") ? 1 : -1 
//     )}


    // function clickHandler(e) {
        
    //       console.log(e.target.innerHTML);
    // }
      
    //   // reference to a list
    //   const todosBox = document.querySelector('.todos');
      
    //   // add a single listener on list item
    //   todosBox.addEventListener('click', clickHandler);

// let newDiv;
//     document.querySelector("body").addEventListener("click", function() {
//         newDiv = todos[1].cloneNode(true),
//         newDiv.firstChild.nextSibling.childNodes[3].textContent = input.value,
//         todosBox.appendChild(newDiv)
        
//     })

//SORT TODOS FUNCTION
sortBtns.forEach(sortingBtn => sortingBtn.addEventListener("click", function() {
    for (sortingBtn of todos) {
        sortBtns.forEach(btn => btn.style.color = "var(--Very-Dark-Grayish-Blue1D)"),
        this.style.color = "#3a48c7";
    }

    for (sortingBtn of todos) {
        if (!sortingBtn.classList.contains(this.id)) {
            sortingBtn.classList.add("display-none")
        } else {
            sortingBtn.classList.remove("display-none")
        }
        todoCount()
    }
}))