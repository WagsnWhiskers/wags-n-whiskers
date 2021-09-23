//The Dog Api
const dogURL = "https://api.thedogapi.com/v1/breeds/search?q="
const dogAPIkey = "6c09c349-113e-4625-8c2d-219f68ebc17d"

//PetFinder API Info 
//https://api.petfinder.com/v2/animals?type=dog
const petFinderAPIKey = 'RcXYh4mDw2b7Y8vdtikNqfAq4DnlTjpFXttwGIxMBSGQWBJBNx';
const petFinderSecret = '4zBV99JLvPpoicS8Efy8Bb6TFvDumlTyMylQ4z56';

// Filter Elements
// City,State,Zip
var userCityEl = document.getElementById('user-city');
var userAgeEl = document.getElementById('user-age');
var userSizeEl = document.getElementById('user-size');
var userFemaleEl = document.getElementById('user-gender-female');
var userMaleEl = document.getElementById('user-gender-male');
var userGenders = '';


//Pet Display
var displayName = document.getElementById('petName');
var displayGender = document.getElementById('petGender');
var displayAge = document.getElementById('petAge');
var displaySize = document.getElementById('petSize');
var displayDesc = document.getElementById('petDescription');
var displayPhoto = document.getElementById('petPhoto');
var displayBreed = document.getElementById('petBreed');



//! HTML ELEMENTS
var dislikeBtnEl = document.getElementById('dislikeBtn');
var likeBtnEl = document.getElementById('likeBtn');
var searchBtnEl = document.getElementById('searchButton');
var descriptionEl = document.getElementById('petDescription');

//! GLOBAL VARIABLES
const maxPastLikes = 5; //max amount of likes saved and displayed on past likes tab &&keep low because each save is a single api request
const animalArrayLength = 20; //amount the api gets per call and the ideal length the pet array should float around

var arrayOfPetsInQueue = []; //array of pets to go through deletes index 0 everytime it goes to next pet
var currentPetId = 0; //id of currently displayed pet INTEGER
var userRange = 50; //miles range 1-500 default:100 (gets bigger if no animals are found in area)

// Fetch Request
// Will need to create a refresh token of some sort // Further Research
//var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6ImQ4Yzg5YTkyMTFiNDAzN2YyY2VhYjFjOTVjMjJhYzQ1ZWFhMmYxNzAxOTE1MzQ5MTg5ZjUzMGY1MTRlZTRkMzIxYjIyMTljYWY2ZmVlNTQ1IiwiaWF0IjoxNjMyNDA1MDU3LCJuYmYiOjE2MzI0MDUwNTcsImV4cCI6MTYzMjQwODY1Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.snru-B25PUa73czoewHI-0-0cYRAwytI1ULjHJji7WgFS2GOBTxuhM84GNz1obg7Ec3_IybO7CkzEY-m_GgDYAwO9DyJbrT_Z-lMlH0g-HMtDS7bk-l6mqm9FaVT2out04rwcpjqExxC6uFuDFYofyVAi5QZ7tJRdDEcUA8dVbHDZttm7LTwQ2gmuBWpJQ2KO3yLWpw1GI_6HL43m0pyDJdn5ODGqeY9g1Jsv4Q53vYqdJ1jcmUSg2HYNMo3LTz7upsvnOemuA8Q62rPUYEezYec48gLshQSPe2puxpIX0LknUoYLc88mFcGdH_NlNfYpPMSayOUWZhjc-j5eoUmZA"

//const url = "https://api.petfinder.com/v2/animals?type=dog&age=" + userAgeEl.value

// const options = {
//     headers: {
//         Authorization: "Bearer " + bearerToken
//     }
// }

var i = 0;

var init = function () {

    searchBtnEl.addEventListener('click', findDog);
    likeBtnEl.addEventListener('click', likeButton)

}




var petGenders = function() {

    if(userMaleEl.checked) {
        userGenders = 'male';
    }

    if(userFemaleEl.checked) {
        userGenders = "female";
    }
    console.log(userGenders);
    return userGenders;
    
}

