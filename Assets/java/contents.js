userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];
const wolf = userInput[0];
const chicken = userInput[1];
const horse = userInput[2];
const dolphin = userInput[3];
const snake = userInput[4];

// function getAnimalInfo() {

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

            let pickAnimalArray = data[getRandomAnimal()];

            function getRandomAnimal() {
                const i = Math.floor(Math.random() * data.length);
                return i;
            }

            function trueChicken(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.class === "Aves";
            }

            if (!trueChicken(pickAnimalArray)) {
                return fetchAnimalInfo('chicken');
            } else {
                printingAnimal(pickAnimalArray);
            }

            // function trueWolf(pickAnimalArray) {
            //     const taxonomy = pickAnimalArray.taxonomy;
            //     return taxonomy.class === "Aves";
            // }

            // if (!trueWolf(pickAnimalArray)) {
            //     return fetchAnimalInfo('chicken');
            // } else {
            //     printingAnimal(pickAnimalArray);
            // }

            // function trueHorse(pickAnimalArray) {
            //     const taxonomy = pickAnimalArray.taxonomy;
            //     return taxonomy.class === "Aves";
            // }

            // if (!trueHorse(pickAnimalArray)) {
            //     return fetchAnimalInfo('chicken');
            // } else {
            //     printingAnimal(pickAnimalArray);
            // }

            // function trueDolphin(pickAnimalArray) {
            //     const taxonomy = pickAnimalArray.taxonomy;
            //     return taxonomy.class === "Aves";
            // }

            // if (!trueDolphin(pickAnimalArray)) {
            //     return fetchAnimalInfo('chicken');
            // } else {
            //     printingAnimal(pickAnimalArray);
            // }

            // function trueSnake(pickAnimalArray) {
            //     const taxonomy = pickAnimalArray.taxonomy;
            //     return taxonomy.class === "Aves";
            // }

            // if (!trueSnake(pickAnimalArray)) {
            //     return fetchAnimalInfo('chicken');
            // } else {
            //     printingAnimal(pickAnimalArray);
            // }

            function printingAnimal() {

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
            }

            if (!trueChicken(pickAnimalArray)) {
                return fetchAnimalInfo('chicken');
            } else {
                printingAnimal(pickAnimalArray);
            }

        })

        .catch(error => {
            console.error('Error:', error);
        });
}
function getRandomBook() {
    const i = Math.floor(Math.random() * 5);
    return i;
}

// fetch story
function fetchBookInfo(animalName) {
    fetch('https://gutendex.com/books/?topic=animal&search=' + animalName, {
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

                $(".book1").wrap("<a href='" + limitedData[getRandomBook()].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[getRandomBook()].title}`);

            } else {
                console.log("No results found or invalid data structure.");
                return;
            }

        });

}
// }

const chickenButton = document.getElementById('chickenImg');
const dolphinButton = document.getElementById('dolphinImg');
const horseButton = document.getElementById('horseImg');
const snakeButton = document.getElementById('snakeImg');
const wolfButton = document.getElementById('wolfImg');

chickenButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();


    fetchAnimalInfo(chicken);
    fetchBookInfo(chicken);
});

dolphinButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetchAnimalInfo(dolphin);
    fetchBookInfo(dolphin);
});

horseButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetchAnimalInfo(horse);
    fetchBookInfo(horse);
});

snakeButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetchAnimalInfo(snake);
    fetchBookInfo(snake);
});

wolfButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetchAnimalInfo(wolf);
    fetchBookInfo(wolf);
});