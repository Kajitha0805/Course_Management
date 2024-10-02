localStorage.setItem('Admin','[{"AdminID":"A1234","Password":"MTIzNA=="}]')

const Admin = JSON.parse(localStorage.getItem('Admin')) || [];

function encryptPassword(password) {
    return btoa(password);
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let adminID = document.getElementById('AdminID').value;

    let adminPassword = encryptPassword(document.getElementById('loginPassword').value);

    let admin = Admin.find(admin => admin.AdminID === adminID &&admin.Password===adminPassword);

    if(admin)
    {
        // document.getElementById("studentTablePage").style.display = "block";
        // document.getElementById("loginSection").style.display = "none";
        window.location.href="adminstudentTable.html";
        // alert("Login succeass")
    
    }
    else{
        alert("Invalid username or password.");
    }

})