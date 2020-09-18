const itemsContainer = document.getElementById('items');
import data from './data.js';

data.forEach(function (info, index) {
	// create a new div element and give it a class name
	let newDiv = document.createElement('div');
	newDiv.className = 'item';

	// create an image element
	let img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = info.image;
	img.width = 300;
	img.height = 300;
	newDiv.appendChild(img);

	let desc = document.createElement('p');
	desc.innerText = info.desc;
	newDiv.appendChild(desc);

	let price = document.createElement('p');
	price.innerText = info.price;
	newDiv.appendChild(price);

	let button = document.createElement('button');
	button.id = info.name;
	// creates a custom attribute called data-price.
	// That will hold the price for each element in the button
	button.dataset.price = info.price;
	button.innerHTML = 'Add to Cart';
	newDiv.appendChild(button);
	itemsContainer.appendChild(newDiv);
});

const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const all_items_button = Array.from(document.querySelectorAll('button'));
console.log(all_items_button);
const cart = [];

// -------------------------------------------
// Add Items
function addItem(name, price) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			cart[i].qty += 1;
			return;
		}
	}
	const item = { name, price, qty: 1 };
	cart.push(item);
}
// -------------------------------------------
// Shoe Items
function showItems() {
	let qtyStr = `<p>You have ${getQty()} items in the cart</p>`;
	let totalStr = `<p>Total in cart: $${getTotal()}</p>`;
	let itemStr = '';
	cart.forEach(function (item, index) {
		const { name, price, qty } = item;
		itemStr += `<li>${name} $${price} x ${qty} = ${(price * qty).toFixed(2)} 
		<button class="remove" data-name="${name}"> Remove </button> 
		<button class="add-one" data-name="${name}"> + </button>
		<button class="minus-one" data-name="${name}"> - </button>
		<input class="update" type=number data-name="${name}"></input>
		</li>`;
	});
	itemList.innerHTML = itemStr;
	cartQty.innerHTML = qtyStr;
	cartTotal.innerHTML = totalStr;
}
// -------------------------------------------
// Get Total Quantity
function getQty() {
	let qty = 0;
	cart.forEach(function (item, index) {
		qty += item.qty;
	});
	return qty;
}
// -------------------------------------------
// Get Total Price
function getTotal() {
	let total = 0;
	cart.forEach(function (item, index) {
		total += item.price * item.price;
	});
	return total.toFixed(2);
}
// -------------------------------------------
// Remove Item
function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty;
			}

			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1);
			}
			return;
		}
	}
}
// -------------------------------------------
// Update Item
function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			if (qty < 1) {
				removeItem(name);
				return;
			}
			cart[i].qty = qty;
			showItems();
			return;
		}
	}
}
// -------------------------------------------
// Handle Add to cart buttons
all_items_button.forEach((elt) =>
	elt.addEventListener('click', () => {
		addItem(elt.getAttribute('id'), elt.getAttribute('data-price'));
		showItems();
	})
);
// -------------------------------------------
// Handle Change Event on Update Input
itemList.onchange = function (e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const qty = parseInt(e.target.value);
		updateCart(name, qty);
		showItems();
	}
};

// -------------------------------------------
// Handle clicks on list
itemList.onclick = function (e) {
	console.log(e.target.dataset.name);
	if (e.target && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name;
		removeItem(name);
		showItems();
	} else if (e.target && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name;
		addItem(name);
		showItems();
	} else if (e.target && e.target.classList.contains('minus-one')) {
		const name = e.target.dataset.name;
		removeItem(name, 1);
		showItems();
	}
};
