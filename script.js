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
		localStorage.removeItem("TODO");
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

// <-------------- Event list functions and code starts here ---------------------->

let event_input_box=document.getElementById("event_input_box");

let done_button = document.getElementById("done_button");

let edit_done_button = document.getElementById("edit_done_button");

let event_list = document.getElementById("event_list");

let clear_all_events = document.querySelector(".clear_events");

let add_event_button = document.getElementById("add_event_button");
let EVENT_ARRAY, event_index, edit_id;

let event_data = localStorage.getItem("EVENT_LIST");
if(event_data)
{
	EVENT_ARRAY = JSON.parse(event_data);
	loadEvents(EVENT_ARRAY);
	event_index = EVENT_ARRAY.length;
}
else
{
	EVENT_ARRAY = [];
	event_index = 0;
}

function loadEvents(arr){

	arr.forEach(item => {
		addMyEvent(item.id,item.name,item.link,item.time,item.trash);
	});

}

function showEventInputBox(){
		event_input_box.style.visibility="visible";
		done_button.style.visibility="visible";	
		edit_done_button.style.visibility="hidden";
		add_event_button.style.visibility="hidden";
		let event_name = document.querySelector("#event_input_box #event_name");
		let event_link = document.querySelector("#event_input_box #event_link");
		let event_time = document.querySelector("#event_input_box #event_time");
		event_name.value="";
		event_link.value="";
		// event_time.value="";
}

function scroll_to_top_li_item(){
	event_list.children[0].scrollIntoView({ behavior: 'smooth' });
}

function add_or_discard_event(){

	let event_name = document.querySelector("#event_input_box #event_name");
	let event_link = document.querySelector("#event_input_box #event_link");
	let event_time = document.querySelector("#event_input_box #event_time");

	if(event_name.value=="" || event_time.value=="")
	{
		alert("Your event can't be added as Event Name and Event Time must be filled.");
	}
	else
	{
		event_link.value = (event_link.value == "")? "#" : event_link.value;
		addMyEvent(event_index,event_name.value,event_link.value,event_time.value,false);
		
		EVENT_ARRAY.push(
			{
				id: event_index,
				name: event_name.value,
				link: event_link.value,
				time: event_time.value,
				trash: false
			}
		);
		event_index = EVENT_ARRAY.length;
		localStorage.setItem("EVENT_LIST",JSON.stringify(EVENT_ARRAY));
	}
	scroll_to_top_li_item();
	event_name.value="";
	event_link.value="";
	event_time.value="";	
	event_input_box.style.visibility="hidden";
	done_button.style.visibility="hidden";
	add_event_button.style.visibility="visible";
}

function addMyEvent(event_index,event_name,event_link,event_time,event_trash){
if(event_trash)
{
	return;
}
let date_obj= new Date(event_time);
const hours = date_obj.getHours();
const minutes = date_obj.getMinutes();
const my_date = date_obj.getDate();
const my_month = date_obj.getMonth();
const my_year = date_obj.getFullYear();
// console.log(event_name);
// console.log(event_link);
// console.log(event_time);

const text=`<li class="event_item" id="${event_index}">
			<div class="div_name_link check_flex">
				<div class="div_event_name"><a href="${event_link}" target="_blank">${event_name}</a></div>
			</div>
			<div class="div_date_time check_flex">
				<div class="div_event_time">${((hours<10)?('0'+ hours):(hours)) + ":" + ((minutes<10)?('0'+ minutes):(minutes))}</div>
				<div class="div_event_date">${((my_date<10)?('0'+ my_date):(my_date)) + "-" + ((my_month<9)?('0'+ (my_month+1)):(my_month+1)) + "-" + my_year}</div>
			</div>
			<div class="div_edit_delete check_flex">
				<div class="edit_event" id="${event_index}"><button>Edit</button></div>
				<div class="delete_event" id="${event_index}"><button>Delete</button></div>
			</div>
			</li>`; 
const position = "afterBegin";   // position where to add a new text when user click enter in the input box after typing a todo item

// adds a li element inside a ul element
event_list.insertAdjacentHTML(position,text);
}

