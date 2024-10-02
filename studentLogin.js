const students = [...JSON.parse(localStorage.getItem('students')) || "[]"];

function encryptPassword(password) {
    return btoa(password);
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let userNIC = document.getElementById('userNicnumber').value;

    let userPassword = encryptPassword(document.getElementById('loginPassword').value);

    let student = students.find(student => student.NICNumber === userNIC &&student.Password===userPassword);

    if(student)
    {  

        // students.forEach(item => {
        //     alert("Hello "+item.FullName)
        // });
        
        localStorage.setItem('loginStudent',JSON.stringify(userNIC));
        window.location.href="studentProfile.html";

    
    }
    else{
        alert("Invalid username or password.");
    }

})