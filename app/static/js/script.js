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
}

submitButton.onclick = () => {
  if (/^[ ]*$/.test(inputBox.value)) {
    return
  }
  //create a new todo list item with the text that's been input
  const newText = inputBox.value.trim();
  createTodoOnCurrentPage(newText);
  inputBox.value = "";
  
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
  
}