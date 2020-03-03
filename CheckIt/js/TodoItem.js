let selectedForDeleteCounter = 0;
	
class TodoItem extends HTMLElement{
	//When the element gets created, we need the code in the constructor to execute
	constructor(){
		super();																//required by spec

		//item represents the custom element <todo-item>
		let item = this;
		let shadowdom = this.attachShadow({mode:"open"});						//attach the shadow DOM
		
		//shadom element styling
		shadowdom.innerHTML="<style>"+
		":host{"+
			"font: 16px Arial, sans-serif;"+
			"}"+
		"#todoCheckbox{"+
			"box-sizing: border-box;"+
			"width:10%;"+
			"float:left;"+
			"margin-bottom: 15px;"+
			"background-color:#2d364c;"+
			"color:#ff7800;"+
			"}"+
		"#todoInfo{"+
			"box-sizing: border-box;"+
			"width:70%;"+
			"float:left;"+
			"margin-bottom: 15px;"+
			"margin-top: 0px;"+
			"}"+	
		"#cancelButton{"+
			"box-sizing: border-box;"+
			"width:15%;"+
			"float:left;"+
			"margin-bottom: 15px;"+
			"}"+
		"</style>";
		
		//Creating the checkBox
		let checkBox = document.createElement("input");
		checkBox.setAttribute("id", "todoCheckbox");
		checkBox.setAttribute("type", "checkbox");
		
		//Creating the to-do info
		let todoInfo = document.createElement("p")
		todoInfo.setAttribute("id", "todoInfo");

		//create cancelButton
		let cancelButton = document.createElement("input");
		cancelButton.setAttribute("id", "cancelButton");
		cancelButton.setAttribute("type", "button"); 
		cancelButton.setAttribute("value", "delete");


		//adding elements to the shadow DOM
		shadowdom.appendChild(checkBox);
		shadowdom.appendChild(todoInfo);
		shadowdom.appendChild(cancelButton);
	}


