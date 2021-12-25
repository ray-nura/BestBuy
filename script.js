import { getData } from "./getData.js"

const data = getData();
const searchInput = document.getElementById('searchInput');
const refresh = document.getElementById('refresh');
const wrapper = document.querySelector('.wrapper');
const result = document.querySelector('.result');

//  clearing and refresh page
function refreshPage(){
     wrapper.style.display = 'flex';
     while (result.hasChildNodes()) {  
        result.removeChild(result.firstChild);
      }
}

// click and show By Category
const showByCategory = (event) => {
    const item = event.target
    wrapper.style.display = 'none'
    result.style.display = 'flex';

    for(let i = 0; i < data.length; i++) {
        if (item.id === data[i].category.toLocaleLowerCase() ){
            const listOfResult = document.createElement('div');
                listOfResult.innerHTML = `
                <div class="category" id="listOfResult">
                <div class="round">
                <img src="${data[i].image}" alt="">
                </div>
                <h4>${data[i].idProduct}</h4>
                <h4>${data[i].nameProduct}</h4>
                <h4>${data[i].category}</h4>
                </div>
                `
                result.appendChild(listOfResult)
        }
    }
}
//  function to show searched Product
function searchProduct(){
    const searchValue = searchInput.value.toLowerCase();
    wrapper.style.display = 'none';
    result.style.display = 'flex';
    console.log(searchValue);
    // Data Values to Lower Case
    const newData = data.map(el => {
        const newEl = {};
        for (const key in el) {
          newEl[key] = typeof el[key] === typeof '' ? el[key].toLowerCase() : el[key].toString();
        }
        return newEl;
      });
    // search data 
      const searchData = newData.filter(el => {
        let valArr = Object.values(el);
        return valArr.includes(searchValue)
        // return valArr.indexOf(searchValue) > -1
    })
    console.log(searchData)
    // create DIV element 
    for(let i = 0; i < searchData.length; i++) {
        const listOfResult = document.createElement('div');
        listOfResult.innerHTML = `
        <div class="category" id="listOfResult">
        <div class="round">
        <img src="${searchData[i].image}" alt="">
        </div>
        <h4>${searchData[i].idProduct}</h4>
        <h4>${searchData[i].nameProduct}</h4>
        <h4>${searchData[i].category}</h4>
        </div>`
        result.appendChild(listOfResult)
    }
    if (searchInput.value ===''){
        refreshPage()
    }
}
//  add event-Listener
refresh.addEventListener('click', refreshPage);
wrapper.addEventListener('click', showByCategory);
searchInput.addEventListener('keyup', searchProduct);