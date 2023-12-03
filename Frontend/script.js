// const axios = require('./node_modules/axios/dist/axios.js');
// http://127.0.0.1:5500/Frontend/index.html
// import axios from './node_modules/axios/dist/axios.js';

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById('age');
const DOBInput = document.getElementById('DOB');
// const submitBtn = document.querySelector('.submit-btn');
const form = document.getElementById('form');
const list = document.querySelector('.emp-list'); 

const URL = "http://localhost:8080"



function displayData(data) {
    console.log();
    const elements = data.map((employee) => {
        const { firstName, lastName, age, dateOfBirth } = employee;

        return (
            `
          <div class="list">
            <p class="Fname">${firstName}</p>
            <p class="Lname">${lastName}</p>
            <p class="DOB">${dateOfBirth.substring(0,10)}</p>
            <p class="age">${age}</p>
        </div>        `
        )
    })
    list.innerHTML = elements.join("");
}

async function getAllEmployee() {
    try {
        const result = await axios.get(URL + "/api/user",);
        console.log(result.data);
        // return result.data;
        displayData(result.data.data);
    } catch (err) {
        console.log(err.message);
        // return err.message;
    }
}
async function postEmployee({ firstName, lastName, age, DOB }) {
    try {
        const result = await axios.post(URL + "/api/user", {
            firstName,
            lastName,
            age,
            dateOfBirth:DOB
        });
        getAllEmployee();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
     
}

function handleSubmit(e) {
    e.preventDefault();
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const age = ageInput.value;
    const DOB = DOBInput.value;
    console.log({
        firstName,
        lastName,
        age,
        DOB,
    })
    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    DOBInput.value = "";

    postEmployee({firstName,lastName,age,DOB})
}

// window.onload(() => {
//     getAllEmployee();

// })
window.addEventListener("load", () => {
    getAllEmployee();
})
form.addEventListener('submit', handleSubmit);
