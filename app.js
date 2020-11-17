const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form')


// creat elems render cafe
function renderCafe(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	let x = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	x.textContent = 'x';

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(x);

	cafeList.appendChild(li);

	// deleting data
	x.addEventListener('click', (event) => {
		event.stopPropagation(); // doesnt 'buuble' up?
		let id = event.target.parentElement.getAttribute('data-id');
		db.collection('cafes').doc(id).delete();
	})
}

// getting data
db.collection('cafes').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});

// saving data
form.addEventListener('submit', (event) => {
	event.preventDefault();
	db.collection('cafes').add({
		name: form.name.value,
		city: form.city.value
	});
	form.name.value = '';
	form.city.value = '';
});
