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
function showItem() {
	console.log(`You have ${getQty()} items in the cart`);

	cart.forEach(function (item, index) {
		console.log(`--${item.name} $${item.price} x ${item.qty}`);
	});
	console.log(`Total in cart: $${getTotal()}`);
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

addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Apple', 0.99);
addItem('Frisbee', 9.92);
addItem('Orange', 1.29);

showItem();
