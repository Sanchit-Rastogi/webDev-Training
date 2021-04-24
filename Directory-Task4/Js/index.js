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

var Employees;

function autofill() {
    var f = addEmpForm.elements.namedItem("fName").value;
    var l = addEmpForm.elements.namedItem("lName").value;

    if (!!f && !!l) {
        addEmpForm.elements.namedItem("pName").value = f + l;
    }
}

document.querySelector(".bring-all-user").addEventListener('click', () => {
    loadEmployees();
    createEmployeeCard();
});

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

function validateFirstName() {
    var value = addEmpForm.elements.namedItem("fName").value;
    var errorMsg = document.getElementById("fName-error");

    if (!value) {
        errorMsg.innerText = "Required";
        console.log("Invalid Entry");
        return false;
    }
    if (!/^([a-z][A-Z]+)$/i.test(value)) {
        errorMsg.innerText = "Invalid First name";
        console.log("Invalid Entry");
        return false;
    }
    return true;
}

function validateLastName() {
    var value = addEmpForm.elements.namedItem("lName").value;
    var errorMsg = document.getElementById("lName-error");

    if (!value) {
        errorMsg.innerText = "Required";
        console.log("Invalid Entry");
        return false;
    }
    if (!/^([a-z][A-Z]+)$/i.test(value)) {
        console.log("Invalid Entry");
        errorMsg.innerText = "Invalid Last name";
        return false;
    }

    return true;
}

function validatePreferredName() {
    var value = addEmpForm.elements.namedItem("pName").value;
    var errorMsg = document.getElementById("pName-error");

    if (!value) {
        errorMsg.innerText = "Required";
        console.log("Invalid Entry");
        return false;
    }
    if (!/^([a-z][A-Z]+)$/i.test(value)) {
        console.log("Invalid Entry");
        errorMsg.innerText = "Invalid Preferred name";
        return false;
    }

    return true;
}

function validateForm() {
    return validateFirstName() && validateLastName() && validatePreferredName();
}

formSubmitBtn.addEventListener('click', () => {
    if (validateForm()) {
        loadEmployees();
        console.log(addEmpForm.elements.namedItem("fName").value);
        var newEmp = new Employee(
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("lName").value,
            addEmpForm.elements.namedItem("pName").value,
            addEmpForm.elements.namedItem("phoneNumber").value,
            addEmpForm.elements.namedItem("email").value,
            addEmpForm.elements.namedItem("jobTitle").value,
            addEmpForm.elements.namedItem("office").value,
            addEmpForm.elements.namedItem("department").value,
            addEmpForm.elements.namedItem("skypeId").value,
        );
        if (formSubmitBtn.innerText === "Add") {
            Employees.push(newEmp);
        } else {
            Employees[formSubmitBtn.id] = newEmp;
        }
        modal.style.display = "none";
        saveEmployees();
    }
});

function saveEmployees() {
    var jsonString = JSON.stringify(Employees);
    localStorage.setItem('Employees', jsonString);
    createEmployeeCard();
}

function loadEmployees() {

    Employees = JSON.parse(localStorage.getItem('Employees')) || [];

}

document.onload = Initialize();

function Initialize() {
    createEmployeeCard();
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

    var listDepartment = [...new Set(Employees.map(e => e.department))];
    var listOffices = [...new Set(Employees.map(e => e.office))];
    var listJobTitle = [...new Set(Employees.map(e => e.jobTitle))];

    // Department filter
    for (var i = 0; i < listDepartment.length; i++) {
        var department = listDepartment[i];
        var li = document.createElement('li');
        li.id = department;
        var count = document.createElement('span');
        li.addEventListener('click', (e) => {
            loadEmployees();
            Employees = Employees.filter(employee => {
                return employee.department.toLowerCase().includes(e.currentTarget.id.toLowerCase());
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
        li.id = office;
        var count = document.createElement('span');
        li.addEventListener('click', (e) => {
            loadEmployees();
            Employees = Employees.filter(employee => {
                return employee.office.toLowerCase().includes(e.currentTarget.id.toLowerCase());
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
        li.id = jobTitle;
        var count = document.createElement('span');
        li.addEventListener('click', (e) => {
            loadEmployees();
            Employees = Employees.filter(employee => {
                return employee.jobTitle.toLowerCase().includes(e.currentTarget.id.toLowerCase());
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
}

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
        emp.id = i;
        emp.addEventListener("dblclick", (e) => {
            modal.style.display = "block";
            addEmpForm.elements.namedItem("fName").value = Employees[e.currentTarget.id].fName;
            addEmpForm.elements.namedItem("lName").value = Employees[e.currentTarget.id].lName;
            addEmpForm.elements.namedItem("pName").value = Employees[e.currentTarget.id].pName;
            addEmpForm.elements.namedItem("phoneNumber").value = Employees[e.currentTarget.id].phoneNumber;
            addEmpForm.elements.namedItem("email").value = Employees[e.currentTarget.id].email;
            addEmpForm.elements.namedItem("jobTitle").value = Employees[e.currentTarget.id].jobTitle;
            addEmpForm.elements.namedItem("office").value = Employees[e.currentTarget.id].office;
            addEmpForm.elements.namedItem("department").value = Employees[e.currentTarget.id].department;
            addEmpForm.elements.namedItem("skypeId").value = Employees[e.currentTarget.id].skypeId;
            formSubmitBtn.innerText = "Update Details";
            formSubmitBtn.id = e.currentTarget.id;
        });
        // Adding Image
        var img = new Image();
        img.src = "./Images/avatar.png";
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

addBtn.onclick = function () {
    modal.style.display = "block";
    formSubmitBtn.innerText = "Add";
    addEmpForm.elements.namedItem("fName").value = "";
    addEmpForm.elements.namedItem("lName").value = "";
    addEmpForm.elements.namedItem("pName").value = "";
    addEmpForm.elements.namedItem("phoneNumber").value = "";
    addEmpForm.elements.namedItem("email").value = "";
    addEmpForm.elements.namedItem("jobTitle").value = "";
    addEmpForm.elements.namedItem("office").value = "";
    addEmpForm.elements.namedItem("department").value = "";
    addEmpForm.elements.namedItem("skypeId").value = "";
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}