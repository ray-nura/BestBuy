import { getData } from "./getData.js";

const data = getData();
const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector(".fa-search");
const refresh = document.getElementById("refresh");
const wrapper = document.querySelector(".wrapper");
const flashSale = document.querySelector(".winterHoliday");
const result = document.querySelector(".result");
const product = document.querySelector(".product");
const idProductClass = document.getElementsByClassName("idProduct");
const filterContainer = document.querySelector(".filter-container");
const idFilterBrand = document.querySelector("#filter-brand");
const price = document.querySelector("#price");
const displayTypeDiv = document.querySelector("#filter-display-type");
const storageDiv = document.querySelector('#storageType');
const yearDiv = document.querySelector("#years");
const colorsDiv = document.querySelector("#colors");
const screenSizeDiv = document.querySelector("#screenSize");
const screenResolutionDiv = document.querySelector("#screenResolution");


//  clearing and refresh page
function refreshPage() {
  wrapper.style.display = "flex";
  filterContainer.style.display = "none";
  flashSale.style.height = '';
  flashSale.style.paddingBottom = '';
  let isAllCheck = false;
  Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => el.checked = isAllCheck);
  cleanCheckBbox();
  cleanMainDiv();
}
function cleanMainDiv() {
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  while (product.hasChildNodes()) {
    product.removeChild(product.firstChild);
  }
}
function cleanCheckBbox() {
  while (idFilterBrand.hasChildNodes()) {
    idFilterBrand.removeChild(idFilterBrand.firstChild);
  }
  while (storageDiv.hasChildNodes()) {
    storageDiv.removeChild(storageDiv.firstChild);
  }
  while (displayTypeDiv.hasChildNodes()) {
    displayTypeDiv.removeChild(displayTypeDiv.firstChild);
  }
  while (yearDiv.hasChildNodes()) {
    yearDiv.removeChild(yearDiv.firstChild);
  }
  while (colorsDiv.hasChildNodes()) {
    colorsDiv.removeChild(colorsDiv.firstChild);
  }
  while (screenSizeDiv.hasChildNodes()) {
    screenSizeDiv.removeChild(screenSizeDiv.firstChild);
  }
  while (screenResolutionDiv.hasChildNodes()) {
    screenResolutionDiv.removeChild(screenResolutionDiv.firstChild);
  }
}
function callAllFilter() {
  filterBrandFn();
  storageTypeFn();
  displayType();
  searchByYear();
  colorFn();
  screenSizeFn();
  screenResolutionFn();
}
function hideInputText() {
  searchInput.value = "";
}
//  function to show Result of search
function resultOfSearch(resultArray) {
  // create DIV element
  for (let i = 0; i < resultArray.length; i++) {
    const listOfResult = document.createElement("div");
    listOfResult.className = "resultOfSearch";
    listOfResult.id = `${resultArray[i].idProduct}`;
    listOfResult.innerHTML = `
    <img src="${resultArray[i].image}" alt="">
    <div class="info">
    <h4>${resultArray[i].category.toUpperCase()}</h4>
    <h4>${resultArray[i].year}</h4>
    <h4 class="idProduct">${resultArray[i].idProduct}</h4>
    <h4>Name: ${resultArray[i].nameProduct}</h4>
    <h4>Brand: ${resultArray[i].brand.big()}</h4><br>
    <h4>Model: ${resultArray[i].modelNumber}</h4><br>
    <h4>$${resultArray[i].price.toString().big()}</h4>
    </div>
    <button class="btn" id="${resultArray[i].idProduct}">Shop Now</button>
    `;
    result.appendChild(listOfResult);
  }
}

//  FUNCTION TO show Filter Container on Left Side

