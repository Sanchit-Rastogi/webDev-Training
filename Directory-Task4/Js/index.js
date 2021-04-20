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

filterDropdown.onchange = function () {
    console.log(filterDropdown.value);
}

var listDepartment = ["IT", "Human Resources", "MD", "Sales",];

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

var employeeList = [
    new Employee("Anthony", "Morris", "AnthonyMorris", "1234567890", "anthony@gmail.com", "SharePoint Practice Head", "Seattle", "IT department", "anthony123"),
    new Employee("Franklin", "Humark", "FranklinHumark", "1234567890", "Fraklin@gmail.com", "Network Engineer", "Seattle", "IT department", "Fraklin123"),
    new Employee("Helen", "Zimmerman", "HelenZimmerman", "9876543211", "Helen@gmail.com", "Operations Manager", "Hyderabad", "IT department", "Helen123"),
    new Employee("Angela", "Bailey", "AngelaBailey", "8765432110", "angela@gmail.com", "Talent Magnet Jr.", "Seattle", "HR Department", "Angela123"),
];

var employeeFilterList = employeeList;

searchInput.addEventListener('change', (e) => {
    var dropdownValue = filterDropdown.value;
    employeeFilterList.forEach((emp) => {
        console.log(emp);
        if (emp.dropdownValue != e.currentTarget.value) {
            employeeFilterList.pop(emp);
        }
    });
    createEmployeeCard();
})

formSubmitBtn.onclick = function () {
    employeeList.push(
        new Employee(
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
            addEmpForm.elements.namedItem("fName").value,
        ),
    );
    employeeList.push(new Employee("Helen", "Zimmerman", "HelenZimmerman", "9876543211", "Helen@gmail.com", "Operations Manager", "Hyderabad", "IT department", "Helen123"),);
    console.log(employeeList);
};

document.onload = createEmployeeCard();

function createEmployeeCard() {
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }
    for (var i = 0; i < employeeFilterList.length; i++) {
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
        var fullName = employeeFilterList[i].fName + " " + employeeFilterList[i].lName;
        var nameh3 = document.createElement('h3');
        nameh3.appendChild(document.createTextNode(fullName));
        empDetailDiv.appendChild(nameh3);
        // Job Title Div
        var jobh5 = document.createElement('h5');
        jobh5.appendChild(document.createTextNode(employeeFilterList[i].jobTitle));
        empDetailDiv.appendChild(jobh5);
        // Department Div
        var departmenth5 = document.createElement('h5');
        departmenth5.appendChild(document.createTextNode(employeeFilterList[i].department));
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

for (var i = 1; i <= 26; i++) {
    var letter = String.fromCharCode(64 + i);
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(letter));
    lettersList.appendChild(li);
}

for (var i = 0; i < listDepartment.length; i++) {
    var department = listDepartment[i];
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.appendChild(document.createTextNode(department));
    link.href = "";
    li.appendChild(link);
    departmentList.appendChild(li);
}

for (var i = 0; i < listOffices.length; i++) {
    var office = listOffices[i];
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(office));
    officeList.appendChild(li);
}

for (var i = 0; i < listJobTitle.length; i++) {
    var jobTitle = listJobTitle[i];
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(jobTitle));
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