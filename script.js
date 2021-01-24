const clear=document.querySelector(".clear");    // element that clears the todos from the local storage on click

const dateElement=document.getElementById("date");  // element which shows today's date
let today = new Date();
let options = { weekday: 'long', month:'short', day:'numeric'};
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

const list=document.getElementById("list");	    // unordered list having list of todos

const input=document.getElementById("input_item");    // input textbox element where we enter our todo

const add_todo_icon = document.querySelector(".add_my_todo");

// classes required when event occurs (check,uncheck,delete)
const CHECK="fa-check-circle";					// display check circle icon when a todo is done
const UNCHECK="fa-circle";						// display uncheck circle icon when todo is not done 
const LINE_THROUGH="lineThrough";				// strike the todo text with line when done 

let LIST,index;		// LIST stores all the todos which are entered by the user currently

let data = localStorage.getItem("TODO");		// data variable stores the todos which are stored in the local storage
	if(data)
	{
		LIST=JSON.parse(data);		// stores todos from local storage to LIST if any
		loadToDo(LIST);				// to show the todos on the screen from LIST
		index=LIST.length;
		// console.log(LIST);     // for debugging purpose
	}
	else
	{
	LIST=[];
	index=0;
	}


// function to interchange checked circle and unchecked circle when it is clicked
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

// here element is the trash icon
function removeToDo(element){
	element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);			// removes the li element - deletes it from the list
	LIST[element.id].trash=true;
}

// loads the todos from array in the ul element to show it on screen
function loadToDo(array){
	array.forEach(function(item){
		addToDo(item.name,item.id,item.done,item.trash);     // adds a item to the unordered list
	});
}

// adds an item with proper icons and classes to the html and this is printed on screen
function addToDo(toDo_item,id,done,trash){

if(trash){
	return;
}

const DONE = done ? CHECK : UNCHECK;   // to determine which circle icon to choose
const LINE = done ? LINE_THROUGH : "";  // when done strike through the text

const text=`<li class="item">
			<i class="far ${DONE}" job="complete" id="${id}"> </i>
			<p class="text ${LINE}"> ${toDo_item} </p>
			<div class="delete_my_todo tooltip_delete">
				<i class="far fa-trash-alt" job="delete" id="${id}"> </i>
				<span class="tooltip_text_delete">Delete</span>
			</div>
			</li>`; 
const position = "afterBegin";   // position where to add a new text when user click enter in the input box after typing a todo item

// adds a li element inside a ul element
list.insertAdjacentHTML(position,text);
}


input.addEventListener("keyup",(event) => {

	if(event.keyCode == 13 || event.code == 13)    // keycode of enter key is 13
	{
	const toDo = input.value;
	// console.log("Entered");
		if(toDo)
		{
			addToDo(toDo,index,false,false);
			LIST.push(
				{
					name: toDo,
					id: index,
					done: false,
					trash:false
				}
			);
			localStorage.setItem("TODO",JSON.stringify(LIST));
		}
		input.value="";
		index++;
	//console.log(LIST);
	}
});

// to remove or to complete a todo event on click is added
list.addEventListener("click",(event) => {
let element = event.target;  // when delete button is clicked, element value is <i class="far fa-trash-alt" job="delete" id="${id}"> </i>
const elementJob = element.attributes.job.value;   // returns delete or complete

	if(elementJob == "complete")
	{
	completeToDo(element);
	}
	else if(elementJob == "delete")
	{
	removeToDo(element);
	}

// store and update local storage
localStorage.setItem("TODO",JSON.stringify(LIST));
});

// to clear the toDos on local storage when clear button is clicked
clear.addEventListener("click",()=>{
	var ask_once = confirm("Are you sure you want to delete all the todos you entered ?");
	if(ask_once==true)
	{
	localStorage.clear();
	location.reload();      // reload the page
	}
});


add_todo_icon.addEventListener("click",() => {
// console.log("blue icon clicked");
const toDo = input.value;
		if(toDo)
		{
			addToDo(toDo,index,false,false);
			LIST.push(
				{
					name: toDo,
					id: index,
					done: false,
					trash:false
				}
			);
			localStorage.setItem("TODO",JSON.stringify(LIST));
		}
		input.value="";
		index++;
});