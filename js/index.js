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

  form.classList.add('was-validated')
});

function getContents(id) {
    if (typeof(data[id][0].img) === 'string' && id <= data.length - 1) {
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
      form.classList.remove('was-validated')
      input.classList.add('is-invalid');
    }
}

function addItemToBin(bin, name, img) {
  data[bin].push({"name": name, "img": img});
  saveData();
}

function getData() {
  const savedData = JSON.parse(localStorage.getItem('bins'));
  return savedData;
}

function saveData() {
  let currentData = JSON.stringify(data);
  localStorage.setItem('bins', currentData);
}