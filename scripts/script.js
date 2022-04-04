/*********/
/* API */
/*********/
const URL = 'https://uselessfacts.jsph.pl//random.json?language=en';
const uselessFactsGetDivHTML = document.querySelector('.add-api-text');
const uselessFactsArr = [];
/*********/
/* card */
/*********/
const card = document.querySelector('.card');
/*********/
/* Variable -  buttons bottom */
/*********/
const buttonTubBottom = document.querySelector('section:nth-of-type(3) .button-nav-tub');
const buttonBadBottom = document.querySelector('section:nth-of-type(3) .button-nav-bad');
const buttonFavoriteBottom = document.querySelector('section:nth-of-type(3) .button-nav-cards');
/*********/
/* Variable - card buttons */
/*********/
const buttonCardBad = document.querySelector('section:nth-of-type(3) .button-card-bad');
const buttonCardFavorite = document.querySelector('section:nth-of-type(3) .button-card-favorite');
/*********/
/* Variable - facts list good and bad */
/*********/
const uselessFactsListFavorite = document.getElementById('list-favorite-facts');
const uselessFactsListbad = document.getElementById('list-bad-facts');

//////////////////////////////////////////////////////////////

/*********/
/* API function */
/*********/
getUselessFacts = () => {
	getData(URL).then(data => {
		console.log(data.text);
		const uselessFactsHTML = `<p>${data.text}</p>`;

		if (data.text === undefined) {
			return getUselessFacts();
		} else if (uselessFactsArr.includes(uselessFactsHTML)) {
			return getUselessFacts();
		} else {
			uselessFactsArr.push(uselessFactsHTML);
		}

		uselessFactsGetDivHTML.innerHTML = uselessFactsHTML;
	});
};

async function getData(URL) {
	return fetch(URL)
		.then(response => response.json())
		.then(jsonData => jsonData);
}

/*********/
/* Card */
/*********/
/*** remove class hidden form card ***/
const removeHiddenCard = () => {
	card.classList.remove('hidden');
	buttonCardFavorite.classList.remove('hidden');
	buttonCardBad.classList.remove('hidden');
	card.classList.remove('animtion-favo');
	buttonTubBottom.classList.add('opacity');
	card.classList.remove('animtion-del');
};

buttonTubBottom.addEventListener('click', () => {
	getUselessFacts();
	removeHiddenCard();
});

/*********/
/* Overlay bad - open/close */
/*********/
const buttonCloseBadOverlay = document.querySelector('section:nth-of-type(2) .button-close-bad-overlay');
const overlayBad = document.querySelector('section:nth-of-type(2)');

buttonBadBottom.addEventListener('click', () => {
	overlayBad.classList.remove('hidden-bad-overlay');
	overlayFavorite.classList.add('hidden-favorite-overlay');
});

buttonCloseBadOverlay.addEventListener('click', () => {
	overlayBad.classList.add('hidden-bad-overlay');
});

/*********/
/* Overlay Favo - open/close */
/*********/
const buttonCloseFavorite = document.querySelector('.button-close-favorite-overlay');
const overlayFavorite = document.querySelector('section:nth-of-type(4)');

buttonFavoriteBottom.addEventListener('click', () => {
	overlayFavorite.classList.remove('hidden-favorite-overlay');
	overlayBad.classList.add('hidden-bad-overlay');
});

buttonCloseFavorite.addEventListener('click', () => {
	overlayFavorite.classList.add('hidden-favorite-overlay');
});

/*********/
/* Clone to favo - card en remove buttons on click */
/*********/
buttonCardFavorite.addEventListener('click', () => {
	const node = document.querySelector('section:nth-of-type(3) .card');
	const clone = node.cloneNode(true);

	const buttonCloneFavorite = clone.querySelector('.button-card-favorite');
	const buttonClonebad = clone.querySelector('.button-card-bad');
	buttonCloneFavorite.addEventListener('click', moveFromBadToFavorite);
	buttonClonebad.addEventListener('click', moveFromFavoriteToBad);

	document.getElementById('list-favorite-facts').appendChild(clone);

	// clone card
	const nodeCardjes = document.querySelector('.button-nav-cards img');
	const cloneButtonCards = nodeCardjes.cloneNode(true);
	document.querySelector('.button-nav-cards').appendChild(cloneButtonCards);

	buttonCardFavorite.classList.add('hidden');
	card.classList.add('animtion-favo');
	buttonTubBottom.classList.remove('opacity');
});

/*********/
/* Clone to bad - card en remove buttons on click */
/*********/
buttonCardBad.addEventListener('click', () => {
	const node = document.querySelector('section:nth-of-type(3) .card');
	const clone = node.cloneNode(true);

	const buttonCloneFavorite = clone.querySelector('.button-card-favorite');
	const buttonClonebad = clone.querySelector('.button-card-bad');
	buttonCloneFavorite.addEventListener('click', moveFromBadToFavorite);
	buttonClonebad.addEventListener('click', moveFromFavoriteToBad);

	document.getElementById('list-bad-facts').appendChild(clone);

	buttonCardBad.classList.add('hidden');
	card.classList.add('animtion-del');
	buttonTubBottom.classList.remove('opacity');
});

function moveFromBadToFavorite() {
	const card = this.closest('.card');
	uselessFactsListFavorite.appendChild(card);
}

function moveFromFavoriteToBad() {
	const card = this.closest('.card');
	uselessFactsListbad.appendChild(card);
}

/*********/
/* Drag and drop */
/*********/
new Sortable(uselessFactsListbad, {
	group: 'shared',
	animation: 150,
});

new Sortable(uselessFactsListFavorite, {
	group: 'shared',
	animation: 150,
});

/*********/
/* add card with space */
/*********/
document.addEventListener('keydown', e => {
	if (e.code === 'Space' && !buttonTubBottom.classList.contains('opacity')) {
		removeHiddenCard();
		getUselessFacts();
	}
});

/*********/
/* message setTime */
/*********/
const zeroStateMessage = document.querySelector('section:nth-of-type(1)');
const mediaMatch = window.matchMedia('(min-width: 1200px)');

setTimeout(mediaMatch => {
	zeroStateMessage.classList.add('opacity');
	buttonTubBottom.classList.remove('tub-hidden');
}, 2000);
