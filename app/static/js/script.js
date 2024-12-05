const toggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("absolute-container");
const todoMain = document.getElementById("todo-main-section");
const inputBox = document.getElementById("write-todo");
const submitButton =  document.getElementById("create-todo");

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

  todoMain.scrollTop = 0;

  
}

function submitNew () {
    if (/^[ ]*$/.test(inputBox.value)) {
        return
    }
    const newText = inputBox.value.trim();
    createTodoOnCurrentPage(newText);
    inputBox.value = "";
    inputBox.focus();
}

inputBox.addEventListener("keypress", function(event) {
    // Execute a function when the user presses a key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        
        submitButton.click();
    }
} )

submitButton.onclick = () => {
  submitNew()
  
}


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

