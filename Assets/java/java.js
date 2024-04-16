const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];


const TestLink= document.getElementById('wolfLink');
const TestPicture= document.getElementById('animalPic');
const TestFact=document.getElementById('factoids');
const TestStory= document.getElementById('storiesTold');
const TestPast= document.getElementById('previousDays');
const bookMarker= document.getElementById('saveButton');

let animalbox=[];
const today=dayjs();
const todayFormatted=today.format('DD/MM/YYYY');

const Tomorrow=(today.add(1,'day')).format('DD/MM/YYYY');


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
                

                let pickAnimalArray = data[getRandomAnimal()];

                function getRandomAnimal() {
                    const i = Math.floor(Math.random() * data.length);
                    return i;
                }

                while (!trueAnimal()) {
                    pickAnimal = userInput[getRandomNumber()];
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
                        } else if (pickAnimal === userInput[3] && taxonomy.class === "Mammalia") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else if (pickAnimal === userInput[4] && taxonomy.class === "Reptilia") {
                            printingAnimal();
                            console.log(pickAnimalArray);
                            return true;
                        } else {
                            console.log("Matching");
                            console.log(pickAnimal);
                            console.log(taxonomy.class || taxonomy.family);
                            return false;
                        }
                    } 
                    else {
                        console.log("still Matching....");
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

                    $(".book1").wrap("<a href='" + limitedData[0].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[0].title}`);
                    $(".book2").wrap("<a href='" + limitedData[1].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[1].title}`);
                    $(".book3").wrap("<a href='" + limitedData[2].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[2].title}`);
                    $(".book4").wrap("<a href='" + limitedData[3].formats["text/html"] + "' target='_blank'></a>").text(`Title: ${limitedData[3].title}`);

                } else {
                    console.log("No results found or invalid data structure.");
                }

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


function todaysAnimal()
{
    animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
    if(animalbox==null)
    {
        animalbox=[];
    }
    storeAnimals();
}

function storeAnimals()
{
     animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
     if(animalbox==null)
     {
        animalbox=[];
     }
     const viewedAnimal=
     {
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
     console.log(viewedAnimal);
     console.log(viewedAnimal.date);
     localStorage.setItem('pastAnimals',JSON.stringify(animalbox));
     alert(' This animal has been bookmarked.');

     pastDate=document.createElement('button')
     pastDate.textContent=`${viewedAnimal.date}: ${viewedAnimal.animalName}`;
     TestPast.appendChild(pastDate);
     pastDate.addEventListener('click',function(){
         retrieveAnimal(viewedAnimal)
     });
}

function retrieveAnimal(dateValue)
{
    animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
    console.log( dateValue);
    if(animalbox!=null ){
        pickedDate=animalbox[dateValue];
        $('#animalPic').attr('src',pickedDate.animalImage);
        $('.theNameOfAnAnimal').text(pickedDate.animalName);
        $('.theLocationOfAnAnimal').text(pickedDate.animalLocation);
        $('.theCharacteristicsOfAnAnimal').text(pickedDate.animalFacts);
        $(".book1").text(pickedDate.book1);
        $(".book2").text(pickedDate.book2);
        $(".book3").text(pickedDate.book3);
        $(".book4").text(pickedDate.book4);

    }
}

function setSavedAnimals()
{
    animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
    if(animalbox !=null){
        for (let index = 0; index < animalbox.length; index++) {
            pastDate=document.createElement('button')
            pastDate.textContent=`${animalbox[index].date}: ${animalbox[index].animalName}  `;
            TestPast.appendChild(pastDate);
            pastDate.addEventListener('click',function(){
                retrieveAnimal(index)
            });

        }
    }
    console.log(TestPast);
}

const mobileBuger = document.querySelector("#burger");
const navbarLinks = document.querySelector("#nav-links");

mobileBuger.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
});




$(document).ready(function (){
    if(bookMarker!=undefined){
saveButton.addEventListener('click',todaysAnimal);}
 setSavedAnimals();
 getAnimalInfo();
});