function removeEvent(curr_element,curr_id){
	EVENT_ARRAY[curr_id].trash = true;
	localStorage.setItem("EVENT_LIST",JSON.stringify(EVENT_ARRAY));
	curr_element.parentNode.parentNode.parentNode.parentNode.removeChild(curr_element.parentNode.parentNode.parentNode);
}

function editEvent(curr_id){
	event_input_box.style.visibility="visible";
	edit_done_button.style.visibility="visible";
	add_event_button.style.visibility="hidden";	
	done_button.style.visibility="hidden";	
	let event_name = document.querySelector("#event_input_box #event_name");
	let event_link = document.querySelector("#event_input_box #event_link");
	let event_time = document.querySelector("#event_input_box #event_time");

	edit_id=curr_id;
	event_name.value=EVENT_ARRAY[curr_id].name;
	event_link.value=EVENT_ARRAY[curr_id].link;
	event_time.value=EVENT_ARRAY[curr_id].time;
}

function modifyEvent(){
	let event_name = document.querySelector("#event_input_box #event_name");
	let event_link = document.querySelector("#event_input_box #event_link");
	let event_time = document.querySelector("#event_input_box #event_time");
	let my_li_elem;
	for(let i=0;i<event_list.children.length;i++)
	{
	// console.log(event_list.children[i].attributes.id.value);
		if(event_list.children[i].attributes.id.value == edit_id)
		{
			my_li_elem = event_list.children[i];
			break;
		}
	}

	EVENT_ARRAY[edit_id].name=event_name.value;
	EVENT_ARRAY[edit_id].link=event_link.value;
	EVENT_ARRAY[edit_id].time=event_time.value;

	//console.log(my_li_elem.children[1].children[0].children[0].innerHTML);
	my_li_elem.children[0].children[0].children[0].innerHTML = event_name.value;
	my_li_elem.children[0].children[0].children[0].attributes.href.value = event_link.value;
	
	let date_obj= new Date(event_time.value);
	const hours = date_obj.getHours();
	const minutes = date_obj.getMinutes();
	const my_date = date_obj.getDate();
	const my_month = date_obj.getMonth();
	const my_year = date_obj.getFullYear();

	my_li_elem.children[1].children[0].innerHTML = ((hours<10)?('0'+ hours):(hours)) + ":" + ((minutes<10)?('0'+ minutes):(minutes));
	my_li_elem.children[1].children[1].innerHTML = ((my_date<10)?('0'+ my_date):(my_date)) + "-" + ((my_month<9)?('0'+ (my_month+1)):(my_month+1)) + "-" + my_year;

	localStorage.setItem("EVENT_LIST",JSON.stringify(EVENT_ARRAY));
	event_name.value="";
	event_link.value="";
	event_time.value="";
	event_input_box.style.visibility="hidden";
	edit_done_button.style.visibility="hidden";
	add_event_button.style.visibility="visible";
}

event_list.addEventListener('click', (event)=>{
let curr_element = event.target;
const ele_class = curr_element.parentNode.attributes.class.value;

if(ele_class=="edit_event" || ele_class=="delete_event")
{
// console.log(curr_element.parentNode.attributes.id.value);
const curr_id = curr_element.parentNode.attributes.id.value;

	if(ele_class == "delete_event")
	{
		var ask_once = confirm("Are you sure you want to delete this event?");
		if(ask_once == true)
		{
			// console.log(curr_id);
			// console.log(EVENT_ARRAY[curr_id]);
			removeEvent(curr_element,curr_id);
		}
	}
	else
	{
		editEvent(curr_id);
	}
}
});

clear_all_events.addEventListener("click",()=>{
	var ask_once = confirm("Are you sure you want to delete all the Events?");
	if(ask_once==true)
	{
		localStorage.removeItem("EVENT_LIST");
		location.reload();      // reload the page
	}
});