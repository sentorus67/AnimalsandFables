const searchButton = document.getElementById("searchBtn");

function getAnimalInfo() {
    const userInput = document.getElementById("animalName").value;

    if (!userInput) {
        alert("Please Enter an Animal");
        return;
    }

    localStorage.setItem("userInput", userInput);
    console.log(userInput);

    // Fetch animal info
    fetch('https://api.api-ninjas.com/v1/animals?name=' + userInput, {
        method: 'GET',
        headers: { 'X-Api-Key': 'tN43+ANwhRe+jQOeMlmEMg==mdTQu9dGB6ZbUzQy'}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
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