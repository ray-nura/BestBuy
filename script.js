import { getData } from "./getData.js"

const data = getData();
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.fa-search')
const refresh = document.getElementById('refresh');
const wrapper = document.querySelector('.wrapper');
const result = document.querySelector('.result');
const filterContainer = document.querySelector('.filter-container');
const idFilterBrand = document.querySelector('#filter-brand');
const idProductClass = document.getElementsByClassName('idProduct');

//  clearing and refresh page
function refreshPage() {
  wrapper.style.display = 'flex';
  filterContainer.style.display = 'none'
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  while (idFilterBrand.hasChildNodes()) {
    idFilterBrand.removeChild(idFilterBrand.firstChild);
  }
}
function hideInputText(){
  searchInput.value = '';
}

//  function to show Result of search
function resultOfSearch(resultArray) {
  // create DIV element 
  for (let i = 0; i < resultArray.length; i++) {
    const listOfResult = document.createElement('div');
    listOfResult.innerHTML = `
    <div class="category" id="listOfResult">
    <div class="round">
    <img src="${resultArray[i].image}" alt="">
    </div>
    <h4>${resultArray[i].category}</h4>
    <h4>${resultArray[i].year}</h4>
    <h4 class="idProduct">${resultArray[i].idProduct}</h4>
    <h4>Name: ${resultArray[i].nameProduct}</h4>
    <h4>Brand: ${resultArray[i].brand}</h4>
    <h4>${resultArray[i].price}$</h4>
    </div>`
    result.appendChild(listOfResult)
  }
}

//  FUNCTION TO show Filter Container on Left Side

//  !!!! -- ALL BRAND ARRAY IN LEFT CONTAINER --- !!!!
function filterBrandFn() {
  // create an array of Brand Name
  const dataBrand = [];
  for (let i = 0; i < data.length; i++) {
    const brandName = data[i].brand
    if (!dataBrand.includes(brandName)) {
      dataBrand.push(data[i].brand)
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < dataBrand.length; i++) {
    const listOfFilter = document.createElement('div');
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${dataBrand[i]}" >
        <label for="${dataBrand[i]}">${dataBrand[i]}</label><br>
            `
    idFilterBrand.appendChild(listOfFilter)
  }
}
// search By checkbox Brand 
function searchByBrand(event) {
  const item = event.target
  let brandArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText

    for (let i = 0; i < data.length; i++) {
      let brand = data[i].brand.toLowerCase();
      let idPr = data[i].idProduct.toString();

      if (item.id.toLowerCase() === brand && idPrClass === idPr) {
        console.log(data[i].idProduct.toString())
        brandArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(brandArray)
}
//  !!!! -- ALL RESOLUTION ARRAY IN LEFT CONTAINER --- !!!!

// click and show By Category
const showByCategory = (event) => {
  const item = event.target
  wrapper.style.display = 'none'
  result.style.display = 'flex';
  filterContainer.style.display = 'block'
  let categoryArray = [];
  for (let i = 0; i < data.length; i++) {
    if (item.id === data[i].category.toLowerCase()) {
      categoryArray.push(data[i]);
    }
  }
  resultOfSearch(categoryArray);
  filterBrandFn();
}

//  function to show searched Product
function searchProduct() {
  const searchValue = searchInput.value.toLowerCase();
  wrapper.style.display = 'none';
  result.style.display = 'flex';
  filterContainer.style.display = 'block'

  // const newData = data.map(el => {
  //     const newEl = {};
  //     for (const key in el) {
  //         newEl[key] = typeof el[key] === typeof '' ? el[key].toLowerCase() : el[key].toString();
  //     }
  //     return newEl;
  // });

  // search data 
  const searchData = data.filter(el => {
    let valArr = Object.values(el);
    return valArr.toString().toLowerCase().includes(searchValue)
  })
  resultOfSearch(searchData);
  if (searchInput.value === '') {
    refreshPage()
  }
  filterBrandFn();
  setTimeout(hideInputText, 3000)
}
//  add event-Listeners
refresh.addEventListener('click', refreshPage);
wrapper.addEventListener('click', showByCategory);
searchBtn.addEventListener('click', searchProduct);
idFilterBrand.addEventListener('click', searchByBrand);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    searchProduct();
  }
});
searchInput.addEventListener('keyup', function (event) {
  if (searchInput.value === '') {
    refreshPage()
  }
});
