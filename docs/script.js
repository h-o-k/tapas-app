const addItems = document.querySelector(".add-items"); // form
const itemsList = document.querySelector(".plates"); // ul
const items = JSON.parse(localStorage.getItem("items")) || [];

// Render list upon refresh or on window load
renderList(items, itemsList);

// Adding items to our list
function addItem(event) {
	event.preventDefault();
	const text = this.querySelector("[name=item]").value;

	const item = {
		text,
		done: false,
	};

	// 1. Append it to the ul element
	//  - Push textValue to the items Array
	items.push(item);
	//  - Render the items Array into the ul element
	renderList(items, itemsList);
	// 2. Add it to the localStorage
	localStorage.setItem("items", JSON.stringify(items));
	this.reset();
}

function renderList(plates, ulElement) {
	const renderedItems = plates
		.map(
			(el, index) => `<li id="li-item${index}">
                <input type="checkbox" id="item${index}" data-index=${index} ${
				el.done ? "checked" : ""
			}/>
                <label for="item${index}">
                    <span>${el.text}</span>
                </label>
                <button class="delete" data-index=${index}>x</button>
            </li>`
		)
		.join(""); // <li>...</li><li>...</li>

	ulElement.innerHTML = renderedItems;
}

// Toggle the done property of an item
function toggleDone(event) {
	if (!event.target.matches("input")) return;
	const element = event.target;
	const index = element.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem("items", JSON.stringify(items));
}

itemsList.addEventListener("click", toggleDone);

// Deleting an item from the list
function deleteItem(event) {
	if (!event.target.matches("button")) return;
	const element = event.target;
	const index = element.dataset.index;
	items.splice(index, 1);
	localStorage.setItem("items", JSON.stringify(items));
	// Update screen contents
	renderList(items, itemsList);
}

itemsList.addEventListener("click", deleteItem);

addItems.addEventListener("submit", addItem);
