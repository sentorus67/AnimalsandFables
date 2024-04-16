const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];

function getAnimalInfo() {

let pickAnimal = userInput[getRandomNumber()];

    fetchBookInfo(pickAnimal);
    fetchAnimalInfo(pickAnimal);


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

               let pickAnimalArray = data[getRandomAnimal()];

                function getRandomAnimal() {
                    const i = Math.floor(Math.random() * data.length);
                    return i;
                }

                trueAnimal();

                while (!trueAnimal(pickAnimalArray)) {
                    let pickAnimal = userInput[getRandomNumber()];
                    pickAnimalArray = fetchAnimalInfo(pickAnimal);
                }

                function trueAnimal() {
                    if (pickAnimalArray) {
                        const taxonomy = pickAnimalArray.taxonomy;

                        if (pickAnimal === userInput[0] && taxonomy.family == "Canidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[1] && taxonomy.class == "Aves") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[2] && taxonomy.family == "Equidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[3] && taxonomy.family == "Delphinidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[4] && taxonomy.class == "Reptilia") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else {
                            console.log("not working");
                            console.log(taxonomy.class || taxonomy.family);
                            return false;
                        }
                    } else {
                        console.log("still not working?!?!");
                        return true;
                    }
                }

                function printingAnimal() {
                    // $('.theNameOfAnAnimal').text(`Animal of the Day: ${pickAnimalArray.name}`);
                    $('.theNameOfAnAnimal').text(`Animal of the Day:`).css({
                        'font-family': 'Arial, sans-serif',
                        'font-size': '20px',
                        'color': 'darkgreen',
                        'font-weight': 'bold'
                      });
                    //can be put on the same line as Animal of the Day unless we are trying to style them differently?
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
                    } else if (pickAnimal === userInput[1]) {
                        $('.imageOfAnAnimal').attr("src", `Assets/Images/Chicken.webp`);
                    } else if (pickAnimal === userInput[2]) {
                        $('.imageOfAnAnimal').attr("src", `Assets/Images/Horse.webp`);
                    } else if (pickAnimal === userInput[3]) {
                        $('.imageOfAnAnimal').attr("src", `Assets/Images/Dolphin.webp`);
                    } else {
                        $('.imageOfAnAnimal').attr("src", `Assets/Images/Snake.webp`);
                    };
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
                console.log(data.results);
                if (data && data.results && Array.isArray(data.results)) {
                    const limitedData = data.results.slice(0, 5);
                    console.log(limitedData);
                    
                    $(".book1").wrap("<a href='" + limitedData[getRandomBook()].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[getRandomBook()].title}`);

                    console.log(limitedData[0].formats["text/html"]);
                } else {
                    console.log("No results found or invalid data structure.");
                    return;
                }
            });

    }
}

const mobileBuger = document.querySelector("#burger");
const navbarLinks = document.querySelector("#nav-links");

mobileBuger.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
});

getAnimalInfo();

// ---------------------------------

// randomize a set selection of books that pop up in an array
//conditional about if book is picked excerpt is printed along with it.