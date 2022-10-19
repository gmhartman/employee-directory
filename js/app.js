// variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
let cardChange = '';

// fetch
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
     <img class="avatar" src="${picture.large}">
      <div class="text-container">
       <h2 class="name">${name.first} ${name.last}</h2>
       <p class="email">${email}</p>
       <p class="address">${city}</p>
      </div>
     </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}

// modal function

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}">
    <div class="text-container">
     <h2 class="name">${name.first} ${name.last}</h2>
     <p class="email">${email}</p>
     <p class="address">${city}</p>
     <hr>
     <p>${phone}</p>
     <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
     <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
     <div class="arrow-container">
     <button class="right-arrow">&#60;</button>
     <button class="left-arrow">&#62;</button>
     </div>
    </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;

    let rightArrow = document.querySelector('.right-arrow');
    let leftArrow = document.querySelector('.left-arrow');

    rightArrow.addEventListener('click', () => {
        if (cardChange != 11) {
            cardChange = Number.parseInt(cardChange) + 1;
            displayModal(cardChange);
        } else {
            cardChange = 0;
            displayModal(0);
        }
    });
    leftArrow.addEventListener('click', () => {
        if (cardChange != 0) {
            cardChange = Number.parseInt(cardChange) - 1;
            displayModal(cardChange);
        } else {
            cardChange = 11;
            displayModal(11);
        }
    });
}

// event listeners

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// search bar

const search = document.getElementById('search');

search.addEventListener('keyup', e => {
  let names = e.target.value.toLowerCase();
  let workers = document.querySelectorAll('h2.name');
  workers.forEach(worker => {
    if (worker.textContent.toLowerCase().includes(names)) {
        worker.parentNode.parentNode.style.display = 'block';
    } else {
        worker.parentNode.parentNode.style.display = 'none';
    }
  });
});
