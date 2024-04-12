const searchButton = document.getElementById("searchBtn");
const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];



function getAnimalInfo() {
    const pickAnimal = userInput[getRandomNumber()];

    fetchAnimalInfo(pickAnimal);
    fetchBookInfo(pickAnimal);

    function getRandomNumber() {
        const i = Math.floor(Math.random() * userInput.length);
        return i;
    }

    // Fetch animal info
    function fetchAnimalInfo(animalName) {
        fetch('https://api.api-ninjas.com/v1/animals?name=' + animalName, {
            method: 'GET',
            headers: { 'X-Api-Key': 'tN43+ANwhRe+jQOeMlmEMg==mdTQu9dGB6ZbUzQy' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                // const pickAnimalArray = data[getRandomAnimal()];

                // function getRandomAnimal() {
                //     const i = Math.floor(Math.random() * data.length);
                //     return i;
                // }

                const pickAnimalArray = data[0];
            
                $('.theNameOfAnAnimal').text(`${pickAnimalArray.name}`);

                if (pickAnimalArray.locations) {
                    $('.theLocationOfAnAnimal').text(`Location: ${pickAnimalArray.locations}`);
                } else if (pickAnimalArray.characteristics.location) {
                    $('.theLocationOfAnAnimal').text(`Location: ${pickAnimalArray.characteristics.location}`);
                } else {
                    $('.theLocationOfAnAnimal').text(`Habitat: ${pickAnimalArray.habitat}`);
                }

                if (pickAnimalArray.characteristics.slogan) {
                    $('.theCharacteristicsOfAnAnimal').text(`Fun Fact: ${pickAnimalArray.characteristics.slogan}`);
                } else if (pickAnimalArray.characteristics.predators) {
                    $('.theCharacteristicsOfAnAnimal').text(`Predators: ${pickAnimalArray.characteristics.predators}`);
                } else {
                    $('.theCharacteristicsOfAnAnimal').text(`Prey: ${pickAnimalArray.characteristics.prey}`);
                }

                if (pickAnimal === userInput[0]) {
                    $('.imageOfAnAnimal').attr("src", `Assets/Images/Wolf.webp`);                    
                }else if (pickAnimal === userInput[1]){
                    $('.imageOfAnAnimal').attr("src", `Assets/Images/Chicken.webp`); 
                }else if (pickAnimal === userInput[2]){
                    $('.imageOfAnAnimal').attr("src", `Assets/Images/Horse.webp`);
                }else if (pickAnimal === userInput[3]){
                    $('.imageOfAnAnimal').attr("src", `Assets/Images/Dolphin.webp`);
                }else{
                    $('.imageOfAnAnimal').attr("src", `Assets/Images/Snake.webp`);
                }
                
            })

            .catch(error => {
                console.error('Error:', error);
            });
    }

    // fetch story
    function fetchBookInfo(animalName) {
        fetch('https://gutendex.com/books/?search=' + animalName, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data && data.results && Array.isArray(data.results)) {
                    const limitedData = data.results.slice(0, 5);
                    console.log(limitedData);
                } else {
                    console.log('No results found or invalid data structure.');
                }
            });

    }
}


// searchButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     getAnimalInfo();

// });

/** ------------------------------------------------------------------------*/ 

//thedogapi/thecatapi
// const apiKey = live_BJf5ZEd02YfS1DapamineBUzLcBY1wuQrIqP8RhsMJZ3awEkhKOnFymAFQ5ruljd
// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_BJf5ZEd02YfS1DapamineBUzLcBY1wuQrIqP8RhsMJZ3awEkhKOnFymAFQ5ruljd


// fetch('https://ecos.fws.gov/ecp/pullreports/catalog/species/report/species/export', {
//     method: 'GET', //GET is the default.
//     credentials: 'same-origin', // include, *same-origin, omit
//     redirect: 'follow', // manual, *follow, error
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });


// For mobile menu 

  const mobileBuger = document.querySelector("#burger");
  const navbarLinks = document.querySelector("#nav-links");

  mobileBuger.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
  });

getAnimalInfo();

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    getAnimalInfo();

});