console.log(userCityEl)
//Fetch function
var findDog = function() {
    // event.preventDefault();
    petGenders();

    var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6ImM2YmRjMzA2NjcxNTljMWJkNzE1YzZhNjlhNGVmMDdkYWE5MjEyNWE1NjZkNmM4MjliMGNlYmNkNjBiN2YwMjE5NmU3N2Y5ZTA3YTIwNGEzIiwiaWF0IjoxNjMyNDMxMTM5LCJuYmYiOjE2MzI0MzExMzksImV4cCI6MTYzMjQzNDczOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ViWGEneefZRA_8eajPoAfD_VGQr9GDYFK6z0rTehgoUJ-mhXpjMrU39-9LjTsP8B5uMMJZtAUJeV6HKfE9U_93kSUKRWFlv1YhNqr3vxbziIhgsd1I5VoWeKPub747Odh9uyg-pmbGiM7OQgO2nRpAbTU9WbpHdQHGPP6HsoUoJEhdMs_6dD1-7OzYVr9trO9In0W10I31xHXu_GrkBU2bKTtmKkFoJexC9KrUKqQu6KLN_vfOQzHZ-qe8CXbo2-sc5kyyIv5Gv8GJt2KdJ95AVsXvmRyKW_Aubc8HOfjw2jlm4WKXhAW0SovxdEsF4GWrH7Z5jEgsDDB_dzCSf__w"

const url = "https://api.petfinder.com/v2/animals?type=dog&age=" + userAgeEl.value + "&location=" + userCityEl.value + "&size=" + userSizeEl.value + "&gender=" + userGenders

const options = {
    headers: {
        Authorization: "Bearer " + bearerToken
    }
}

fetch(url, options)
    .then(response => response.json())
     .then(data => {
         displayDog(data)
         console.log(data)})
    //  displayDog(data)
    
}

var displayDog = function(data) {
    i++;
    var animalLength = data.animals.length;
    //foreach(i = 1; i < animalLength; i++){
    //var i = Math.floor(Math.random() * 20) + 1
    console.log(i)
    var photos = data.animals[i].photos[0].small;
    
    if(photos){

    var breed = data.animals[i].breeds.primary;

    displayPhoto.src = photos;
    displayName.textContent = data.animals[i].name;
    displayGender.textContent = data.animals[i].gender;
    displayBreed.innerHTML = breed;
    displayAge.textContent = data.animals[i].age;
    displaySize.textContent = data.animals[i].size;
    displayDesc.textContent = data.animals[i].description;

    dogBreed(breed);
} else{
    findDog();
    
}}
    
var likeButton = function() {

    console.log(displayName.textContent)
 $("#pastLikesDiv").append(

    `<ul class="collection">
    <li class="collection-item avatar">
      <img src=${displayPhoto.src} alt="picture of dog" class="circle">
      <span class="title black-text">${displayName.textContent}</span>
      <p class="black-text">${displayGender.textContent}<br>${displayAge.textContent}
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons right">grade</i></a>
      </div class="input-field">
      <i class="material-icons prefix">book_online</i><label for="appointment">Make an Appointment to Meet</label>
      <input id="appointment" type="text" class="datepicker" > 
    </li>
    </ul>`
 )
        findDog();
 }

 

var dogBreed = function (breed) {

const dogURL = "https://api.thedogapi.com/v1/breeds/search?q=" + breed
const dogAPIkey = "6c09c349-113e-4625-8c2d-219f68ebc17d"

const options = {
    headers: {
        'x-api-key': dogAPIkey
    }
}
    fetch(dogURL, options)
    .then(response => response.json())
     .then(breedData => {
        displaySize.textContent = displaySize.textContent + " / " + breedData[0].weight.imperial + "lbs";
         console.log(breedData)})
         console.log(displaySize.textContent)
}


dislikeBtnEl.addEventListener('click', findDog)



// }
petGenders();
init();






$(document).ready(function(){
    $('.datepicker').datepicker();
  });








