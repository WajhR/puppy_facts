// API Info


var keyHeader = "x-api-key";
var apiKeyValue =
  "live_jy5yM47I59NELyCljtxLRgpdPk3QeW6xI4JEfWjoBk4ODdKB3MQ9UyEU7EVF051D";

var header = { keyHeader: apiKeyValue };
var breeds = "https://api.thedogapi.com/v1/breeds";

// Console logs of data pull from API
function fetchDogs() {
  return $.get(breeds).then(function (data) {
    var allDogData = data;
    console.log("---All Dog Data below:");
    console.log(allDogData);
    // console.log("---Name first dog in array below:");
    // console.log(allDogData[0].name);
    // console.log("---id that is affiliated with breed for search purposes");
    // console.log(allDogData[0].id);
    // console.log("---Lifespan of first dog in array below:");
    // console.log(allDogData[0].life_span);
    // console.log("---Temperament of first dog in array below:");
    // console.log(allDogData[0].temperament);
    // console.log("---Image id of first dog in array below:");
    // console.log(allDogData[0].image.id);
    // // console.log("---Image width of first dog in array below:");
    // // console.log(allDogData[0].image.width);
    // // console.log("---Image height of first dog in array below:");
    // // console.log(allDogData[0].image.height);
    // console.log("---Image url of first dog in array below:");
    // console.log(allDogData[0].image.url);
    return allDogData;
  });
} 

var select = document.querySelector(".breed-select");
var breedOption = document.querySelector(".breed-option");
var findSection = document.querySelector("#find");
var dogName = document.querySelector("#dog-name");
var dogUL = document.querySelector("ul");
var lifeSpan = document.querySelector("#life-span");
var bredFor = document.querySelector("#bred-for")
var temperament = document.querySelector("#temperament");
var height = document.querySelector("#height");
var weight = document.querySelector("#weight");
var origin = document.querySelector("#origin");
var dogFactsCard = document.querySelector(".dog-facts-card")
var breedPhoto = document.querySelector(".breed-photo")

dogFactsCard.classList.add("hide-me");
breedPhoto.classList.add("hide-me");

select.addEventListener("change", function (eventOnChild) {
  var element = eventOnChild.target.value;
  var selectDog = parseInt(element);
  compareUserInputToData(selectDog);
});

// Now I am saying that I want to call fetchDogs function and then run populateData with that data that the API gave me
const dogData = fetchDogs().then(function (data) {
  populateDogs(data);
  return data;
});

// Here I am taking all the dog breeds and placing them in a drop-down menu
// https://www.youtube.com/watch?v=0gmDnS7fEBY
var populateDogs = (breeds) => {
  var breedOptions = breeds.map((breed) => {
    var option = document.createElement("option");
    option.text = breed.name;
    // the value of the dog name has to equal the ID I console logged above
    option.value = breed.id;
    // here I take the options I created and append it to the select
    select.appendChild(option);
    return option;
  });
};

// The dog was selected, now I'm trying to match it with the correct index so that I can pull other data about it
//function that takes in a select dog and finds the dog from the array of dog information =>returns select dog
// I tried to run my fetchDog function earlier but couldn't because the page loaded too quickly, so we then ran it again but waiting until it was inside the .then so that it wouldn't run until the API was ready with information to return
function compareUserInputToData(selectDog) {
    // console.log(selectDog);
    fetchDogs().then(function (data) {
    const foundDog = data.find((dog) => dog.id === selectDog);
    console.log("Found dog below:")
    console.log(foundDog)
    dogFactsCard.classList.remove("hide-me");
    breedPhoto.classList.remove("hide-me");
    dogName.innerHTML = foundDog.name;
    dogName.style.fontWeight="bolder";
    lifeSpan.innerHTML = "Life Span: " + foundDog.life_span;
        if (foundDog.bred_for == undefined || ""){
                bredFor.innerHTML = ""
        } else if(foundDog.bred_for == ""){
            bredFor.innerHTML = ""
        } else {
                bredFor.innerHTML = "Bred for: " + foundDog.bred_for;
            }
        if (foundDog.temperament == undefined){
            temperament.innerHTML = ""
        } else { temperament.innerHTML = "Temperament: " + foundDog.temperament;
        }
    height.innerHTML = "Height: " + foundDog.height.imperial + " inches";
    weight.innerHTML = "Weight: " + foundDog.weight.imperial + " lbs";
    // origin.innerHTML = "Origin: " + foundDog.origin;
    
    // breedPhoto.prepend(src = foundDog.image.url);
    breedPhoto.setAttribute("src", foundDog.image.url)
    console.log(foundDog.image.url)

    return foundDog;
    
  }).catch(err=>console.error(err))}
