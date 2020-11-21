
//------------------- //
const url = 'https://randomuser.me/api/?results=12';
let originalEmployees = {};
let employeesData = {};
// ------------------ //

$.getJSON(url)
    .then(response => response.results)
    .then(response => originalEmployees = response)
    .then(response => displayEmployees(response))
    .catch(error => console.log(error));

//-- listener on '.card' divs. 
$('#gallery').on('click', '.card', (e) => {
    let index = e.target.closest('.card').getAttribute('data-index');
    displayEmployeeModal(index); //-- modal is displayed when a '.card' is clicked.
});

//-- one by one the employees are appended to the page.
const displayEmployees = (employees) => {
    $('#gallery').html(''); //-- resets the html content on the page.
    let html = '';
    employeesData = employees; //-- the employees passed to the function are saved to a global variable.
    if (employees.length == 0) $('#gallery').html('<span class="no_result">Sorry no results were found!</span>');
    
    employees.forEach((employee, index) => {
            html += `<div class="card" data-index='${index}'">
                        <div class="card-img-container">
                            <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="card-text">${employee.email}</p>
                            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                        </div>
                    </div> `;
        $('#gallery').html(html); //-- html() method used so that it replaces the current data.
    });
};
//-- modal is displayed for the employee that was selected by the user.
//-- the data-index value is passed to the function so that the correct employee is displayed.
const displayEmployeeModal = (index) => {
    // regex used to format dob
    const regex = /\d{4}-\d{2}-\d{2}/;
    // ----------------------- //
            let modalHtml = `<div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${employeesData[index].picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${employeesData[index].name.first} ${employeesData[index].name.last} </h3>
                                    <p class="modal-text">${employeesData[index].email}</p>
                                    <p class="modal-text cap">${employeesData[index].location.city}</p>
                                    <hr>
                                    <p class="modal-text">${employeesData[index].cell}</p>
                                    <p class="modal-text">${employeesData[index].location.street.number}, ${employeesData[index].location.street.name}. ${employeesData[index].location.city}, ${employeesData[index].location.state}</p>
                                    <p class="modal-text">Birthday: ${employeesData[index].dob.date.match(regex)}</p>
                                </div>
                            </div>`;
        //-- if statement to check what buttons the modal needs based on the index position of employee.
        if (employeesData.length == 1) {
            modalHtml += `</div>`;
        }
        else if (index > 0 && index < employeesData.length - 1) {
            modalHtml +=`<div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>
                        </div>`;
        } else if (index == 0) {
            modalHtml +=`<div class="modal-btn-container">
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>
                        </div>`;
        } else if (index == employeesData.length -1) {
            modalHtml +=`<div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            </div>
                        </div>`;
        }
                           
    $('body').prepend(modalHtml);

    //-- for the modal that is displayed. an event listener is added for its buttons.
    $('.modal-container').on('click','button', (e) => {
        if ($(e.target).text() === 'X') { 
            $(e.target).closest('.modal-container').hide(); 
        }
        else if ($(e.target).text() === 'Next') { 
            $(e.target).closest('.modal-container').hide();
            displayEmployeeModal(parseInt(index) + 1);
        }
        else if ($(e.target).text() === 'Prev') {
            $(e.target).closest('.modal-container').hide();
            displayEmployeeModal(parseInt(index) - 1);
        }
    });
};
//-- search input appended.
$('.search-container').prepend(`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit" disabled>
</form>`);

//-- search input functionality
let searchedEmployees = {};
$('#search-input').on('keyup', () => {
    searchedEmployees = {};
    let searchValue = $('#search-input').val().toLowerCase();
    searchedEmployees = originalEmployees.filter(employee => {
        let name = `${employee.name.first} ${employee.name.last}`;
            return (name.toLowerCase().includes(searchValue)) ? true : false;
        });
    displayEmployees(searchedEmployees);
});