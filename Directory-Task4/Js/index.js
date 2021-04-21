var lettersList = document.getElementById("letters-list");
var departmentList = document.getElementById("departmentList");
var officeList = document.getElementById("officesList");
var jobTitleList = document.getElementById("jobTitlesList");
var modal = document.getElementById("add-employee-form");
var addBtn = document.getElementById("add-btn");
var closeBtn = document.getElementById("close-btn");
var resultsDiv = document.querySelector(".results");
var addEmpForm = document.querySelector(".form-container");
var formSubmitBtn = document.querySelector(".form-add-btn");
var filterDropdown = document.getElementById("filter");
var searchInput = document.querySelector(".search-input");

document.querySelector(".bring-all-user").addEventListener('click', () => {
    loadEmployees();
    createEmployeeCard();
});

filterDropdown.onchange = function () {
    console.log(filterDropdown.value);
}

document.getElementById("clear-btn").addEventListener("click", () => {
    searchInput.value = '';
    loadEmployees();
    createEmployeeCard();
});

searchInput.addEventListener('keyup', (e) => {
    loadEmployees();
    const searchString = e.target.value;

    Employees = Employees.filter(employee => {
        return employee[filterDropdown.value].toLowerCase().includes(searchString.toLowerCase());
    });
    createEmployeeCard();
});

var listDepartment = ["IT Department", "HR Department", "MD", "Sales",];

var listOffices = ["Seattle", "India",];

var listJobTitle = ["Sharepoint Practice head", ".Net Development Lead", "Recruiting Expert", "BI Developer", "Business Developer", "Product Engineer",];

class Employee {
    constructor(fName, lName, pName, phoneNumber, email, jobTitle, office, department, skypeId) {
        this.fName = fName;
        this.lName = lName;
        this.pName = pName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.jobTitle = jobTitle;
        this.office = office;
        this.department = department;
        this.skypeId = skypeId;
    }
}

formSubmitBtn.addEventListener('click', () => {
    console.log("Add button clicked");
    loadEmployees();
    Employees.push(
        new Employee(
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("lName").value,
            addEmpForm.elements.namedItem("pName").value,
            addEmpForm.elements.namedItem("phoneNumber").value,
            addEmpForm.elements.namedItem("email").value,
            addEmpForm.elements.namedItem("jobTitle").value,
            addEmpForm.elements.namedItem("office").value,
            addEmpForm.elements.namedItem("department").value,
            addEmpForm.elements.namedItem("skypeId").value,
        ),
    );
    saveEmployees();
});

var Employees;

function saveEmployees() {

    var jsonString = JSON.stringify(Employees);
    localStorage.setItem('Employees', jsonString);

}

function loadEmployees() {

    Employees = JSON.parse(localStorage.getItem('Employees')) || [];

}

document.onload = createEmployeeCard();

function createEmployeeCard() {
    if (Employees == null) {
        loadEmployees();
    }
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }
    for (var i = 0; i < Employees.length; i++) {
        // Creating the card div
        var emp = document.createElement('div');
        emp.classList.add("profile-card");
        // Adding Image
        var img = new Image();
        img.src = "../Images/avatar.png"
        emp.appendChild(img);
        // Creating detials div
        var empDetailDiv = document.createElement('div');
        // Name div
        var fullName = Employees[i].fName + " " + Employees[i].lName;
        var nameh3 = document.createElement('h3');
        nameh3.appendChild(document.createTextNode(fullName));
        empDetailDiv.appendChild(nameh3);
        // Job Title Div
        var jobh5 = document.createElement('h5');
        jobh5.appendChild(document.createTextNode(Employees[i].jobTitle));
        empDetailDiv.appendChild(jobh5);
        // Department Div
        var departmenth5 = document.createElement('h5');
        departmenth5.appendChild(document.createTextNode(Employees[i].department));
        empDetailDiv.appendChild(departmenth5);
        // Creating Icon Span 
        var iconRowSpan = document.createElement('span');
        // Adding phone icon
        var phoneIcon = document.createElement('i');
        phoneIcon.setAttribute("class", "fas fa-phone-square-alt")
        iconRowSpan.appendChild(phoneIcon);
        // Adding mail icon
        var mailIcon = document.createElement('i');
        mailIcon.setAttribute("class", "fas fa-envelope")
        iconRowSpan.appendChild(mailIcon);
        // Adding comment icon
        var commentIcon = document.createElement('i');
        commentIcon.setAttribute("class", "fas fa-comment")
        iconRowSpan.appendChild(commentIcon);
        // Adding star icon
        var starIcon = document.createElement('i');
        starIcon.setAttribute("class", "fas fa-star")
        iconRowSpan.appendChild(starIcon);
        // Adding heart icon
        var heartIcon = document.createElement('i');
        heartIcon.setAttribute("class", "fas fa-heart")
        iconRowSpan.appendChild(heartIcon);
        // Adding icon span to parent div
        empDetailDiv.appendChild(iconRowSpan);
        // Adding emp details div to parent div
        emp.appendChild(empDetailDiv);
        resultsDiv.appendChild(emp);
    }
}

