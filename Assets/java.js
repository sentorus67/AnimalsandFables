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

                const pickAnimalArray = data[getRandomAnimal()];

                function getRandomAnimal() {
                    const i = Math.floor(Math.random() * data.length);
                    return i;
                }

                $('.theNameofAnimals').text(`${pickAnimalArray.name}`);

                if (pickAnimalArray.locations) {
                    $('.theLocationofAnimals').text(`Location: ${pickAnimalArray.locations}`);
                } else {
                    if (pickAnimalArray.characteristics.location) {
                        $('.theLocationofAnimals').text(`Location: ${pickAnimalArray.characteristics.location}`);
                    }else{
                    $('.theLocationofAnimals').text(`Habitat: ${pickAnimalArray.habitat}`);
                    }
                }

                if (pickAnimalArray.characteristics.slogan) {
                    $('.theCharacteristicsofAnimals').text(`Fun Fact: ${pickAnimalArray.characteristics.slogan}`);
                } else {
                    if (pickAnimalArray.characteristics.predators){
                        $('.theCharacteristicsofAnimals').text(`Predators: ${pickAnimalArray.characteristics.predators}`);
                    }else{
                    $('.theCharacteristicsofAnimals').text(`Prey: ${pickAnimalArray.characteristics.prey}`);
                    }
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
                    const limitedData = data.results.slice(0, 5); // Limit to 10 books
                    console.log(limitedData);
                } else {
                    console.log('No results found or invalid data structure.');
                }
            });

    }
}


getAnimalInfo();

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    getAnimalInfo();

});