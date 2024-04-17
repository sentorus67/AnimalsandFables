userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];
const wolf = userInput[0];
const chicken = userInput[1];
const horse = userInput[2];
const dolphin = userInput[3];
const snake = userInput[4];

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

            //creates an object that holds its function based on that animal picked
            const animalCriteriaInfo = {
                "chicken": {
                    criteria: function (animalData) {
                        return animalData.taxonomy.class === "Aves";
                    },
                    printInfo: function (animalData) {
                        printingAnimal(animalData);
                    }
                },
                "wolf": {
                    criteria: function (animalData) {
                        return animalData.taxonomy.family === "Canidae"; 
                    },
                    printInfo: function (animalData) {
                        printingAnimal(animalData); 
                    }
                },
                "dolphin": {
                    criteria: function (animalData) {
                        return animalData.taxonomy.family === "Delphinidae"; 
                    },
                    printInfo: function (animalData) {
                        printingAnimal(animalData); 
                    }
                },
                "horse": {
                    criteria: function (animalData) {
                        return animalData.taxonomy.family === "Equidae"; 
                    },
                    printInfo: function (animalData) {
                        printingAnimal(animalData); 
                    }
                },
                "snake": {
                    criteria: function (animalData) {
                        return animalData.taxonomy.class === "Reptilia"; 
                    },
                    printInfo: function (animalData) {
                        printingAnimal(animalData); 
                    }
                },

            };

            if (animalCriteriaInfo[animalName] && animalCriteriaInfo[animalName].criteria(pickAnimalArray)) {
                animalCriteriaInfo[animalName].printInfo(pickAnimalArray); 
                fetchBookInfo(animalName);
            } else {
                console.log(`"${animalName}" doesn't meet the criteria.`);
            }

            function printingAnimal() {
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
            }

        })

        .catch(error => {
            console.error('Error:', error);
        });
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

                $(".book1").wrap("<a href='" + limitedData[0].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[0].title}`);

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

    $(".theNameofAnAnimal").empty();
    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();

    fetchAnimalInfo(chicken);
});

dolphinButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(".theNameofAnAnimal").empty();
    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();

    fetchAnimalInfo(dolphin);
});

horseButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(".theNameofAnAnimal").empty();
    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();

    fetchAnimalInfo(horse);
});

snakeButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(".theNameofAnAnimal").empty();
    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();

    fetchAnimalInfo(snake);
});

wolfButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(".theNameofAnAnimal").empty();
    $(".theLocationOfAnAnimal").empty();
    $(".theCharacteristicsofAnAnimal").empty();
    $(".book1").empty();

    fetchAnimalInfo(wolf);
});
