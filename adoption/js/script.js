//The Dog Api
// const dogURL = "https://api.thedogapi.com/v1/breeds/search?q="
// const dogAPIkey = "6c09c349-113e-4625-8c2d-219f68ebc17d"

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

    var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6IjNiOWMxZmRkN2ViY2ViY2FlODk5N2VjOWU2MTAxNzgxMDBjYTRkNmM2YzIxOWUyYTUyMzIyYTgyYjA0MzIzZTFiY2QzOTIxZTE2NmJhNTUzIiwiaWF0IjoxNjMyNDI3Mzk3LCJuYmYiOjE2MzI0MjczOTcsImV4cCI6MTYzMjQzMDk5Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.dAZhOQSqyaIKdq7DdIrA0HyqhX0ldJwVriU6ibM0pyyyi8k1xaBiIO7XQttNw7n1X3eqKhaLp4OjVeZ1Qn50ZUJkfN4_EAjYP2D48rAl81k65akCuVq2Fk92sn-mVwWOhrJN9CZvXKfuleMcnF2K0soWfBd8RCUq1GPJAptpbUzLSocbHuczbidEqO0_x6zTeL3D1EZ6uxTJmWXDwhQr2KTQtHd5Z-QHi1g0F9Ce4fJL2RzieD18RQ-VpgRdHLfRVPiuzDWvMBl0v4UrOB30GgFpNtNuGGAwfOHLD1bSuvwm3kf0OJ3z91-rbIp0VVTywnsZzsJxctXfiL_OIB0FVA"

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
    var animalLength = data.animals.length;
    var i = Math.floor(Math.random() * 20) + 1
    console.log(i)
    // console.log(i)
    // var index = ['']
    // var i = data.animals[Math.floor(Math.random() * userRange)]
    // console.log(randomDog)
    
    var photos = data.animals[i].photos[0].medium;
    // var breed = data.animals[i].breeds.primary;
    
    if(photos){

    //var photos = data.animals[i].photos[0].small;
    var breed = data.animals[i].breeds.primary;

    displayPhoto.src = photos;
    displayName.textContent = data.animals[i].name;
    displayGender.textContent = data.animals[i].gender;
    displayBreed.textContent = breed;
    displayAge.textContent = data.animals[i].age;
    displaySize.textContent = data.animals[i].size;
    displayDesc.textContent = data.animals[i].description;

    dogBreed(breed);
} else{
    displayNextAnimal();
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

var displayNextAnimal = function() {



}
    
dislikeBtnEl.addEventListener('click', function(searchBtnEl){


}
)



// }
petGenders();
init();















