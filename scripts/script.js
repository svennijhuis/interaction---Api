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
const buttonTubBottom = document.querySelector('.section-body .grabbelton');
const buttonWasteBottom = document.querySelector('.section-body .buttonprullebak');
const buttonFavoriteBottom = document.querySelector('.section-body .buttoncards');
/*********/
/* Variable - card buttons */
/*********/
const buttonCardWaste = document.querySelector('.section-body .cardprullebak');
const buttonCardFavorite = document.querySelector('.section-body .cardhartje');
/*********/
/* Variable - facts list good and bad */
/*********/
const uselessFactsListFavorite = document.getElementById('myList1');
const uselessFactsListbad = document.getElementById('myList2');

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
	buttonCardWaste.classList.remove('hidden');
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
const buttonCloseBadOverlay = document.querySelector('.delSlechtOverlay');
const overlayBad = document.querySelector('.slecht-overlay');

buttonWasteBottom.addEventListener('click', () => {
	overlayBad.classList.remove('hiddentras');
	overlayFavorite.classList.add('hiddenfavos');
});

buttonCloseBadOverlay.addEventListener('click', () => {
	overlayBad.classList.add('hiddentras');
});

/*********/
/* Overlay Favo - open/close */
/*********/
const buttonCloseFavorite = document.querySelector('.delFavosOverlay');
const overlayFavorite = document.querySelector('.favoriet-overlay');

buttonFavoriteBottom.addEventListener('click', () => {
	overlayFavorite.classList.remove('hiddenfavos');
	overlayBad.classList.add('hiddentras');
});

buttonCloseFavorite.addEventListener('click', () => {
	overlayFavorite.classList.add('hiddenfavos');
});

/*********/
/* Clone to favo - card en remove buttons on click */
/*********/
buttonCardFavorite.addEventListener('click', () => {
	const node = document.querySelector('.section-body .card');
	const clone = node.cloneNode(true);

	const buttonCloneHart = clone.querySelector('.cardhartje');
	const buttonClonePrullie = clone.querySelector('.cardprullebak');
	buttonCloneHart.addEventListener('click', moveFromPrullieToMyList);
	buttonClonePrullie.addEventListener('click', moveFromMyListToPrullie);

	document.getElementById('myList1').appendChild(clone);

	// clone cardjes
	const nodeCardjes = document.querySelector('.buttoncards img');
	const cloneCardjes = nodeCardjes.cloneNode(true);
	document.querySelector('.buttoncards').appendChild(cloneCardjes);

	buttonCardFavorite.classList.add('hidden');
	card.classList.add('animtion-favo');
	buttonTubBottom.classList.remove('opacity');
});

/*********/
/* Clone to bad - card en remove buttons on click */
/*********/
buttonCardWaste.addEventListener('click', () => {
	const node = document.querySelector('.section-body .card');
	const clone = node.cloneNode(true);

	const buttonCloneHart = clone.querySelector('.cardhartje');
	const buttonClonePrullie = clone.querySelector('.cardprullebak');
	buttonCloneHart.addEventListener('click', moveFromPrullieToMyList);
	buttonClonePrullie.addEventListener('click', moveFromMyListToPrullie);

	document.getElementById('myList2').appendChild(clone);

	buttonCardWaste.classList.add('hidden');
	card.classList.add('animtion-del');
	buttonTubBottom.classList.remove('opacity');
});

function moveFromPrullieToMyList() {
	const card = this.closest('.card');
	uselessFactsListFavorite.appendChild(card);
}

function moveFromMyListToPrullie() {
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
const zeroStateMessage = document.querySelector('.swipe-message');
const mediaMatch = window.matchMedia('(min-width: 1200px)');

setTimeout(mediaMatch => {
	zeroStateMessage.classList.add('opacity');
	buttonTubBottom.classList.remove('d-none');
}, 500);

/*

- namen veranderen dudielijk
- css streepje javascript hoofdletters
- html zo min mogelijk maken
- minder classes

*/
