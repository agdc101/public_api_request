
//--- VARIABLES
const url = 'https://randomuser.me/api/?results=12';
let employees = {};
$.getJSON(url)
    .then(response => response.results)
    .then(response => employees = response)
    .then(response => displayEmployees(response))
    .catch(error => console.log(error));

const displayEmployees = (employees) => {
    employees.forEach((employee, index) => {
        const html = `<div class="card" data-index='${index}'">
                        <div class="card-img-container">
                            <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="card-text">${employee.email}</p>
                            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                        </div>
                    </div> `;
        $('#gallery').prepend(html);
    })
}
$('#gallery').on('click', '.card', (e) => {
    const index = e.target.closest('.card').getAttribute('data-index');
    // regex used to format dob
    const regex = /\d{4}-\d{2}-\d{2}/;
    // ----------------------- //
    console.log(employees[index]);
    const modalHtml = `<div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${employees[index].picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${employees[index].name.first} ${employees[index].name.last} </h3>
                                    <p class="modal-text">${employees[index].email}</p>
                                    <p class="modal-text cap">${employees[index].location.city}</p>
                                    <hr>
                                    <p class="modal-text">${employees[index].cell}</p>
                                    <p class="modal-text">${employees[index].location.street.number}, ${employees[index].location.street.name}. ${employees[index].location.city}, ${employees[index].location.state}</p>
                                    <p class="modal-text">Birthday: ${employees[index].dob.date.match(regex)}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>
                        </div>`;
    $('body').prepend(modalHtml);

    $('.modal-container').on('click','button', (e) => {
        if ($(e.target).text() === 'X') $(e.target).closest('.modal-container').hide();
    })
})