//  !!!! -- ALL BRAND ARRAY IN LEFT CONTAINER --- !!!!
function filterBrandFn() {
  // create an array of Brand Name
  const dataBrand = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const brandName = data[i].brand;
      let idPr = data[i].idProduct.toString();
      if (!dataBrand.includes(brandName) && idPrClass === idPr) {
        dataBrand.push(data[i].brand);
      }
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < dataBrand.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${dataBrand[i]}" >
        <label for="${dataBrand[i]}" id="${dataBrand[i]}">${dataBrand[i]}</label><br>
            `;
    idFilterBrand.appendChild(listOfFilter);
  }
}
// search By checkbox Brand
function searchByBrand(event) {
  const item = event.target;
  console.log(item);
  let brandArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      let brand = data[i].brand;
      let idPr = data[i].idProduct.toString();

      if (item.id === brand && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        brandArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(brandArray);
  cleanCheckBbox();
  callAllFilter();
}
//SearchByYear
function searchByYear() {
  const dataYear = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const year = data[i].year;
      let idPr = data[i].idProduct.toString();
      if (!dataYear.includes(year) && idPrClass === idPr) {
        dataYear.push(data[i].year);
      }
    }
  }
  let yearsOrder = dataYear;
  yearsOrder.sort(function (a, b) {
    return a - b
  });
  //  console.log(yearsOrder)
  for (let i = 0; i < dataYear.length; i++) {
    const listOfYear = document.createElement("div");
    listOfYear.innerHTML = `
        <input type="checkbox" id="${dataYear[i]}" >
        <label for="${dataYear[i]}" id="${dataYear[i]}">${dataYear[i]}</label><br>
            `;
    yearDiv.appendChild(listOfYear);
  }
}
function filterByYear(event) {
  const item = event.target;
  // console.log(item);
  let yearArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      // let brand = data[i].brand.toLowerCase();
      let idPr = data[i].idProduct.toString();
      let yearData = data[i].year.toString();

      if (idPrClass === idPr && yearData === item.id) {
        console.log(data[i].year);
        yearArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(yearArray);
  cleanCheckBbox();
  callAllFilter();
}
//  Nigina ------******
function storageTypeFn() {
  const storageTypeArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const brandName = data[i].brand;
      let idPr = data[i].idProduct.toString();
      const storageType = data[i].storageType;
      if (!storageTypeArray.includes(storageType) && idPrClass === idPr) {
        storageTypeArray.push(data[i].storageType);
      }
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < storageTypeArray.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${storageTypeArray[i]}" >
        <label for="${storageTypeArray[i]}" id="${storageTypeArray[i]}">${storageTypeArray[i]}</label><br>
            `;
    storageDiv.appendChild(listOfFilter);
  }
}
function searchByStorageType(event) {
  const item = event.target;
  console.log(item);
  let storageN = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    console.log(idPrClass)
    for (let i = 0; i < data.length; i++) {
      let storageT = data[i].storageType;
      let idPr = data[i].idProduct.toString();

      if (item.id === storageT && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        storageN.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(storageN);
  cleanCheckBbox();
  callAllFilter();
}
//  Gulzat ----********
function displayType() {
  const displayTypeArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const displayType = data[i].displayType;
      let idPr = data[i].idProduct.toString();
      if (!displayTypeArray.includes(displayType) && idPrClass === idPr) {
        displayTypeArray.push(data[i].displayType);
      }
    }
  }

  for (let i = 0; i < displayTypeArray.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${displayTypeArray[i]}" >
        <label for="${displayTypeArray[i]}" id="${displayTypeArray[i]}">${displayTypeArray[i]}</label><br>
            `;
    displayTypeDiv.appendChild(listOfFilter);
  }
}
function searchByDisplayType(event) {
  const item = event.target;
  console.log(item);
  let displayTypeArray = [];
  for (let i = 0; i < idProductClass.length; i++) {
    let idPrClass = idProductClass[i].innerText;
    console.log(idPrClass)
    for (let i = 0; i < data.length; i++) {
      let displayType = data[i].displayType;
      let idPr = data[i].idProduct.toString();

      if (item.id === displayType && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        displayTypeArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(displayTypeArray);
  cleanCheckBbox();
  callAllFilter();
}
//  !!!! -- ALL price  ARRAY IN LEFT CONTAINER --- !!!!
function searchByPrice(event) {
  const item = event.target;
  let low = 0;
  let high = 0;
  switch (item.id) {
    case "price75":
      low = 50;
      high = 74.99;
      break;
    case "price100":
      low = 75;
      high = 99.99;
      break;
    case "price150":
      low = 100;
      high = 149.99;
      break;
    case "price200":
      low = 150;
      high = 199.99;
      break;
    case "price250":
      low = 200;
      high = 249.99;
      break;
    case "price500":
      low = 250;
      high = 499.99;
      break;
    case "price750":
      low = 500;
      high = 749.99;
      break;
    case "price1000":
      low = 750;
      high = 999.99;
      break;
    case "price1250":
      low = 1000;
      high = 1249.99;
      break;
    case "price1500":
      low = 1250;
      high = 1499.99;
      break;
    case "price2000":
      low = 1500;
      high = 1999.99;
      break;
    case "price2500":
      low = 2000;
      high = 2499.99;
      break;
    case "price3000":
      low = 2500;
      high = 2999.99;
      break;
    default:
      low = 3000;
      high = 50000000;
      break;
  }
  let priceArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;

    for (let i = 0; i < data.length; i++) {
      let idPr = data[i].idProduct.toString();
      let priceData = data[i].price;

      if (idPrClass === idPr && low <= priceData && priceData < high) {
        priceArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(priceArray);
  cleanCheckBbox();
  callAllFilter();
}
//  !!!! -- ALL RESOLUTION ARRAY IN LEFT CONTAINER --- !!!!
function screenResolutionFn() {
  // create an array of Brand Name
  const dataArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const filterName = data[i].screenResolution;
      let idPr = data[i].idProduct.toString();
      if (!dataArray.includes(filterName) && idPrClass === idPr) {
        dataArray.push(data[i].screenResolution);
      }
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < dataArray.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${dataArray[i]}" >
        <label for="${dataArray[i]}" id="${dataArray[i]}">${dataArray[i]}</label><br>
            `;
    screenResolutionDiv.appendChild(listOfFilter);
  }
}
// search By checkbox Brand
function searchByScrResolution(event) {
  const item = event.target;
  console.log(item);
  let filteredArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      let filterName = data[i].screenResolution;
      let idPr = data[i].idProduct.toString();

      if (item.id === filterName && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        filteredArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(filteredArray);
  cleanCheckBbox();
  callAllFilter();
}
function colorFn() {
  // create an array of Brand Name
  const dataArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const filterName = data[i].color;
      let idPr = data[i].idProduct.toString();
      if (!dataArray.includes(filterName) && idPrClass === idPr) {
        dataArray.push(data[i].color);
      }
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < dataArray.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${dataArray[i]}" >
        <label for="${dataArray[i]}" id="${dataArray[i]}">${dataArray[i]}</label><br>
            `;
    colorsDiv.appendChild(listOfFilter);
  }
}
// search By checkbox Brand
function searchByColor(event) {
  const item = event.target;
  console.log(item);
  let filteredArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      let filterName = data[i].color;
      let idPr = data[i].idProduct.toString();

      if (item.id === filterName && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        filteredArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(filteredArray);
  cleanCheckBbox();
  callAllFilter();
}
function screenSizeFn() {
  // create an array of Brand Name
  const dataArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      const filterName = data[i].screenSize;
      let idPr = data[i].idProduct.toString();
      if (!dataArray.includes(filterName) && idPrClass === idPr) {
        dataArray.push(data[i].screenSize);
      }
    }
  }
  // show in the left container array of Brand Name
  for (let i = 0; i < dataArray.length; i++) {
    const listOfFilter = document.createElement("div");
    listOfFilter.innerHTML = `
        <input type="checkbox" id="${dataArray[i]}" >
        <label for="${dataArray[i]}" id="${dataArray[i]}">${dataArray[i]}</label><br>
            `;
    screenSizeDiv.appendChild(listOfFilter);
  }
}
// search By checkbox 
function searchByScrSize(event) {
  const item = event.target;
  console.log(typeof item.id);
  let filteredArray = [];
  for (let j = 0; j < idProductClass.length; j++) {
    let idPrClass = idProductClass[j].innerText;
    for (let i = 0; i < data.length; i++) {
      let filterName = data[i].screenSize.toString();
      let idPr = data[i].idProduct.toString();
      if (item.id === filterName && idPrClass === idPr) {
        console.log(data[i].idProduct.toString());
        filteredArray.push(data[i]);
      }
    }
  }
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }
  resultOfSearch(filteredArray);
  cleanCheckBbox();
  callAllFilter();
} 1
// click and show By Category MAIN !!!
const showByCategory = (event) => {
  const item = event.target;
  wrapper.style.display = "none";
  result.style.display = "grid";
  filterContainer.style.display = "block";
  flashSale.style.height = '200px'
  flashSale.style.paddingBottom = '20px'
  let categoryArray = [];
  for (let i = 0; i < data.length; i++) {
    if (item.id === data[i].category.toLowerCase()) {
      categoryArray.push(data[i]);
    }
  }
  resultOfSearch(categoryArray);
  callAllFilter();
};

//  function to show searched Product
function searchProduct() {
  const searchValue = searchInput.value.toLowerCase();
  wrapper.style.display = "none";
  result.style.display = "grid";
  filterContainer.style.display = "block";
  flashSale.style.height = '200px';
  flashSale.style.paddingBottom = '20px';

  // search data
  const searchData = data.filter((el) => {
    let valArr = Object.values(el);
    return valArr.toString().toLowerCase().includes(searchValue);
  });
  cleanCheckBbox();
  cleanMainDiv();
  resultOfSearch(searchData);
  setTimeout(hideInputText, 3000);
  callAllFilter();
  // const newData = data.map(el => {
  //     const newEl = {};
  //     for (const key in el) {
  //         newEl[key] = typeof el[key] === typeof '' ? el[key].toLowerCase() : el[key].toString();
  //     }
  //     return newEl;
  // });
}
//  ---- show one product ------
function showProduct(id) {
  console.log(id);

  wrapper.style.display = "none";
  filterContainer.style.display = "none";
  flashSale.style.height = '200px'
  flashSale.style.paddingBottom = '20px'
  cleanMainDiv();
  cleanCheckBbox();

  for (let i = 0; i < data.length; i++) {
    if (id === data[i].idProduct.toString()) {
      const shopProduct = document.createElement("div");
      shopProduct.className = "showProduct";
      shopProduct.innerHTML = `
      <img src="${data[i].image}" alt="">
      <div class="infoProduct">
        <h4> ${data[i].category.toUpperCase()}</h4>
        <h1> ${data[i].brand}</h1>
        <h2> ${data[i].nameProduct}</h2>
        <h5>  <b>Model: </b> ${data[i].modelNumber}</h5><br>
        <h4> ${data[i].year}</h4>
        <p> ${data[i].type}, ${data[i].displayType}, ${data[i].screenSize}, ${data[i].color}</p><br>
        <h3> Get it today</h3><br>
        <p><i class="fas fa-store-alt"></i> <b> Pickup:</b> </p>
        <h5>Available today at a location 4 miles away</h5>
        <h4>See all pickup locations</h4>
        <br>
        <p><i class="fas fa-shipping-fast"></i> <b> FREE Shipping:</b> </p>
        <h4>See all shipping options</h4>
        </div>
      <div>
        <h3> ${data[i].brand}</h3>
        <h4> Price Match Guarantee</h4>
        <br>
        <h1> $${data[i].price}</h1><br>
        <button class="btn" id="${data[i].idProduct}">Shop Now</button><br>
        <button class="btn-add-card" id="${data[i].idProduct}">  <i class="fas fa-shopping-cart"></i>  Add to Cart</button>
        <h4> <b>Open-Box:</b> from $${Math.ceil((data[i].price) / 100 * 70)}</h4>
       </div>
      `;
      product.appendChild(shopProduct);
    }
  }
}
//  add event-Listeners
refresh.addEventListener("click", refreshPage);
wrapper.addEventListener("click", showByCategory);

price.addEventListener("click", searchByPrice);
storageDiv.addEventListener("click", searchByStorageType);
displayTypeDiv.addEventListener("click", searchByDisplayType);
idFilterBrand.addEventListener("click", searchByBrand);
yearDiv.addEventListener("click", filterByYear);
screenResolutionDiv.addEventListener("click", searchByScrResolution);
colorsDiv.addEventListener("click", searchByColor);
screenSizeDiv.addEventListener("click", searchByScrSize);


result.addEventListener("click", function (event) {
  const item = event.target;
  console.log(item.id);
  showProduct(item.id);
});

searchBtn.addEventListener("click", searchProduct);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProduct();
  }
});
searchInput.addEventListener("keyup", function (event) {
  if (searchInput.value === "") {
    refreshPage();
  }
});
