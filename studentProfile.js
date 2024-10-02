document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadNotifications();
});
// loadProfile();


function loadProfile() {
    const nic =JSON.parse(localStorage.getItem('loginStudent'));
    if (!nic) {
        console.error('No NIC found in local storage.');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.NICNumber === nic);

    if (!student) {
        console.error('No student found with the NIC:', nic);
        return;
    }
    document.getElementById('profileFirstName').value = student.FirstName;
    document.getElementById('profileLastName').value = student.LastName;
    document.getElementById('profileNIC').value = student.NICNumber;
    document.getElementById('profileDOB').value = student.dob;
    document.getElementById('profileAge').value = student.Age;
    document.getElementById('profileTel').value = student.TelNumber;
    document.getElementById('profileEmail').value = student.Email;
}

function openUpdateProfileModal() {
    const nic =JSON.parse(localStorage.getItem('loginStudent'));
    if (!nic) {
        console.error('No NIC found in local storage.');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.NICNumber === nic);

    if (!student) {
        console.error('No student found with the NIC:', nic);
        return;
    }

    document.getElementById('updateProfilefirstName').value = student.FirstName;
    document.getElementById('updateProfilelastName').value = student.LastName;
    document.getElementById('updateProfileNIC').value = student.NICNumber;
    document.getElementById('updateProfileDOB').value = student.dob;
    document.getElementById('updateProfileAge').value = student.Age;
    document.getElementById('updateProfileTel').value = student.TelNumber;
    document.getElementById('updateProfileEmail').value = student.Email;

  
    document.getElementById('updateProfileModal').style.display = 'block';
}

function closeUpdateProfileModal() {
    document.getElementById('updateProfileModal').style.display = 'none';
}


function updateProfile() {
    const nic = JSON.parse(localStorage.getItem('loginStudent'));
    if (!nic) {
        console.error('No NIC found in local storage.');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(student => student.NICNumber === nic);

    if (studentIndex === -1) {
        console.error('No student found with the NIC:', nic);
        return;
    }

    const studentfName = document.getElementById('updateProfilefirstName').value.trim();
    const studentlName = document.getElementById('updateProfilelastName').value.trim();
    const studentDOB = document.getElementById('updateProfileDOB').value.trim();
    const studentAge = document.getElementById('updateProfileAge').value.trim();
    const studentTelNo = document.getElementById('updateProfileTel').value.trim();
    const studentEmail = document.getElementById('updateProfileEmail').value.trim();
    const studentPassword = document.getElementById('updateProfilePassword').value.trim();
    const studentConfirmPassword = document.getElementById('updateProfileConfirmPassword').value.trim();

    if (studentPassword !== studentConfirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    students[studentIndex] = {
        ...students[studentIndex],
        FirstName: studentfName,
        LastName:studentlName,
        dob: studentDOB,
        Age: studentAge,
        TelNumber: studentTelNo,
        Email:studentEmail,
        password: studentPassword ? btoa(studentPassword) : students[studentIndex].password // Encode the password if changed
    };

    localStorage.setItem('students', JSON.stringify(students));
    alert('Profile updated successfully!');
    closeUpdateProfileModal(); 
    loadProfile(); 
}




// function for notification section
function loadNotifications() {

    const nic = JSON.parse(localStorage.getItem('loginStudent'));

    if (!nic) {
        console.error('No NIC found in local storage.');
        return;
    }

   
    const notifications = JSON.parse((localStorage.getItem('notifications')) || {});

   
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = ''; 

    const studentNotifications = notifications[nic] || [];

   
    studentNotifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.innerText = notification;
        notificationsList.appendChild(listItem);
    });
}

