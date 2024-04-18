const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];


const TestLink = document.getElementById('wolfLink');
const TestPicture = document.getElementById('animalPic');
const TestFact = document.getElementById('factoids');
const TestStory = document.getElementById('storiesTold');
const TestPast = document.getElementById('previousDays')

let animalbox = [];
const today = dayjs();
const todayFormatted = today.format('MM/DD/YYYY');

const Tomorrow = (today.add(1, 'day')).format('MM/DD/YYYY');

function getAnimalInfo() {
    //ability to choose animal at random
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
            headers: { 'X-Api-Key': 'QeWk/29ehyKm2Vzi4m7XwQ==CmgYJTcl6d5OkvmA' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();

            })
            .then(data => {
                console.log(data);
                //picks random index in the pulled data
                let pickAnimalArray = data[getRandomAnimal()];

                function getRandomAnimal() {
                    const i = Math.floor(Math.random() * data.length);
                    return i;
                }

                trueAnimal();
                // function that loops through conditionals to meet needed criteria
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

                // prints fetched data to page
                function printingAnimal() {
                    $('.theNameOfAnAnimal').text(`${pickAnimalArray.name}`).css({
                        'font-family': 'Arial, sans-serif',
                        'font-size': '20px',
                        'color': 'darkgreen',
                        'font-weight': 'bold'
                    });

                    // filters through array to confirm that it contains that information
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
                    } else if (pickAnimalArray.characteristics.prey){
                        $('.theCharacteristicsOfAnAnimal').text(`Prey: ${pickAnimalArray.characteristics.prey}`);
                    }else {
                        $('.theCharacteristicsOfAnAnimal').text(`Diet: ${pickAnimalArray.characteristics.diet}`);
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
                    // reduces the size of the fetched array
                    const limitedData = data.results.slice(0, 5);
                    console.log(limitedData);

                    $(".book1").wrap("<a href='" + limitedData[0].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[0].title}`);
                    $(".book2").wrap("<a href='" + limitedData[1].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[1].title.slice(0, 70)}...`);
                    $(".book3").wrap("<a href='" + limitedData[2].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[2].title.slice(0, 70)}...`);
                    $(".book4").wrap("<a href='" + limitedData[3].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[3].title.slice(0, 70)}...`);

                } else {
                    console.log("No results found or invalid data structure.");
                    return;
                }
            });

    }
}


function storeAnimals() {

    animalbox = JSON.parse(localStorage.getItem('pastAnimals'));
    if (animalbox == null) {
        animalbox = [];
    }
    const viewedAnimal = {
        animalImage: $('#animalPic').attr('src'),
        animalName: $('.theNameOfAnAnimal').text(),
        animalLocation: $('.theLocationOfAnAnimal').text(),
        animalFacts: $('.theCharacteristicsOfAnAnimal').text(),
        book1: $(".book1").text(),
        book2: $(".book2").text(),
        book3: $(".book3").text(),
        book4: $(".book4").text(),
        date: todayFormatted,
    }

    animalbox.push(viewedAnimal);

    localStorage.setItem('pastAnimals', JSON.stringify(animalbox));
    alert('The fact page has been saved');

    pastDate = document.createElement('button')
    pastDate.textContent = `${viewedAnimal.date}: ${viewedAnimal.animalName} `;
    TestPast.appendChild(pastDate);
    pastDate.addEventListener('click', function () {
        retrieveAnimal(viewedAnimal)
    });
}

function retrieveAnimal(dateValue) {
    animalbox = JSON.parse(localStorage.getItem('pastAnimals'));
    if (animalbox != null) {
        pickedDate = animalbox[dateValue];
        $('#animalPic').attr('src', pickedDate.animalImage);
        $('.theNameOfAnAnimal').text(pickedDate.animalName);
        $('.theLocationOfAnAnimal').text(pickedDate.animalLocation);
        $('.theCharacteristicsOfAnAnimal').text(pickedDate.animalFacts);
        $(".book1").text(pickedDate.book1);
        $(".book2").text(pickedDate.book2);
        $(".book3").text(pickedDate.book3);
        $(".book4").text(pickedDate.book4);

    }
}

function setSavedAnimals() {
    animalbox = JSON.parse(localStorage.getItem('pastAnimals'));
    if (animalbox != null) {
        for (let index = 0; index < animalbox.length; index++) {
            pastDate = document.createElement('button')
            pastDate.textContent = `${animalbox[index].date}: ${animalbox[index].animalName}  `;
            TestPast.appendChild(pastDate);
            pastDate.addEventListener('click', function () {
                retrieveAnimal(index)
            });

        }
    }
}

getAnimalInfo();

$(document).ready(function () {
    saveButton.addEventListener('click', storeAnimals);
    setSavedAnimals();
});


// For mobile menu 

const mobileBuger = document.querySelector("#burger");
const navbarLinks = document.querySelector("#nav-links");

mobileBuger.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
});