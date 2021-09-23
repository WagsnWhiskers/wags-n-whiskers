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
var userGenders = '';
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
searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    petGenders();

    var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6ImM2NzliZjZjMmEwMGM4N2E1OGU5ZjAyNGVhNTk1M2MyZmUxZWRlODlkNzZjZjc3OTE4NWU1NTk5Yjg5YTdmMGU3YmI3NzNhNmVmZGQ4YzlmIiwiaWF0IjoxNjMyNDE5OTY1LCJuYmYiOjE2MzI0MTk5NjUsImV4cCI6MTYzMjQyMzU2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Bik47xteL-4iLmyVO02B-LUQ1W-Ib0qV8hewXUZa-QGon5Pk96oCrrbxPgrvEryhnQ5JJPr8szsrmagbcK2kFj-BEwx-P6d07l2-2jIRiyzw_B0f7Y4U2wPIsf2UP5oFHPhIX5zFdo6TniFI_Hpauy_DL4tVXPXhgZNQ7IxzCeWMPSU4EPYlhWftazjlWXmBRLx7_a1aYnKzw7E0Vwqjlulvp1TtjSS0erAI_eHliuK_O6zyPbA6SGuiDUeWiQmG3PWjAf8S4lUKd6_Go4wYdmO_LghbAfGHgo8ysZN_Am3vPNmpJz7pUCwOQlyYJGz-knGaxOsZoN5sh1aRWr2bIg"

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
    
})

var displayDog = function(data) {
    //var animalLength = data.animals.length;
    var i = Math.floor(Math.random() * 20) + 1
    console.log(i)
    // console.log(i)
    // var index = ['']
    // var i = data.animals[Math.floor(Math.random() * userRange)]
    // console.log(randomDog)
    
    var photos = data.animals[i].photos[0].small;
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
} 
    
 }

likeBtnEl.addEventListener('click', function(event) {
    event.preventDefault()


    
 
// })

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



// }
petGenders();















