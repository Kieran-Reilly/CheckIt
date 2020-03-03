var todoListItemCounter = 0;

//function to add a to do list item into the body container
function addElement(){
	let listItemInfoTextbox = document.getElementById("addItemBox");		//grab the addItemBox and check value
	
	if(listItemInfoTextbox.value == ""){									//if the user hasn't set anything, alert the user to add some info
		alert("Please enter a to-do item.");
	}
	else{																	//Otherwise add a to-do item
		//increment the number of items we have in the to do list
		todoListItemCounter += 1;
		let toDoListItemID = "ListItem" + todoListItemCounter;			//create custom ID tag
		let toDoListItemValue = listItemInfoTextbox.value;				//storing the value from the addItemBox
		let toDoListItemIndex = todoListItemCounter;

		let template = document.createElement("template");
		template.setAttribute("id", "toDoListTemplate");

		//adding the custom element
		template.innerHTML = "<li id='todo"+toDoListItemIndex+"''><todo-item id='"+toDoListItemID+"' value = '"+toDoListItemValue+"' index = '"+toDoListItemIndex+"' checked = 'null' completed = 'false'></todo-item></li>";

		let clon = template.content.cloneNode(true);
		document.getElementById("toDoList").appendChild(clon);
	}

}


//function to delete a select of items from the lists
function deleteElement(){
	console.log("delete function called")

	let deletedCount = 0;

	//TODO LIST
	let todoList = document.getElementById("toDoList");					//grab the incompleted todo list
	let todoListLength = todoList.childNodes.length-1;

	//cycle through elements and find selected and delete
	for(var i = todoListLength; i > 0; i--){
		console.log(todoList.childNodes[i]);
		let todoListElem = todoList.childNodes[i];						//grab <li> element
		let todoListItem = todoListElem.childNodes[0];					//grab the contents of the <li> element = <todo-item>

		//DELETE
		if(todoListItem.checked == "true"){								//check to see if the <todo-item> is selected for deletion
			console.log("remove selected: "+todoListItem.id);
			todoList.removeChild(todoListElem);
			deletedCount += 1;
		}
	}

	//COMPLETED LIST
	let completedList = document.getElementById("completedList");		//grab completed list
	let completedListLength = completedList.childNodes.length-1;

	//cycle through elements and find selected and delete them
	for(var i = completedListLength; i > 0; i--){
		console.log(completedList.childNodes[i]);
		let completedListElem = completedList.childNodes[i];			//grab <li> element
		let completedListItem = completedListElem.childNodes[0];		//grab contents of the <li> element = <todo-item>

		//DELETE
		if(completedListItem.checked == "true"){						//check to see if the <todo-item> is selected for deletion
			console.log("remove selected: "+completedListItem.id);
			completedList.removeChild(completedListElem);
			deletedCount += 1;
		}
	}
		
		selectedForDeleteCounter = selectedForDeleteCounter - deletedCount;		//make sure we consistantly keep track of delete count
		document.getElementById("deleteButton").setAttribute("disabled", '');	//disable button after delete
}


//ability to search as you type
function searchLists(){
	let inputElem = document.getElementById("searchable");					//grab the search bar
	let input = inputElem.value.toUpperCase();


	//To-Do list search
	let todoList = document.getElementById("toDoList");					//grab the todo list
	let todoListLength = todoList.childNodes.length;

	for (var i = 1; i < todoListLength; i++) {
		//console.log(todoList.childNodes[i]);
		let todoListElem = todoList.childNodes[i];						//grab <li> element
		let todoListItemValue = todoListElem.childNodes[0].value;		//grab the value of the <todo-item> within the <li> element

		if(todoListItemValue.toUpperCase().indexOf(input) > -1){		//check if value = input
			todoList.childNodes[i].style.display = "";
		}else{
			todoList.childNodes[i].style.display = "none";				//otherwise hide the <li>
		}
	}


	//Completed list search
	let completedList = document.getElementById("completedList");
	let completedListLength = completedList.childNodes.length;

	for (var i = 1; i < completedListLength; i++) {
		//console.log(completedList.childNodes[i]);
		let completedListElem = completedList.childNodes[i];					//grab <li> element
		let completedListItemValue = completedListElem.childNodes[0].value;		//grab value of the <todo-item> within the <li>

		if(completedListItemValue.toUpperCase().indexOf(input) > -1){			//check if value = input
			completedList.childNodes[i].style.display = "";
		}else{
			completedList.childNodes[i].style.display = "none";					//otherwise hide the <li>
		}
	}
}
