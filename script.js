import { getData } from "./getData.js"

const data = getData();
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.fa-search')
const refresh = document.getElementById('refresh');
const wrapper = document.querySelector('.wrapper');
const result = document.querySelector('.result');
const filterContainer = document.querySelector('.filter-container');
const idFilterContainer = document.querySelector('#filter-container');

//  clearing and refresh page
function refreshPage() {
  wrapper.style.display = 'flex';
  filterContainer.style.display = 'none'
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
}
//  show Filter Container on Left Side
function filterContainerFn() {
  for (let i = 0; i < data.length; i++) {
    const listOfFilter = document.createElement('div');
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${data[i].brand}" >
        <label for="${data[i].brand}">${data[i].brand}</label><br>
            `
    idFilterContainer.appendChild(listOfFilter)
  }
}
// click and show By Category
const showByCategory = (event) => {
  const item = event.target
  wrapper.style.display = 'none'
  result.style.display = 'flex';
  filterContainer.style.display = 'block'
  for (let i = 0; i < data.length; i++) {
    if (item.id === data[i].category.toLowerCase()) {
      const listOfResult = document.createElement('div');
      listOfResult.innerHTML = `
                <div class="category" id="listOfResult">
                <div class="round">
                <img src="${data[i].image}" alt="">
                </div>
                <h4>${data[i].category}</h4>
                <h4>ID# ${data[i].idProduct}</h4>
                <h4>Name: ${data[i].nameProduct}</h4>
                <h4>Brand: ${data[i].brand}</h4>
                <h4>${data[i].price}$</h4>
                </div>
                `
      result.appendChild(listOfResult)
    }
  }
  filterContainerFn()
}


//  function to show searched Product
function searchProduct() {
  const searchValue = searchInput.value.toLowerCase();
  wrapper.style.display = 'none';
  result.style.display = 'flex';
  filterContainer.style.display = 'block'
  console.log(searchValue);

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
  console.log(searchData)
  // create DIV element 
  for (let i = 0; i < searchData.length; i++) {
    const listOfResult = document.createElement('div');
    listOfResult.innerHTML = `
        <div class="category" id="listOfResult">
        <div class="round">
        <img src="${searchData[i].image}" alt="">
        </div>
        <h4>${searchData[i].category}</h4>
        <h4>ID# ${searchData[i].idProduct}</h4>
        <h4>Name: ${searchData[i].nameProduct}</h4>
        <h4>Brand: ${searchData[i].brand}</h4>
        <h4>${searchData[i].price}$</h4>
        </div>`
    result.appendChild(listOfResult)
  }
  if (searchInput.value === '') {
    refreshPage()
  }
}
//  add event-Listeners
refresh.addEventListener('click', refreshPage);
wrapper.addEventListener('click', showByCategory);
searchBtn.addEventListener('click', searchProduct);

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
