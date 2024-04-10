const searchButton = document.getElementById("searchBtn");
const userInput = ["wolf", "chicken", "horse", "dolphin", "snake"];



function getAnimalInfo() {
    const pickAnimal = userInput[getRandomNumber()];
    // const userInput = document.getElementById("animalName").value;

    fetchAnimalInfo(pickAnimal);
    fetchBookInfo(pickAnimal);
    // if (!userInput) {
    //     alert("Please Enter an Animal");
    //     return;
    // }

    // // localStorage.setItem("userInput", userInput);
    // console.log(userInput);

    function getRandomNumber(){
        const i = Math.floor(Math.random() * userInput.length);
        return i;
    }

    // Fetch animal info
    function fetchAnimalInfo (animalName){
    fetch('https://api.api-ninjas.com/v1/animals?name=' + animalName, {
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
        
        const animalInfoData = data[0].name

        $('.theFactsofAnimals').text(`${data[0].name}`);

      console.log(animalInfoData);
      
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }
     
    // fetch story
    function fetchBookInfo (animalName){ 
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