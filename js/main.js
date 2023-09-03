let rowData = $('#rowData');
let areaData = $('#areaData');
let area = $('.area');
let Ingredients = $('#Ingredients');
let searchBars =$('#search')

function closeSideNav(){
    let boxWidth= $('.nav-content').outerWidth()
    $('.nav').css({left:`-${boxWidth}px`,transition:'all 1s'})
}
closeSideNav();
$(window).ready(()=>{
    $('#loading').slideUp(4000,function(){
        $('body').css('overflow-y','scroll');
    })
    })
    getCategoryMeals('beef');
// button up
$('#btn-up').click(function(){
    // $(window).scrollTop(50)
    $('body,html').animate({
    scrollTop:0
    },3000)
    })

$('.nav i').click(function(){
    let position = $('.nav').offset().left
    let boxWidth= $('.nav-content').outerWidth()
    if(position === 0){
    $('.nav').css({left:`-${boxWidth}px`,transition:'all 1s'})
    }else{
    $('.nav').css({left:`0px`,transition:'all 1s'})
    // $('.nav').css({left:`0px`,transition:'all 1s 200ms'})
    }
    })

  function  showSearchInputs(){
    rowData.html('')
    // areaData.html('')
    // Ingredients.html('')
    let search =`
    <input type="text " class="form-control col-md-5 bg-transparent text-white mx-1" placeholder="Search by name" onkeyup="searchByName(this.value)">
    <input type="text " class="form-control col-md-5  bg-transparent text-white mx-1" placeholder="Search by First Letter" onkeyup="searchByFirstLetter(this.value)">
    `
searchBars.html(search)
  }


  async function searchByName(name) {
    // closeSideNav()
    // rowData.innerHTML = ""
    $("#loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $("#loading").fadeOut(300)

}

async function searchByFirstLetter(letter) {
    // closeSideNav()
    //  rowData.html('');
    $("#loading").fadeIn(300)

    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $("#loading").fadeOut(300)
}



    async function getCategories() {
         rowData.html('');
         area.html('');
          searchBars.html('')
        //  $("#loading").fadeIn(300)
        // searchContainer.innerHTML = "";
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()
    
         displayCategories(response.categories)
        // $("#loading").fadeOut(300)
        // console.log(response);
    
    }

       
    function displayCategories(arr) {
        let categories = "";

            for (let i = 0; i < arr.length; i++) {
                categories += `
                <div class="col-md-3 rounded-2 my-4 " onclick="getCategoryMeals('${arr[i].strCategory}')">
                  <div class="meal  position-relative rounded-2 cursor-pointer overflow-hidden rounded" >
                  <img src="${arr[i].strCategoryThumb}" alt="meal" class="w-100 overflow-hidden position-relative rounded-2 cursor-pointer">
                  <div class="layer w-100 h-100 position-absolute rounded-2 d-flex align-items-center p-2">
                      <p class="meal-title">${arr[i].strCategory}</p>
                  </div>
                  </div>
              </div>
        
                `
            }

             rowData.html(categories) 
            //  console.log(categories)
             document.getElementById('rowData')
             $(function() {
                document.getElementsByClassName('row').innerHTML=categories
                // console.log(document.getElementsByClassName('row'))
            });
             
        
    }
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $("#loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $("#loading").fadeOut(300)

}



async function getArea() {
      rowData.html('');
       searchBars.html('');
    //  $("#loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()

     displayArea(response.meals)
    // $("#loading").fadeOut(300)

}

function displayArea(arr) {
    let areas = "";

        for (let i = 0; i < arr.length; i++) {
            areas += `
            <div class="col-md-3 d-flex flex-column align-items-center my-3 area" onclick="getAreaMeals('${arr[i].strArea}')">
        <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 640 512"><style>svg{fill:#ffffff}</style><path d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z"/></svg>
        <h2 class="text-white">${arr[i].strArea}</h2>
      </div>
    
            `
        }

        rowData.html(areas) 
         console.log(areas)
         document.getElementById('rowData')
  
}

async function getAreaMeals(area) {
    rowData.html('')
    // areaData.html('')
     $("#loading").fadeIn(300)
// console.log(area)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

     displayMeals(response.meals.slice(0, 20));
     $("#loading").fadeOut(300)

}

function displayMeals(arr) {
    let meals = "";

        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i])
            meals += `
            <div class="col-md-3 rounded-2 my-4" onclick="getMealDetails('${arr[i].idMeal}')">
              <div class="meal  position-relative rounded-2 cursor-pointer overflow-hidden rounded" >
              <img src="${arr[i].strMealThumb}" alt="meal" class="w-100 overflow-hidden position-relative rounded-2 cursor-pointer">
              <div class="layer w-100 h-100 position-absolute rounded-2 d-flex align-items-center p-2">
                  <p class="meal-title">${arr[i].strMeal}</p>
              </div>
              </div>
          </div>
    
            `
        }
       
         rowData.html(meals) 
         document.getElementById('rowData')
         $(function() {
            document.getElementsByClassName('row').innerHTML=meals
        });
         
    
}

