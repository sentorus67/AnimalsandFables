const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];
// let animalPickedToday = JSON.parse(localStorage.getItem("currentDay"));
// const currentDay = dayjs().format("MM-DD-YYYY");

// function newDay() {
//     return animalPickedToday !== currentDay;
// }

function getAnimalInfo() {
//     if (!newDay()) {
//         console.log("Animal of the day already picked.");
//         return;
//     }

//     animalPickedToday = currentDay;
//     localStorage.setItem("currentDay", animalPickedToday);

const pickAnimal = userInput[getRandomNumber()];

    fetchBookInfo(pickAnimal);
    fetchAnimalInfo(pickAnimal);


    function getRandomNumber() {
        const i = Math.floor(Math.random() * userInput.length);
        return i;
    }

    // Fetch animal info
    function fetchAnimalInfo(pickAnimal) {
        fetch('https://api.api-ninjas.com/v1/animals?name=' + pickAnimal, {
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

                trueAnimal();

                while (!trueAnimal(pickAnimalArray)) {
                    let pickAnimal = userInput[getRandomNumber()];
                    pickAnimalArray = fetchAnimalInfo(pickAnimal);
                }

                function trueAnimal() {
                    if (pickAnimalArray) {
                        const taxonomy = pickAnimalArray.taxonomy;

                        if (pickAnimal === userInput[0] && taxonomy.family === "Canidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[1] && taxonomy.class === "Aves") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[2] && taxonomy.family === "Equidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[3] && taxonomy.family === "Delphinidae") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[4] && taxonomy.class === "Reptilia") {
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
                    }
                }

                // const pickAnimalArray = data[0];
                function printingAnimal() {
                    // $('.theNameOfAnAnimal').text(`Animal of the Day: ${pickAnimalArray.name}`);
                    $('.theNameOfAnAnimal').text(`Animal of the Day: ${pickAnimalArray.name}`).css({
                        'font-family': 'Arial, sans-serif',
                        'font-size': '20px',
                        'color': 'darkgreen',
                        'font-weight': 'bold'
                      });

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

    // fetch story
    function fetchBookInfo(pickAnimal) {
        fetch('https://gutendex.com/books/?search=' + pickAnimal, {
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
                    $(".book2").wrap("<a href='" + limitedData[1].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[1].title}`);
                    $(".book3").wrap("<a href='" + limitedData[2].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[2].title}`);
                    $(".book4").wrap("<a href='" + limitedData[3].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[3].title}`);

                    console.log(limitedData[0].formats["text/html"]);
                } else {
                    console.log("No results found or invalid data structure.");
                }

                //  ${limitedData[0].formats["text/html"]}
            });

    }
}
// For mobile menu 

// const burgerIcon = document.querySelector('#burger');
// const navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () => {
//     navbarMenu.classList.toggle('is-active')
// });

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });

});

const mobileBuger = document.querySelector("#burger");
const navbarLinks = document.querySelector("#nav-links");

mobileBuger.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
});

getAnimalInfo();
