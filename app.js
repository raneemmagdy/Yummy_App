/////////////////////////////////////////////////home//////////////////////////////////////////////////////////////


async function fetchAndDisplayMealDetails(id) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}


async function displayMealDetails() {
    const mealImageContainer = document.getElementById("mealImageContainer");
    const mealDetailsContainer = document.getElementById("mealDetailsContainer");

   
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');

    const mealDetails = await fetchAndDisplayMealDetails(mealId);

    if (mealDetails) {
      
        mealImageContainer.innerHTML = `
            <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="img-fluid">
            <h2>${mealDetails.strMeal}</h2>
        `;

        
        mealDetailsContainer.innerHTML = `
            
            <h4 class="fs-2">Instructions</h4>
            <p>${mealDetails.strInstructions}</p>
            <h4 class="fw-bolder">Area: ${mealDetails.strArea}</h4>
            <h4 class="fw-bolder ">Category: ${mealDetails.strCategory}</h4>
            <h4>Recipes:</h4>
            <div>
                ${getIngredientsList(mealDetails)}
            </div>
            <h4 >Tags: </h4>
            <div class="tags-container py-2">
        ${getTagsButtons(mealDetails.strTags)}
            </div>
            <button class="btn btn-success " onclick="window.open('${mealDetails.strSource}', '_blank')">Source</button>
            <button class="btn btn-danger " onclick="window.open('${mealDetails.strYoutube}', '_blank')">YouTube</button>
        `;
    }
}


function getIngredientsList(mealDetails) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += ` <button style="background-color: #CFF4FC; color:#055160; border: none; padding: 5px 10px; border-radius: 5px; " class=" m-2">${measure} ${ingredient}</button>`;
        }
    }
    return ingredientsList;
}



function getTagsButtons(tags) {
    if (!tags) return "";

    const tagList = tags.split(',');

    return tagList.map(tag => `
    <button style="background-color: #F8D7DA; color:#A22029; border: none; padding: 5px 10px; border-radius: 5px; " class="m-2">${tag.trim()}</button>
    `).join('');
}














async function fetchAndDisplayMeal(id) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        return data.meals[0];
    } catch (error) {
      
        return null;
    }
}


async function displayData() {
    const mealContainer = document.getElementById("mealContainer");
    let displayedMeals = 0;

    for (let id = 52770; id <= 700000; id++) {
        const meal = await fetchAndDisplayMeal(id);

        if (meal !== null) {
            mealContainer.innerHTML += `
                <div class="col-md-3 mt-3">
                    <div class="meal" onclick="redirectToDetails(${meal.idMeal})">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="overlay">
                            <p class="meal-name fw-semibold p-2 fs-2">${meal.strMeal}</p>
                        </div>
                    </div>
                </div>
            `;

            displayedMeals++;

         
            if (displayedMeals === 26) {
                break;
            }
        }
    }
}


function redirectToDetails(mealId) {
    window.location.href = `details.html?id=${mealId}`;
  
}


document.addEventListener("DOMContentLoaded", function () {
    
    if (document.getElementById("mealContainer")) {
        displayData();
    } else if (document.getElementById("mealDetailsContainer")) {
        displayMealDetails();
    }
});







/////////////////////////////////////////////////loading//////////////////////////////////////////////////////////////


$(document).ready(function(){
    $('#loading').fadeOut(1000,function(){
        $('body').css('overflow','visible')
    })
    
})








///////////////////////////////////////////////nav//////////////////////////////////////////////////////////////////////
let menuwidth;
function animateMenu() {
    menuwidth = $('.menu').outerWidth();
  
    if ($('aside').css('left') == '0px') {
      $('aside').animate({ left: `-${menuwidth}` }, 1000);
      $('#bars').removeClass('fa-xmark').addClass('fa-bars');
      $('.option').removeClass('clicked');
    } else {
      $('aside').animate({ left: `0px` }, 1000);
      $('#bars').removeClass('fa-bars').addClass('fa-xmark');
      $('.option').addClass('clicked');
    }
  }
  
  $('#bars').on('click', function () {
    animateMenu();
  });
  
 
  $('.menu ul a').css('opacity', 0);
  
  
  $('.menu ul a').each(function (index) {
    $(this).delay(200 * index).animate({ opacity: 1 }, 1000);
  });
  
  $('.menu ul i').on('click', function () {
    animateMenu();
  });
  
  $('aside li').on('click', function () {
    $('a[href^="#"]').click(function () {
      const href = $(this).attr('href');
      let Sec = $(href).offset().top;
  
      $('html,body').animate({ scrollTop: Sec }, 1000);
    });
  });
  

  //////////////////////////////////////////////////////////////search//////////////////////////////////////////



function redirectToDetailsSearch() {
    window.location.href = `search-content.html`;
  
}



