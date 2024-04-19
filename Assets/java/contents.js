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
            let pickAnimalArray = data[getRandomAnimal()];

            function getRandomAnimal() {
                const i = Math.floor(Math.random() * data.length);
                return i;
            }

            function trueChicken(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.class === "Aves";
            }
            function trueWolf(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.family === "Canidae";
            }
            
            function trueHorse(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.family === "Equidae";
            }
            
            function trueDolphin(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.family === "Delphinidae";
            }
            
            function trueSnake(pickAnimalArray) {
                const taxonomy = pickAnimalArray.taxonomy;
                return taxonomy.class === "Reptilia";
            }

            if (animalName === "Chicken" && trueChicken(pickAnimalArray)) {
                modalPrint();
                return;
            } else if (animalName === "Wolf" && trueWolf(pickAnimalArray)) {
                modalPrint();
                return;
            } else if (animalName === "Horse" && trueHorse(pickAnimalArray)) {
                modalPrint();
                return;
            } else if (animalName === "Dolphin" && trueDolphin(pickAnimalArray)) {
                modalPrint();
                return;
            } else if (animalName === "Snake" && trueSnake(pickAnimalArray)) {
                modalPrint();
                return;
            } else {
                fetchAnimalInfo(animalName);
                console.log("Did not meet criteria");
            }

function modalPrint() {
            // prints fetched data to the modal
            const modal = document.getElementById('animalModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalLocation = document.getElementById('modalLocation')

            let name = pickAnimalArray.name;
            let description;
            let location;

            if (pickAnimalArray.characteristics.slogan) {
                description = `Fun Fact: ${pickAnimalArray.characteristics.slogan}`;
            } else if (pickAnimalArray.characteristics.predators) {
                description = `Predators: ${pickAnimalArray.characteristics.predators}`;
            } else if (pickAnimalArray.characteristics.prey) {
                description = `Prey: ${pickAnimalArray.characteristics.prey}`;
            } else if (pickAnimalArray.characteristics.lifespan) {
                description = `Lifespan: ${pickAnimalArray.characteristics.lifespan}`;
            } else {
                description = "No additional information available.";
            }

            if (pickAnimalArray.locations) {
                location = `Location: ${pickAnimalArray.locations}`;
            } else if (pickAnimalArray.characteristics.location) {
                location = `Location: ${pickAnimalArray.characteristics.location}`;
            } else if (pickAnimalArray.habitat) {
                location = `Habitat: ${pickAnimalArray.habitat}`;
            } else {
                location = "No additional information available.";
            }
            modalTitle.textContent = `Animal: ${name}`;
            modalDescription.textContent = description;
            modalLocation.textContent = location;
            fetchBookInfo(animalName);

            // Show modal
            modal.classList.add('is-active');
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

            const modalBook = document.getElementById('modalBook')

            const bookData = data.results[0];
            let book = bookData.title;

            modalBook.textContent = book;

            if (data.results && data.results.length > 0) {
                const bookTitle = bookData.title;
                const bookLink = bookData.formats["text/html"];
                modalBook.innerHTML = `<a href="${bookLink}" target="_blank">Story About Me: ${bookTitle}</a>`;
            } else {
                return;
            }

        });
}

// modal for contents html 

// Add event listener for images
document.querySelectorAll('.image-gallery li').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const animalName = item.dataset.animal;
        fetchAnimalInfo(animalName);
    });
});

// Add event listener to close button
document.querySelector('.modal-close').addEventListener('click', () => {
    const modal = document.getElementById('animalModal');
    modal.classList.remove('is-active');
});
