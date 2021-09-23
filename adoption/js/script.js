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
var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6IjM0MzI4ZTlhMDhmZDM3YTg2Y2M3YWE5ZjAyY2M4M2E0NzNkODEyYmRlMTEzMjJiOGNhNjI1MmEyYWM1ZjAyZTgwNWNjMDM3MWZhMjBiNzUyIiwiaWF0IjoxNjMyMzYxODI0LCJuYmYiOjE2MzIzNjE4MjQsImV4cCI6MTYzMjM2NTQyNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.bYr0lGrRNq9ukkZqB-oEyijybReNbI1cU3PKUzjZtwFYdhOHMQbIBN6RGQV4kpsBqf0N1dAq1FCRQFhegOUF-gSWfvXMEyzU__6OpsSwZ1UhcU_bPOyMe6Y0uNzpglxmcF7DbLQ9E3OkP5oPz4UTcS0kod3Sz_AAsAHn0HZbAQSHIs0J9FbpSeKR_pi4mUq2w4GSKMhDaiI-9aLktbEbhpy4OR7xDeQK85tH8OH4c_G-fkAyZNP2OBwqXuAdx07hiWIPNcZZeUZh9hyhyOePFiQRT1g0l1l7kVguEs1cXMuPwPl6OO8rTv7-sg2UfF3-xTtt46CIs4iwrEflVFCgDQ"

const url = "https://api.petfinder.com/v2/animals?q=type=dog"

const options = {
    headers: {
        Authorization: "Bearer " + bearerToken
    }
}

var petAge = function() {
    var userAges = '';
    return userAges = "";
}

var petGenders = function() {

    var userGenders = '';

    if(userMaleEl.checked) {
        userGenders = 'male';
    }

    if(userFemaleEl.checked) {
        userGenders = "female";
    }

    return userGenders;
}


//Fetch function
searchBtnEl.addEventListener("click", function(event) {
    //event.preventDefault();
    
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
    
    
    // url.animals.search({
    //     status: 'adoptable', //preset to only show adoptable pets
    //     type: 'dog', //preset to only show dogs so works with dogAPI
    //     limit: animalArrayLength,
    //     //variables
    //     location: document.getElementById('user-city').value.trim(),
    //     distance: userRange, //miles range 1-500 default:100
    //     // before: displayPetsBeforeDate(),
    //     age: document.getElementById('user-age').value,
    //     size: document.getElementById('user-size').value,
    //     gender: petGenders(),
    //  })
    document.getElementById('petName').textContent = data.animals[1].name;
    console.log('petName');
    
}

 