async function getIngredients() {
    rowData.innerHTML = ""
    rowData.html('')
    areaData.html('')
     searchBars.html('');
  //  $("#loading").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()

    displayIng(response.meals.slice(0, 20))
  // $("#loading").fadeOut(300)
}

function displayIng(arr) {
    let Ingredient = "";

        for (let i = 0; i < arr.length; i++) {
             let desc=arr[i].strDescription.substring(0,100);
            Ingredient += `
            <div class="col-md-3 d-flex flex-column align-items-center justify-content-center text-center my-4 text-white" onclick="getIngredientsMeals('${arr[i].strIngredient}')">
      <i class="fa fa-solid fa-drumstick-bite fa-4x"></i>
      <h2 class="text-white">${arr[i].strIngredient}</h2>
       <p class="lead text-white">${desc}</p>
    
    </div>
            `
        }

        rowData.html(Ingredient) 
         console.log(Ingredient)
  
}
async function getIngredientsMeals(ingr){
    rowData.html('')
    areaData.html('')
    // Ingredients.html('')
     searchBars.html('')
    // $("#loading").fadeIn(300)
console.log(area)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`)
    response = await response.json()

console.log(response.meals)
     displayMeals(response.meals.slice(0, 20))
    // $("#loading").fadeOut(300)

}


async function getMealDetails(mealID) {
    rowData.html('')
    areaData.html('')
    // Ingredients.html('')
     searchBars.html('')
    $("#loading").fadeIn(300)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
// console.log(respone)
displayMealDetail(respone.meals[0])
    $("#loading").fadeOut(300)

}

function displayMealDetail(arr){
    rowData.html('');
    areaData.html('');
    // Ingredients.html('');
     searchBars.html('');
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }

    let tags = arr.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1 tag-list">${tags[i]}</li>`
    }
    let detail=`
    <div class="col-md-4 text-white">
              <img class="w-100 rounded-3" src="${arr.strMealThumb}" alt="">
                  <h2 class="text-white"> ${arr.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2 class="text-white">Instructions</h2>
              <p class="text-white">${arr.strInstructions}</p>
              <h3 class="text-white"><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
              <h3 class="text-white"><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
              <h3 class="text-white">Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap text-white">
              ${ingredients}
              </ul>
              
              <h3 class="text-white">Tags :</h3>
             <ul class="list-unstyled d-flex g-3 flex-wrap text-white">
             ${tagsStr}
             </ul>    
              </ul>

              <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
    `
rowData.html(detail)
}
function showContacts() {
    rowData.html('');
    // areaData.html('');
    // Ingredients.html('');
    searchBars.html('');
    rowData.html(
        `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6 my-3">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6 my-3">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6 my-3">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6 my-3">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6 my-3">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6 my-3">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    ) 
    submitBtn = document.getElementById("submitBtn")


  
}

