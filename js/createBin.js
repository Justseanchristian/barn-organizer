const addItemBtn = document.querySelector('.addAnotherItem');
const createBinBtn = document.querySelector('.createBin');
const createBinModalForm = document.querySelector('.createBinModalForm');
const createBinModalFirstFileInput = document.querySelector('.createBinModalFirstFileInput');
const createBinModalFirstNameInput = document.querySelector('.createBinModalFirstNameInput');

function getData() {
    const savedData = JSON.parse(localStorage.getItem('bins'));
    return savedData;
}

function createBin(name, imgURL) {
    data.push([{"name": name, "img": imgURL}]);
    saveData();
}

function addItemToBin(bin, name, imgURL) {
    data[bin].push({"name": name, "img": imgURL});
    saveData();
}

function saveData() {
    let currentData = JSON.stringify(data);
    localStorage.setItem('bins', currentData);
}

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.classList.contains('removeItem')) {
        e.target.previousElementSibling.remove();
        e.target.previousElementSibling.remove();
        e.target.previousElementSibling.remove();
        e.target.remove();
    }
});

addItemBtn.addEventListener("click", (e) => {
    if (createBinModalForm.checkValidity()) {
        addItemBtn.insertAdjacentHTML('beforebegin', '<hr/>');
        addItemBtn.insertAdjacentHTML('beforebegin', `
        <input type="text" class="form-control mt-3" placeholder="Item name" aria-label="Item name" required>
        <input type="file" class="form-control mt-3" required>
        <button type="button" class="btn btn-danger mt-3 w-100 removeItem">Remove item</button>
        `);
    }
})

createBinBtn.addEventListener("click", (e) => {
    uploadImage(createBinModalFirstFileInput)
        .then(response => { 
            console.log(response)

            createBin(createBinModalFirstNameInput.value, response);

            // close modal
            // remove input values
        });
});

function uploadImage(input) {
    const data = new FormData();
    data.append("file", input.files[0], input.files[0].name); // "file", yourAppInput.files[0], "xmaslights.jpg"

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'a984782380msh66b8f7936e19b2cp19e3b0jsn6a15a6bd4b78',
            'X-RapidAPI-Host': 'postput.p.rapidapi.com'
        },
        body: data
    };

    return fetch('https://postput.p.rapidapi.com/', options)
        .then(response => response.json())
        .then(response => { 
            return response[0].urls[0];

            // const URL = 
        })
        .catch(err => console.error(err));
}

// Gonna have to start over again, this API won't work. Use IMGUR api when get home, can't
// access on school wifi. 