const data = getData();

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    e.preventDefault();
    getContents(input.value);
  }
});

function getContents(id) {
    if (typeof(data[id][0].img) === 'string' && id < data.length) {
      if (id !== '0') {
        document.querySelector('.container').innerHTML = '';
  
        const gridRow = document.createElement("div");
        gridRow.classList.add('row');
    
        for (let i = 0; i < data[id].length; i++) {
          gridRow.innerHTML += `
          <div class="col d-flex justify-content-center">
            <div class="card mt-3 mb-3" style="width: 18rem;">
              <img src="${data[id][i].img}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[id][i].name}</h5>
              </div>
            </div>
          </div>
          `
          
          document.querySelector('.container').appendChild(gridRow);
        }
      } else {
        input.classList.add('is-invalid');
      }
    } else {
      input.classList.add('is-invalid');
    }
}

function addItemToBin(bin, name, img) {
  data[bin].push({"name": name, "img": img});
  saveData();
}

function getData() {
  if (localStorage.getItem('bins') !== '') {
    const savedData = JSON.parse(localStorage.getItem('bins'));
    return savedData;
  } else {
    console.log('No data stored.')
  }
}

function saveData() {
  let currentData = JSON.stringify(data);
  localStorage.setItem('bins', currentData);
}

function addTestData() {
  localStorage.setItem('bins', JSON.stringify([[{"name":"Christmas Tree Lights","img":"https://cdn-113.anonfiles.com/j4A6H9F1y8/e52bd5de-1667497777/xmaslights.jpg"}]]));
}

function addExtraItems() {
  const allExtraItems = document.querySelectorAll('.extraItems');
  const extraNameItems = document.querySelectorAll('.extraItems-name');
  const extraFileItems = document.querySelectorAll('.extraItems-file');

  if (allExtraItems.length !== 0) {  
    console.log('Extra Items Detected!');
    for (let i = 0; i < extraFileItems.length; i++) {

      if (extraNameItems[i].value !== '') {
        const bin = data.length - 1;
        const name = extraNameItems[i].value;
        
        if (extraFileItems[i].value !== '') {
          uploadImage(extraFileItems[i])
          .then(response => 
            addItemToBin(bin, name, response)
            );            
        }
      }


    }
  } else {
    console.log('Error! You do not have any extra inputs! :(')
    return null;
  }
}

function fixNoData() {
  if (localStorage.getItem('bins') == null) {
    localStorage.setItem('bins', JSON.stringify([[{"name":"Ignore this","img":"https://cdn-113.anonfiles.com/j4A6H9F1y8/e52bd5de-1667497777/xmaslights.jpg"}]]));
    location.reload();
  } else {
    console.log('You already had data, therefore no data was added automatically.');
  }
}