const toggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("absolute-container");
const todoMain = document.getElementById("todo-main-section");
const inputBox = document.getElementById("write-todo");
const submitButton =  document.getElementById("create-todo");

let currPagePointer = 0;
let memObj = [];

function resetMemObj() {
    memObj = [];
    memObj.unshift({
        title: "New Page",
        items:[],
        status:[],
    });
}

resetMemObj();
//memObj will just be an array of objects, which nests another array in the "items" field

//to read/update todo items on a page:
// memObj[<currPagePointer>].items

let ptTo = (obj, idx) => {
    return obj.length - idx - 1
}

function putTodoInCache(todoText) {
    console.log("Putting todo in cache...")
    memObj[currPagePointer].status.unshift(false);
    
    memObj[currPagePointer].items.unshift(todoText);

}

function putNewPageInCache(title) {
    memObj.unshift({title:title, items:[], status:[]})
    currPagePointer=0;
}

function loadTodoOnCurrentPage(newText, status, index) {
    const newDiv = document.createElement('div');
    const newCheckbox = document.createElement('input');
    const txtContainer = document.createElement('div');

    newCheckbox.setAttribute('type','checkbox');
    newCheckbox.setAttribute('class','todo-checkmark');

    const newP = document.createElement('p');
    newP.textContent = newText;
    txtContainer.appendChild(newP);
    txtContainer.classList.add('txt-container');
    newP.setAttribute("id",String(index));

    newDiv.setAttribute('class', 'checklist-item')
    if(status) {
        newDiv.classList.add('checked');
    }
    else {
        newDiv.classList.add('unchecked');

    }
    
    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(txtContainer);

    todoMain.appendChild(newDiv);
    //createIndexedEventListenerForChecks(newCheckbox, newP, newDiv, index);

        
}

function readAndLoadPageFromCache(targetPointer) {
    
    

    console.log("targetPointer: ", currPagePointer);

    console.log("memObj: ", memObj);

    console.log(`memObj[${targetPointer}]: `, memObj[targetPointer])

    console.log('PageItems.length: ', memObj[targetPointer].items.length);

    const pageTitle = memObj[targetPointer].title;
    const pageItems = memObj[targetPointer].items;
    const pageStatus = memObj[targetPointer].status;

    //clear the page
    todoMain.innerHTML = "";
    currPagePointer = targetPointer;
    const RANGE = pageItems.length;

    for(i=0;i<RANGE;i++) {
        loadTodoOnCurrentPage(pageItems[i], pageStatus[i], i);
        
    }

    
    const todoElements = todoMain.children;

    Array.from(todoElements).forEach((currDiv, index) => {
        if(pageStatus[index]) {
            currDiv.classList.add('checked');
            currDiv.children[1].children[0].classList.add('checked-item');
        }
        else {
            currDiv.classList.add('unchecked');
            currDiv.children[1].children[0].classList.add('unchecked-item');
        }
    })

    reindexTodoIds();

    const UITitle = document.getElementById("UI-title");
    UITitle.innerText = pageTitle;

}

function createNewTodoPage() {
    //0 will always be at the top and they will index normally down the page
    
    const defaultTitle = "New Page"
    const newSidebarContent = document.createElement('div');
    const newP = document.createElement('p');

    newSidebarContent.classList.add("sidebar-content");

    newP.textContent = defaultTitle;
    newSidebarContent.appendChild(newP);

    const menu = document.getElementById("side-menu-container");
    //insert the new page title at the beginning of the list
    menu.prepend(newSidebarContent);

    const sideBarContent = menu.children;

    putNewPageInCache(defaultTitle);

    Array.from(sideBarContent).forEach((item, index) => {
        item.setAttribute("id", `sidebar-page-${index}`)
        
        function createInputHandlerById(index) {
            return function (event) {
                readAndLoadPageFromCache(index);
            }
        }

        item.onclick = createInputHandlerById(index);

    })
}

document.getElementById('create-new-page').onclick = () => {
    createNewTodoPage();
    readAndLoadPageFromCache(0);
}

function createEventListenerForChecks(checkbox, para, containDiv) {
  checkbox.addEventListener('click', () => {
    if (containDiv.classList.contains('unchecked')) {
      para.classList.add('checked-item');
      containDiv.classList.remove('checked');
      containDiv.classList.add('unchecked');

    } else {
      para.classList.remove('checked-item');
      memObj[currPagePointer].status.unshift(false);
      containDiv.classList.remove('unchecked');
      containDiv.classList.add('checked');
    }
    
  })

  
}



function createTodoAndDisplay(newText) {
    const newDiv = document.createElement('div');
    const newCheckbox = document.createElement('input');
    const txtContainer = document.createElement('div');
    
    newCheckbox.setAttribute('type','checkbox');
    newCheckbox.setAttribute('class','todo-checkmark');
    const newP = document.createElement('p');
    newP.textContent = newText;
    txtContainer.appendChild(newP);
    txtContainer.classList.add('txt-container');
    
    
    newDiv.setAttribute('class', 'checklist-item');
    newDiv.classList.add('unchecked');
    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(txtContainer);
    
    todoMain.prepend(newDiv);

    

}

function reindexTodoIds() {

    Array.from(todoMain.children).forEach((item, index) => {
        item.setAttribute("id", `${index}`)
        

    })
}

function submitNewTodo () {
    if (/^[ ]*$/.test(inputBox.value)) {
        return
    }
    const newText = inputBox.value.trim();
    createTodoAndDisplay(newText);
    putTodoInCache(newText);
    reindexTodoIds();
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