	//method called when the components get added to the doc
	connectedCallback(){
		console.log("call back");
		let item = this;															//grab custom element <todo-item>
		let shadowroot = this.shadowRoot;											//grab the elements in the newly created todo-item
		let listItemInfoTextbox = document.getElementById("addItemBox");			//grab addItemBox
		let checkBox = shadowroot.getElementById("todoCheckbox");					//grab the checkbox
		let todoInfo = shadowroot.getElementById("todoInfo");						//grab the text
		let cancelButton = shadowroot.getElementById("cancelButton"); 				//grab the cancelButton


		//add info to the element and set decoration
		if(item._completed == "false"){
			console.log("in to-do list")
			todoInfo.removeAttribute("style");
			todoInfo.innerHTML = item._value;
		}
		else{
			console.log("in completed list")
			let textStyle = "text-decoration : line-through; color: grey;"
			todoInfo.setAttribute("style", textStyle);
			todoInfo.innerHTML = item._value;
		}
		

		//Checkbox Event Listener
		checkBox.addEventListener("click", function(){
			if(this.checked){
				//change attributes
				item.setAttribute("checked", true);
				this.setAttribute("checked", '');

				//activate delete button
				let deleteButton = document.getElementById("deleteButton");
				deleteButton.removeAttribute("disabled");

				//increase number of items selected
				selectedForDeleteCounter += 1;
			}
			else{
				//change attributes
				item.removeAttribute("checked");
				this.removeAttribute("checked");

				//decrease number of items selected
				selectedForDeleteCounter -= 1;

				//deactivate delete button if there are no items selected
				if(selectedForDeleteCounter == 0){
					let deleteButton = document.getElementById("deleteButton");
					deleteButton.setAttribute("disabled", '');
				}
			}
		})


		//Info Event Listener
		todoInfo.addEventListener("click", function(){
			if(item._completed == "false"){
				console.log("changed to completed");
				//then move this item from current list to other list
					
				//creating element to add to completed list
				let template = document.createElement("template");
				template.setAttribute("id", "toDoListTemplate");

				template.innerHTML = "<li id='completed"+item._index+"'><todo-item id='"+item._id+"' value = '"+item._value+"' index = '"+item._index+"' checked = '"+item._checked+"' completed = 'true'></todo-item></li>";
				console.log(template);
				let clon = template.content.cloneNode(true);

				//adding to completed list
				document.getElementById("completedList").appendChild(clon);		

				//remove item from current list
				let todoList = document.getElementById("toDoList");
				todoList.removeChild(document.getElementById("todo"+item._index));


			}
			else{
				console.log("changed to incompleted");
				//then move this item from current list to other list
					
				//creating element to add to completed list
				let template = document.createElement("template");
				template.setAttribute("id", "toDoListTemplate");

				template.innerHTML = "<li id='todo"+item._index+"'><todo-item id='"+item._id+"' value = '"+item._value+"' index = '"+item._index+"' checked = '"+item._checked+"' completed = 'false'></todo-item></li>";
				console.log(template);
				let clon = template.content.cloneNode(true);

				//adding to todo list
				document.getElementById("toDoList").appendChild(clon);		

				//remove item from current list
				let todoList = document.getElementById("completedList");
				todoList.removeChild(document.getElementById("completed"+item._index));
			}
		})
		

		//Cancel Button Event Listener
		cancelButton.addEventListener("click", function(){
			if(item._completed == "false"){
				//the item we want to delete is in the todo list
				console.log("deleting item: "+item._id);
				let todoList = document.getElementById("toDoList");
				todoList.removeChild(document.getElementById("todo"+item._index));
			}else{
				//this item we want to delete is in the cancel list
				console.log("delete item: "+item._id);
				let completedList = document.getElementById("completedList");
				completedList.removeChild(document.getElementById("completed"+item._index));
			}
		})

		//reset the addItem input box to nothing once todo item has been captured		
		listItemInfoTextbox.value = "";	
	}

	//returns all the attributes we want to observe
	static get observedAttributes(){ 
		return ["id", "value", "index", "checked", "completed"]; 
	}

	//Method runs everytime an oberservedAttribute changes
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			console.log("no change");
			return;
		}else if(name == "id" && oldValue !== newValue){
			this._id = newValue;
			console.log(name + " has changed from "+oldValue+" to "+newValue);
		}else if(name == "value" && oldValue !== newValue){
			this._value = newValue;
			console.log(name + " has changed from "+oldValue+" to "+newValue);
		}else if(name == "index" && oldValue !== newValue){
			this._index = newValue;
			console.log(name + " has changed from "+oldValue+" to "+newValue);
		}else if(name == "checked" && oldValue !== newValue){
			this._checked = newValue;
			console.log(name + " has changed from "+oldValue+" to "+newValue);
		}
		else if(name == "completed" && oldValue !== newValue){
			this._completed = newValue;
			console.log(name + " has changed from "+oldValue+" to "+newValue);
		}
	}

	//GETTERS + SETTERS
	get id(){
		return this._id;
	}

	get value(){
		return this._value;
	}

	set value(value){
		this._value = value;
		this.setAttribute("value", value);
	}

	get index(){
		return this._index;
	}

	set index(value){
		this._index = value;
		this.setAttribute("index", value);
	}

	get checked(){
		return this._checked;
	}

	set checked(value){
		if(value == true){
			this._checked = true;
			this.setAttribute("checked", true);
			console.log("checked changed: "+ value);
		}else if(value == "null"){
			console.log(value);
		}
	}

	get completed(){
		return this._completed;
	}

	set completed(value){
		if(value == true){
			this._completed = true;
			this.setAttribute("completed", true);
		}
		else{
			this._completed = false;
			this.setAttribute("completed", false);

		}
	}

}
//lets the browser know that we're creating a custom element
customElements.define('todo-item', TodoItem);