document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const firstLetterInput = document.getElementById("firstLetterInput");
    const mealContainer2 = document.getElementById("mealContainer2");

   
    searchInput.addEventListener("input", handleSearchInput);

   
    firstLetterInput.addEventListener("input", handleSearchInput);

    
    async function handleSearchInput() {
        const searchTerm = searchInput.value.trim();
        const firstLetter = firstLetterInput.value.trim();

      
        await fetchAndDisplayMeals(searchTerm, firstLetter);
    }

  
    async function fetchAndDisplayMeals(searchTerm, firstLetter) {
        try {
            let url = "https://www.themealdb.com/api/json/v1/1/search.php?";
            if (searchTerm) {
                url += `s=${searchTerm}`;
            } else if (firstLetter) {
                url += `f=${firstLetter}`;
            } else {
               
                return;
            }

            const response = await fetch(url);
            const data = await response.json();

            mealContainer2.innerHTML = "";

          
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    const meal = data.meals[i];
                    mealContainer2.innerHTML += `
                        <div class="col-md-3 mt-3">
                            <div class="meal" onclick="redirectToDetails(${meal.idMeal})">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                                <div class="overlay">
                                    <p class="meal-name fw-semibold p-2 fs-2">${meal.strMeal}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            } else {
              
                mealContainer2.innerHTML = "<p>No meals found</p>";
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

   
    function redirectToDetails(mealId) {
        window.location.href = `details.html?id=${mealId}`;
    }
});
////////////////////////////////////////////////////////categories/////////////////////////////////////////////////

function redirectToDetailsCategory() {
    window.location.href = `categoryt.html`;
  
}

function redirectToDetailsCategorymeals() {
    window.location.href = `categoryMeal.html`;
  
}
async function fetchAndDisplayCategory(id) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await response.json();
        return data.categories[id - 1];
    } catch (error) {
        return null;
    }
}

async function displayCategories() {
    const categoryContainer = document.getElementById("categoryContainer");

    for (let id = 1; id <= 14; id++) { 
        const category = await fetchAndDisplayCategory(id);
        const truncatedDescription = truncateWords(category.strCategoryDescription, 20);
        if (category !== null) {
            categoryContainer.innerHTML += `
                <div class="col-md-3 mt-3">
                    <div class="category" >
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory} " />
                        <div class="overlay" onclick="fetchAndDisplayMealsCategories('${category.strCategory}');$(categoryContainer).hide();" >
                            <p class="category-name fw-semibold  fs-2">${category.strCategory}</p>
                            <p class="category-description">${truncatedDescription}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}
function truncateWords(text, numWords) {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ') + (words.length > numWords ? '....' : '');
}
document.addEventListener("DOMContentLoaded", function () {
    displayCategories();
   
});



async function fetchAndDisplayMealsCategories(category) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        const mealContainerCategory = document.getElementById("mealContainerCategory");
      

        if (data.meals) {
            for (let i = 0; i < 20; i++) {
                const meal = data.meals[i];
                mealContainerCategory.innerHTML += `
                    <div class="col-md-3 mt-3">
                        <div class="meal-category" onclick="redirectToDetails(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="overlay-category">
                                <p class="meal-name-category fw-semibold p-2 fs-2">${meal.strMeal}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            
            mealContainerCategory.innerHTML = "<p>No meals found for this category</p>";
        }
    } catch (error) {
        console.log("Fetch Error:", error);
    }
   

}


////////////////////////////////////////////////////////Area/////////////////////////////////////////////////
function redirectToDetailsArea() {
    window.location.href = `Area.html`;
}



async function fetchAndDisplayAreas() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();

        const areaContainer = document.getElementById("areaContainer");

        if (data.meals) {
            data.meals.forEach(area => {
                areaContainer.innerHTML += `
                    <div class="col-md-3">
                        <div class="area-item" onclick="fetchAndDisplayMealsArea('${area.strArea}');$(areaContainer).hide();" >
                            <i class="fa-solid fa-house-laptop fa-3x"></i>
                            <span class="fs-3">${area.strArea}</span>
                        </div>
                    </div>
                `;
            });
        } else {
            console.error("No areas found.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayAreas();
});


async function fetchAndDisplayMealsArea(area) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await response.json();

        const mealContainerArea = document.getElementById("mealContainerArea");

        
        if (data.meals) {
            for (let i = 0; i < 20; i++) {
                const meal = data.meals[i];
                mealContainerArea.innerHTML += `
                    <div class="col-md-3 mt-3">
                        <div class="meal-Area" onclick="redirectToDetails(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="overlay-Area">
                                <p class="meal-name-Area fw-semibold p-2 fs-2">${meal.strMeal}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            
            mealContainerArea.innerHTML = "<p>No meals found for this Area</p>";
        }
    } catch (error) {
        console.log("Fetch Error:", error);
    }


}




///////////////////////////////////////////////////////////Ingredients///////////////////////////////////////////////////////////
function redirectToDetailsIngredients() {
    window.location.href = `Ingredients.html`;
}

