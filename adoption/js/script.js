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
var bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJSY1hZaDRtRHcyYjdZOHZkdGlrTnFmQXE0RG5sVGpwRlh0dHdHSXhNQlNHUVdCSkJOeCIsImp0aSI6ImQzYjU1MzFiZGM2OTE2YTg4ZWY3NDAxYTFkNDQ1NDVlNDFiZmYxM2FmMzJkM2RkNzY3NjFkMjVjNzBkOGQ0YjEzMjk1MmQwYjM1MzU3ZmM3IiwiaWF0IjoxNjMyMzUwNzM3LCJuYmYiOjE2MzIzNTA3MzcsImV4cCI6MTYzMjM1NDMzNywic3ViIjoiIiwic2NvcGVzIjpbXX0.pZnI1WSxq0zioONkz1NhHpasaVK6cG97lwXdZa51RRMRcKolonA0ScGVjLNsbGPM99a_yXs90RE6OCo0qYV7SS2jG2DtL8ZAoOrgBg2A3S_u_WyS2msvuad30aCnNOtXgaEzvXb6K8Vz8tZ_-cpcj5krXI-eNl8YIuMdU_CfpUHpQthJwtFY8b8LLVqqb55MoV8BZz5j6vJtBSiY-cs12wE6p0M_C8bsda3ClL0dKZCsSXv3mraaQRPTyVscwQDNnU_RJQqPpJgLpBxgyXar9_t8E6LQ3PAm_Eae1Kbz2kOHEouCMTG-D0clZzSYYCIRnD0SwuMfbIoSTv85utkxmA"

const url = "https://api.petfinder.com/v2/animals?type=dog"

const options = {
    headers: {
        Authorization: "Bearer " + bearerToken
    }
}

var petAge = function() {
    var userAges = '';
    return userAges = "";
}

var petSelections = function() {

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
    .then((data) => console.log(data));
})
















