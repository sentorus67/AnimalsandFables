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

                // if (pickAnimalArray.taxonomy.order !== "Carnivora" || pickAnimalArray.taxonomy.class !== "Aves" || pickAnimalArray.taxonomy.class !== "Reptilia" || pickAnimalArray.taxonomy.class !== Mammalia){
                //     getRandomNumber();
                // }else{
                //     return;
                // };
                let findTrueAnimal = true;

                while (findTrueAnimal) {
                
                  if (pickAnimalArray === userInput[0] && pickAnimalArray.taxonomy.order === "Carnivora") { 
                    findTrueAnimal = false;
                  }else if (pickAnimalArray === userInput[1] && pickAnimalArray.taxonomy.class === "Aves"){
                    findTrueAnimal = false;

                }else if (pickAnimalArray === userInput[2] && pickAnimalArray.taxonomy.class === "Mammalia"){
                    findTrueAnimal = false; 

                  }else if (pickAnimalArray === userInput[3] && pickAnimalArray.name !== "Mahi Mahi (Dolphin Fish)"){
                    findTrueAnimal = false;
                      
                  }else if (pickAnimalArray === userInput[4] && pickAnimalArray.taxonomy.class === "Reptilia"){
                    findTrueAnimal = false;
                      
                  }else{
                    findTrueAnimal = false;
                  }
                }

                // const pickAnimalArray = data[0];
            function printingAnimal() {
                $('.theNameOfAnAnimal').text(`Animal of the Day: ${pickAnimalArray.name}`);

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
                };
    

            }

            printingAnimal();
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
    $navbarBurgers.forEach( el => {
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
