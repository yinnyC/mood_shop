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
