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
var pastLikes = document.getElementById('pastLikesDiv')
var cancelBtn = document.getElementById('cancel');
var deleteMatch = document.getElementById('')
var dislikeBtnEl = document.getElementById('dislikeBtn');
var likeBtnEl = document.getElementById('likeBtn');
var searchBtnEl = document.getElementById('searchButton');
var descriptionEl = document.getElementById('petDescription');



// Load previously saved matches
var loadMatch = function() {
    
    var previousName = localStorage.getItem('Name');
    var previousPhoto = localStorage.getItem('Photo');
    var previousGender = localStorage.getItem('Gender');
    var previousAge = localStorage.getItem('Age');

    // if(localStorage != null || localStorage != 'null') {

    // $("#pastLikesDiv").append(

    //     `<ul class="collection">
    //     <li class="collection-item avatar">
    //       <img src=${previousPhoto} alt="picture of dog" class="circle">
    //       <span class="title black-text">${previousName}</span>
    //       <p class="black-text">${previousGender}<br>${previousAge}
    //       </p>

    //       <a class="waves-effect waves-light btn modal-trigger" href="#modal3">Contact</a>
    //     <div id="modal3" class="modal">
    //         <div class="modal-content black-text">
    //             <h4>Contact</h4>
    //             <p>Please provide email address and we'll get back to you shortly!</p>
    //             <input></input>
    //         </div>
    //         <div class="modal-footer">
    //             <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
    //         </div>
    //     </div>

    //       <a href="#!" class="secondary-content"><button class="material-icons right" id="cancel">cancel</button></a>
    //     </li>
    //     </ul>`
    //  ) } 
}

///API REFRESH TOKEN
////////////////////////////////////////////////////////////////

var token
var tokenType
var expires

var getOAuth = function() {

fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + petFinderAPIKey + '&client_secret=' + petFinderSecret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);

	// Store token data
	token = data.access_token;
	tokenType = data.token_type;
	expires = new Date().getTime() + (data.expires_in * 1000);

}).catch(function (err) {

    // Log any errors
    console.log('something went wrong', err);

});

}

var makeCall = function () {

	// If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getOAuth().then(function () {
			findDog();
		});
		return;
	}

	// Otherwise, get pets
	console.log('from cache');
	findDog();

};

/////////////////////////////////////////////////////////////////

// Initialization

var i = 0;

var init = function () {

    
    likeBtnEl.addEventListener('click', likeButton);
    searchBtnEl.addEventListener('click', makeCall, false);

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

//Fetch function for the Dog Api
var findDog = function() {
    event.preventDefault();
    petGenders();

    console.log(token)

const url = "https://api.petfinder.com/v2/animals?type=dog&age=" + userAgeEl.value + "&location=" + userCityEl.value + "&size=" + userSizeEl.value + "&gender=" + userGenders

const options = {
    headers: {
        Authorization: "Bearer " + token
    }
}

fetch(url, options)
    .then(response => response.json())
     .then(data => {
         displayDog(data)
         console.log(data)})
    //  displayDog(data)
    
}


//Displays the dogs on screen
var displayDog = function(data) {
    i++;
    
    //foreach(i = 1; i < animalLength; i++){
    //var i = Math.floor(Math.random() * 20) + 1
    console.log(i)
    var photos = data.animals[i].photos[0].medium;
    
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
    
}

}

// When the user clicks the like button, it creates a box in the right container
var likeButton = function() {

    console.log(displayName.textContent)
 $("#pastLikesDiv").append(

    `<ul class="collection">
    <li class="collection-item avatar" id="cancel">
      <img src=${displayPhoto.src} alt="picture of dog" class="circle">
      <span class="title black-text">${displayName.textContent}</span>
      <p class="black-text">${displayGender.textContent}<br>${displayAge.textContent}
      </p>
      
      <a class="waves-effect waves-light btn modal-trigger" href="#modal3">Contact</a>
        <div id="modal3" class="modal">
            <div class="modal-content black-text">
                <h4>Contact</h4>
                <p>Please provide email address and we'll get back to your shortly!</p>
                <input></input>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
            </div>
        </div>
      <a href="#!" class="secondary-content" ><button id="clear" class="material-icons right">cancel</button></a>
    </li>
    </ul>`
 )

    var clear = document.getElementById('clear')
    clear.onlick = function(){
        clear.parentElement.remove();
    }

    $(document).ready(function(){
        $('#modal3').modal();
    });
    //localStorage.setItem('Match', JSON.stringify([{"Name": displayName.textContent, "Photo": displayPhoto.src, "Gender": displayGender.textContent, "Age": displayAge.textContent}]))
    
    localStorage.setItem('Name', displayName.textContent);
    localStorage.setItem('Photo', displayPhoto.src);
    localStorage.setItem("Age", displayAge.textContent);
    localStorage.setItem("Gender", displayGender.textContent);
    

        
        findDog();
        cancelMatch();
 }

 var cancelMatch = function() {

    var clearMatch = document.getElementById('cancel');
    clearMatch.addEventListener('click', function () {

        localStorage.removeItem('Gender')

    })

    
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

dislikeBtnEl.addEventListener('click', findDog);



loadMatch();
petGenders();
init();
makeCall();
cancelMatch();









 







