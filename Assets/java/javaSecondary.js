


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

//// Fake function grabAnimal(){

//     ModifiedFetchAnimalTemplate(){
//     searchNewData= true;

//     while (searchNewData) {
//         grabData();
//         if(Data.Class == 'Mammalia')
//         {
//         //  set data info to page
//         searchNewData=false
//         } 
//     }

//     Append information and stories
   

// }
// }

function storeAnimals(){
    
     const today=dayjs().format('DD/MM/YYYY');
     animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
     if(animalbox==null){
         animalbox=[];
     }

     const viewedAnimal={
     animalName: $('.theNameofAnimals').text(),
     animalLocation: $('.theLocationofAnimals').text(),
     animalfacts: $('.theCharacteristicsofAnimals').text(),
     date: today,
     }
   
     animalbox.push(viewedAnimal);
     console.log(animalbox);
     localStorage.setItem('pastAnimals',JSON.stringify(animalbox));
}

SaveButton.addEventListener('click',storeAnimals);