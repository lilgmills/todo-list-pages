const toggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("absolute-container");
const todoMain = document.getElementById("todo-main-section");
const inputBox = document.getElementById("write-todo");
const submitButton =  document.getElementById("create-todo");

const currPagePointer = 0;
const currPageArr = [];
const memObj = {
    0: {
        title: "Page1",
        items:currPageArr
    }
};

//to read/update todo items on a page:
// memObj[<currPagePointer>].items



function putTodoInCache(todoText) {
    //insert todo at beginning of page
    currPageArr.unshift(todoText);
    //this is really bad because we are re-writing the entire page content into an array each time we add a todo
    //much better would be to update only a linked list with a new starting node, as the value of the "items" key
    //the key would simply point to the first item in the list, which points to the next item, and so on
    //the last item would not point to anything
    memObj[currPagePointer].items = currPageArr;

}

function readAndLoadPageFromCache(targetPointer) {
    const newCurrentPage = memObj[targetPointer]
    const pageTitle = newCurrentPage.title;
    const pageItems = newCurrentPage.items;

    todoMain.replaceChildren();

    pageItems.forEach(item, ()=>{createTodoOnCurrentPage(item)})

    const UITitle = document.getElementById("UI-title");
    UITitle.innerText = pageTitle;

}

function createEventListenerForChecks(checkbox, para) {
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      para.classList.add('checked-item')
      
    } else {
      para.classList.remove('checked-item')
    }
  })
  
}

function createTodoOnCurrentPage(newText) {
  const newDiv = document.createElement('div');
  const newCheckbox = document.createElement('input');
  const txtContainer = document.createElement('div');
  
  newCheckbox.setAttribute('type','checkbox');
  newCheckbox.setAttribute('class','todo-checkmark');
  const newP = document.createElement('p');
  newP.textContent = newText;
  txtContainer.appendChild(newP);
  txtContainer.classList.add('txt-container');
  
  newDiv.setAttribute('class', 'checklist-item')
  newDiv.appendChild(newCheckbox);
  newDiv.appendChild(txtContainer)
  
  todoMain.prepend(newDiv);
  createEventListenerForChecks(newCheckbox, newP)

}

function submitNewTodo () {
    if (/^[ ]*$/.test(inputBox.value)) {
        return
    }
    const newText = inputBox.value.trim();
    createTodoOnCurrentPage(newText);
    putTodoInCache(newText);
    inputBox.value = "";
    inputBox.focus();
    todoMain.scroll({top:0,behavior:'smooth'});
}

submitButton.onclick = () => {
  submitNewTodo()
  
}

inputBox.addEventListener("keypress", function(event) {
    // Execute a function when the user presses a key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        
        submitButton.click();
    }
} )


function changeToggleImage() {
    const toggleCaret = document.getElementById("sidebar-toggle").querySelector('img');
    const currentSrc = toggleCaret.src;
    if (currentSrc.includes("1.3")) {
        toggleCaret.src = "/static/images/caret icon 2.1 (flipped).png";
    } else if (currentSrc.includes("2.1")) {
        toggleCaret.src = "/static/images/caret icon 1.3.png";
    }
}

toggle.onclick = () => {
  if (sidebar.classList.contains("show-side-container")) {
    sidebar.classList.remove("show-side-container");
    sidebar.classList.add("hide-side-container");
  }
  else {
    sidebar.classList.remove("hide-side-container");
    sidebar.classList.add("show-side-container");
  }

  changeToggleImage();
  
}

