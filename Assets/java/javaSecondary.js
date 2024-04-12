const TestLink= document.getElementById('wolfLink');
const TestPicture= document.getElementById('animalPic');
const TestFact=document.getElementById('factoids');
const TestStory= document.getElementById('storiesTold');

// All Ids added are subject to change, this is explcitly for the  purpose of testing functions.

function switchToAnimal(){
    // const Animal=animalParameter;
    console.log('the function is being called');
    TestPicture.src="Assets/Images/Wolf.webp";
    TestFact.textContent= "Wolves are interesting Creatures, They explode upon contact. They have no eyes and see entirely with their feet. They Communicate by making out with each other.";

   const newToList=document.createElement('li');
   newToList.textContent='Wolf of Wall Street';
    TestStory.appendChild(newToList);

}

TestLink.addEventListener("click",switchToAnimal);