async function fetchAndDisplayIngredients() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const data = await response.json();

        const ingredientContainer = document.getElementById("ingredientContainer");

        if (data.meals) {
            data.meals.forEach(ingredient => {
                const truncatedDescription = truncateWords(ingredient.strDescription, 15);

                ingredientContainer.innerHTML += `
                    <div class="col-md-3  ">
                        <div class="ingredient-item text-center  " onclick="fetchAndDisplayMealsByIngredient('${ingredient.strIngredient}');$(ingredientContainer).hide();">
                            <i class="fa-solid fa-drumstick-bite fa-4x text-white "></i>
                            <p class="fs-3 text-white fw-semibold">${ingredient.strIngredient}</p>
                            <span class="text-white ">${truncatedDescription}</span>
                        </div>
                    </div>
                `;
            });
        } else {
            console.error("No ingredients found.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function truncateWords(text, numWords) {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ') + (words.length > numWords ? '...' : '');
}

document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayIngredients();
});

async function fetchAndDisplayMealsByIngredient(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();

        const mealContainerindredient = document.getElementById("mealContainerindredient");
        if (data.meals) {
            for (let i = 0; i < 20; i++) {
                const meal = data.meals[i];
                mealContainerindredient.innerHTML += `
                    <div class="col-md-3 mt-3">
                        <div class="meal-Ingredient" onclick="redirectToDetails(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="overlay-Ingredient">
                                <p class="meal-name-Ingredient fw-semibold p-2 fs-2">${meal.strMeal}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            
            mealContainerindredient.innerHTML = "<p>No meals found for this Ingredient</p>";
        }
    } catch (error) {
        console.log("Fetch Error:", error);
    }


}

///////////////////////////////////////////////////////////contact Us///////////////////////////////////////////////////////////
function redirectToDetailscontactUs() {
    window.location.href = `contactUs.html`;
}


const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const passwordError = document.getElementById('passwordError');
const prepasswordError = document.getElementById('prepasswordError');
const phoneError = document.getElementById('phoneError');
$(nameError).hide()
$(emailError).hide()
$(ageError).hide()
$(passwordError).hide()
$(prepasswordError).hide()
$(phoneError).hide()

let Ntrue=false;let Etrue=false;let Atrue=false;let phtrue=false;let ptrue=false;let retrue=false;
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const prepasswordInput = document.getElementById('prepassword');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submitButton');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
ageInput.addEventListener('input', validateAge);
passwordInput.addEventListener('input', validatePassword);
prepasswordInput.addEventListener('input', validatePrepassword);
phoneInput.addEventListener('input', validatePhone);

function validateName() {
    
    const nameRegex = /^[A-Za-z\s]{3,}$/;

    if (nameRegex.test(nameInput.value)) {
        nameError.textContent = '';
        $(nameError).hide()
        Ntrue=true;
    } else {
        nameError.textContent = 'Special characters and numbers not allowed';
        $(nameError).show()
    }
    check()
    
}

function validateEmail() {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value)) {
        emailError.textContent = '';
        $(emailError).hide()
        Etrue=true;
      
    } else {
        emailError.textContent = 'Email not valid (e.g., example@domain.com)';
        $(emailError).show()
    }
    check()
    
}

function validateAge() {
    
    if (ageInput.value > 0) {
        ageError.textContent = '';
        $(ageError).hide()
        Atrue=true;
      
    } else {
        ageError.textContent = 'Enter valid age';
        $(ageError).show()
    }
   
    check()
}

function validatePassword() {
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (passwordRegex.test(passwordInput.value)) {
        passwordError.textContent = '';
        $(passwordError).hide()
        ptrue=true;
      
    } else {
        passwordError.textContent = 'Enter valid password (Minimum eight characters, at least one letter and one number)';
        $(passwordError).show()
    }
   
    check()
}

function validatePrepassword() {
    

    if (prepasswordInput.value === passwordInput.value) {
        prepasswordError.textContent = '';
        $(prepasswordError).hide()
        retrue=true;
      
    } else {
        prepasswordError.textContent = 'Enter valid repassword';
        $(prepasswordError).show()
    }
   
    check()
}

function validatePhone() {
    
    const phoneRegex = /^[0-9]{11}$/;
    
    if (phoneRegex.test(phoneInput.value)) {
        phoneError.textContent = '';
        $(phoneError).hide()
        phtrue=true;
      
    } else {
        phoneError.textContent = 'Enter a valid 10-digit phone number';
        $(phoneError).show()
    }
   
    check()
    
}

function check(){
// console.log(Ntrue,Etrue,Atrue,phtrue,ptrue,retrue)
if(Ntrue==true&&Etrue==true&&Atrue==true&&phtrue==true&&ptrue==true&&retrue==true )submitButton.disabled = false;
}

