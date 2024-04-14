


const TestLink= document.getElementById('wolfLink');
const TestPicture= document.getElementById('animalPic');
const TestFact=document.getElementById('factoids');
const TestStory= document.getElementById('storiesTold');
const TestPast= document.getElementById('previousDays')

let animalbox=[];
const today=dayjs();
const todayFormatted=today.format('DD/MM/YYYY');

const Tomorrow=(today.add(1,'day')).format('DD/MM/YYYY');



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


//TestLink.addEventListener("click",switchToAnimal);

function todaysAnimal(){
    animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
    if(animalbox==null){
        animalbox=[];
    }

    // if(animalbox.length!=0 && animalbox[animalbox.length-1].date==todayFormatted)
    // {
    //     console.log("The last element is the same as today");
    // }
    // else
    // {
    //     console.log("The last element is different from today")
    //     storeAnimals();
    // }

    storeAnimals();
}

function storeAnimals(){
     
     animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
     if(animalbox==null){
        animalbox=[];
     }
     const viewedAnimal={
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

     localStorage.setItem('pastAnimals',JSON.stringify(animalbox));
}

function retrieveAnimal(dateValue){
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

function setSavedAnimals(){
    animalbox=JSON.parse(localStorage.getItem('pastAnimals'));
    if(animalbox !=null){
        for (let index = 0; index < animalbox.length; index++) {
            pastDate=document.createElement('button')
            pastDate.textContent=`${animalbox[index].date}  `;
            TestPast.appendChild(pastDate);
            pastDate.addEventListener('click',function(){
                retrieveAnimal(index)
            });

        }
    }
    console.log(TestPast);
}

$(document).ready(function (){
saveButton.addEventListener('click',todaysAnimal);
 setSavedAnimals();
});