# Procesverslag
**Auteur:** Sven Nijhuis

**De opdrachten:** [opdracht 1](https://svennijhuis.github.io/Animtion-Jordan-logo/) en [opdracht 2](https://github.com/svennijhuis/interaction---Api)

## Bronnenlijst
  1. School - leraar
  2. [W3schools](https://www.w3schools.com/)
  3. [Css-tricks](https://css-tricks.com/)

## Opdracht 2 plan

<details open>
  <summary>Uitwerken na schetsen idee</summary>

  Ik heb een applicatie gemaakt waarmee je interaction kan hebben. Als je op de ton (button) drukt krijg je een fact. Dan kun je ervoor kiezen om de fact leuk te vinden of niet met een button. Als je hebt gekozen kan je de facts terug zien in twee lijsten. De slechte facts en favoriete facts. Het is ook mogelijk om de facts nog te verwisselen tussen de twee lijsten. Het kan door drag and drop en onclick.


  ### Je ontwerp:

  ![](https://github.com/svennijhuis/interaction---Api/blob/main/images/wireflow-01.jpg)

  ### Je ambitie: 
  Aan deze technieken/punten wil ik werken:
  - Netjes JavaScript schrijven
  - Toggle van classes
  - Nette HTML
  - Css netter opdelen
</details>


## Opdracht 2 reflectie

<details open>
  <summary>uitwerken bij afronden opdracht (voor week 8)</summary>

  ### De uitkomst - karakteristiek screenshot(s):

  ![](https://github.com/svennijhuis/interaction---Api/blob/main/images/light-mode.png)


  ### Dit ging goed/Heb ik geleerd: 
* Ik heb geleerd om mijn JavaScript Variable een juiste naam te geven, zodat die herkenbaar is. Bijv: 

            `const uselessFactsListFavorite` = document.getElementById('list-favorite-facts');
            `const uselessFactsListbad` = document.getElementById('list-bad-facts');

* Ik heb geleerd om Css classes met een streepje te schrijven als het meerdere woorden zijn. Bijv:

            .hidden-favorite-overlay 

* Ik heb geleerd om clone te gebruiken.

            const node = document.querySelector('section:nth-of-type(3) .card');
            const clone = node.cloneNode(true);

* Ik heb geleerd om een API koppeling te maken. Dit was vooral interessant, omdat je dan echt leert om met console.log te werken. Je kan dit terug zien in card met teksten die steeds verandere onclick.

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
            }
            

* Ik heb geleerd om data te zetten in een variable. Dit was handig, omdat je daardoor niet dezelfde facts kreeg.

          else if (uselessFactsArr.includes(uselessFactsHTML)) {
              return getUselessFacts();
            }

* Ik heb geleerd om meerdere functions aan te spreken op een click.

            if (e.code === 'Space' && !buttonTubBottom.classList.contains('opacity')) {
              removeHiddenCard();
              getUselessFacts();
            }


  ### Dit was lastig:

  * Ik vond het lastig om nette HTML te schrijven. Ik gebruikte eerst onnodig veel html en div. Ook zat er geen structuur in. Hier een voorbeeld waar ik tevreden over ben. De classes gebruik ik vooral voor de JavaScript.

            <section class="hidden-bad-overlay">
              <button class="button-close-bad-overlay">
                <img src="images/close.svg" alt="" />
              </button>
              <h2>My bad facts</h2>
              <div id="list-bad-facts"></div>
            </section>

  * Ik vond het lastig om elementen aan te spreken zonder classes in JavaScript. Ik heb dat vaak geprobeerd maar soms kwam ik er toch achter dat een class makkelijker was om te gebruiken maar heb het wel zo veel mogeijk ontweken. bijv:

            const buttonCardFavorite = document.querySelector('section:nth-of-type(3) .button-card-favorite');

  * Ik vond het lastig om elementen te clone die al gecloned waren. Ik moest de buttons die in de geclonde element zaten opnieuw aanspreken. Ik heb dit gedaan door nieuwe functions te maken.

            function moveFromBadToFavorite() {
              const card = this.closest('.card');
              uselessFactsListFavorite.appendChild(card);
            }

            function moveFromFavoriteToBad() {
              const card = this.closest('.card');
              uselessFactsListbad.appendChild(card);
            }


  ### De uitkomst:
  `Light mode`

  ![](https://github.com/svennijhuis/interaction---Api/blob/main/images/light-mode.png)

  `Dark mode`

  ![](https://github.com/svennijhuis/interaction---Api/blob/main/images/dark-mode.png)

</details>