// Letters filter
for (var i = 1; i <= 26; i++) {
    var letter = String.fromCharCode(64 + i);
    var letterLi = document.createElement('li');
    letterLi.addEventListener('click', (e) => {
        loadEmployees();
        Employees = Employees.filter(employee => {
            return employee.fName[0].toUpperCase().includes(e.currentTarget.innerText);
        });
        createEmployeeCard();
    });
    letterLi.appendChild(document.createTextNode(letter));
    lettersList.appendChild(letterLi);
}

// Department filter
for (var i = 0; i < listDepartment.length; i++) {
    var department = listDepartment[i];
    var li = document.createElement('li');
    var count = document.createElement('span');
    li.addEventListener('click', (e) => {
        loadEmployees();
        Employees = Employees.filter(employee => {
            return employee.department.toLowerCase().includes(e.currentTarget.innerText.toLowerCase());
        });
        createEmployeeCard();
    })
    var occurence = Employees.filter(emp => {
        return emp.department.toLowerCase().includes(department.toLowerCase());
    }).length;
    count.appendChild(document.createTextNode(" (" + occurence + ")"));
    li.appendChild(document.createTextNode(department));
    li.appendChild(count);
    departmentList.appendChild(li);
}

// Office filter
for (var i = 0; i < listOffices.length; i++) {
    var office = listOffices[i];
    var li = document.createElement('li');
    var count = document.createElement('span');
    li.addEventListener('click', (e) => {
        loadEmployees();
        Employees = Employees.filter(employee => {
            return employee.office.toLowerCase().includes(e.currentTarget.innerText.toLowerCase());
        });
        createEmployeeCard();
    })
    var occurence = Employees.filter(emp => {
        return emp.office.toLowerCase().includes(office.toLowerCase());
    }).length;
    count.appendChild(document.createTextNode(" (" + occurence + ")"));
    li.appendChild(document.createTextNode(office));
    li.appendChild(count);
    officeList.appendChild(li);
}

// Job title filter
for (var i = 0; i < listJobTitle.length; i++) {
    var jobTitle = listJobTitle[i];
    var li = document.createElement('li');
    var count = document.createElement('span');
    li.addEventListener('click', (e) => {
        loadEmployees();
        Employees = Employees.filter(employee => {
            return employee.jobTitle.toLowerCase().includes(e.currentTarget.innerText.toLowerCase());
        });
        createEmployeeCard();
    })
    var occurence = Employees.filter(emp => {
        return emp.jobTitle.toLowerCase().includes(jobTitle.toLowerCase());
    }).length;
    count.appendChild(document.createTextNode(" (" + occurence + ")"));
    li.appendChild(document.createTextNode(jobTitle));
    li.appendChild(count);
    jobTitleList.appendChild(li);
}

addBtn.onclick = function () {
    modal.style.display = "block";
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}