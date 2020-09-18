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
function showItems() {
	let qtyStr = `<p>You have ${getQty()} items in the cart</p>`;
	let totalStr = `<p>Total in cart: $${getTotal()}</p>`;
	let itemStr = '';
	cart.forEach(function (item, index) {
		const { name, price, qty } = item;
		itemStr += `<li>${name} $${price} x ${qty} = ${price * qty}</li>`;
	});
	itemList.innerHTML = itemStr;
	cartQty.innerHTML = qtyStr;
	cartTotal.innerHTML = totalStr;
}
function getQty() {
	let qty = 0;
	cart.forEach(function (item, index) {
		qty += item.qty;
	});
	return qty;
}
function getTotal() {
	let total = 0;
	cart.forEach(function (item, index) {
		total += item.price * item.price;
	});
	return total.toFixed(2);
}

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

all_items_button.forEach((elt) =>
	elt.addEventListener('click', () => {
		addItem(elt.getAttribute('id'), elt.getAttribute('data-price'));
		console.log(elt.getAttribute('data-price'));
		showItems();
	})
);
// addItem('Apple', 0.99);
// addItem('Orange', 1.29);
// addItem('Opinion', 0.02);
// addItem('Apple', 0.99);
// addItem('Frisbee', 9.92);
// addItem('Orange', 1.29);
// addItem('Apple', 0.99);
// addItem('Orange', 1.29);
// showItem();
// removeItem('Frisbee');
// removeItem('Apple', 1);
// showItem();
