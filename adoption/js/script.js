//The Dog Api
//https://api.thedogapi.com/v1/breeds/search?q=
//api key = "6c09c349-113e-4625-8c2d-219f68ebc17d"

//PetFinder API Info 
//https://api.petfinder.com/v2/animals?type=dog
const dogAPIkey = 'c8cd1d33-b825-4d0b-aeca-b35206aec201';
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
var displayPhoto =document.getElementById('petPhoto');


//! HTML ELEMENTS
var dislikeBtnEl = document.getElementById('dislikeBtn');
var likeBtnEl = document.getElementById('likeBtn');
var searchBtnEl = document.getElementById('searchButton');
var descriptionEl = document.getElementById('petDescription');

//! GLOBAL VARIABLES
const maxPastLikes = 10; //max amount of likes saved and displayed on past likes tab &&keep low because each save is a single api request
const animalArrayLength = 40; //amount the api gets per call and the ideal length the pet array should float around

var arrayOfPetsInQueue = []; //array of pets to go through deletes index 0 everytime it goes to next pet
var currentPetId = 0; //id of currently displayed pet INTEGER
var userRange = 50; //miles range 1-500 default:100 (gets bigger if no animals are found in area)
var petFinderClient = new petfinder.Client({ //petfinder api object (called in 2 places so up here)
    apiKey: petFinderAPIKey, //private api key (required)
    secret: petFinderSecret //private secret key (required)
});
console.log(petFinderClient)


// Fetch Request
// Will need to create a refresh token of some sort // Further Research
var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6IjUyZWJhYTc1ZjhlMGNmYTFkZjIzNWUxMWI1YmE2ZjljOTgyNzY2ZjNhNDVmOTBiZDBiNjQyNTljNDRiOWFiYjU4Y2RiZDU4YjEyNGFiYmNmIiwiaWF0IjoxNjMyMzY1NDc4LCJuYmYiOjE2MzIzNjU0NzgsImV4cCI6MTYzMjM2OTA3OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.aSeMNexzkCHg4-khcgjh02Fa6UnJqcUjOdvAcrAYguRNLBeEoekzLGVbsOS8hq4teXsKay-rfBrJqAc-LPPh_wjAUxGwOMUvVsNtziMPEvmP9JIORp2bJ7qTXm6sM8Hj0fLKG6u5tdmHT2Xq6_LaR69Jf9CM2-drW9JM9-I75FAaSBA_PvIG2wjEbiWp-5tT8PexKO9Ca1FhJz6BrFTjF9MCBTO7ynsHArQjHDJULcu3JatYmkKLV1aPvrrTKfghsI8H1r2YBxeVJUF_oItPOi7p6hv_E3Yb0VEA08Ji0bw5aaFVdJj3mFkbAzqdB9y--MIO6Y9V4pU6SDgaSNPN7A"

const url = "https://api.petfinder.com/v2/animals?q=type=dog"

const options = {
    headers: {
        Authorization: "Bearer " + bearerToken
    }
}

var petGenders = function() {

    var userGenders = '';

    if(userMaleEl.checked) {
        userGenders = 'male';
    }

    if(userFemaleEl.checked) {
        userGenders = "female";
    }
    console.log(userGenders);
    return userGenders;
    
}


//Fetch function
searchBtnEl.addEventListener("click", function(event) {
    //event.preventDefault();
    
    petGenders();
    petAge();

    if(userCityEl.value == ""){
// Tried creating modal to alert the user to enter a value
        $("#searchButton").after(
            
            `<div id="modal1" class="modal">
            <div class="modal-content">
              <h4>Modal Header</h4>
              <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>`)
        
    }

fetch(url, options)
    .then(response => response.json())
    .then((data) => {
     displayDog(data)
    console.log(data)
    });
})

var displayDog = function(data) {
    // var index = ['']
    // var randomDog = data.animals[Math.floor(Math.random() * userRange)]
    // console.log(randomDog)
        url.search({
        //type: 'dog',
        //variables
        location: document.getElementById('user-city').value.trim(),
        distance: userRange, //miles range 1-500 default:100
        // before: displayPetsBeforeDate(),
        age: document.getElementById('user-age').value,
        size: document.getElementById('user-size').value,
        gender: petGenders(),
     })
    //displayPhoto.src = data.randomDog.photos[0].small;
   // displayName.textContent = randomDog.name;
  //  displayGender.textContent = randomDog.gender;
    displayAge.textContent = data.animals[1].age;
    displaySize.textContent = data.animals[1].size;
    displayDesc.textContent = data.animals[1].description;
   
    
    
}

var dogBreed = function () {



}















