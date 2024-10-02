
// function populateSelect(select) {
//     select.innerHTML = '';

//     const fetchCourses = [...JSON.parse(localStorage.getItem("courses") || "[]")];
//     fetchCourses.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.CourseID;
//         option.textContent ="CourseID:"+ item.CourseID+", CourseName:"+item.CourseName+", Level:"+item.BeginnerOrIntermediate;
//         select.appendChild(option);
//     });
// }

// populateSelect(courseFill);
const tableBody = document.querySelector('#data-table tbody');
    const searchInput = document.getElementById('searchStudent');

    function populateTable(students) {
        tableBody.innerHTML = ''; 
        students.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item.StudentID}</td>
                <td>${item.FirstName}</td>
                <td>${item.LastName}</td>
                <td>${item.Age}</td>
                <td>${item.dob}</td>
                <td>${item.NICNumber}</td>
                <td>${item.Gender}</td>
                <td>${item.TelNumber}</td>
                 <td>${item.Email}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    function filterStudents() {
        const searchValue = searchInput.value.toLowerCase();
        const allStudents = JSON.parse(localStorage.getItem("students"));
        
        const filteredStudents = allStudents.filter(student => 
            student.StudentID.toLowerCase().includes(searchValue)
        );

        populateTable(filteredStudents);
    }

    searchInput.addEventListener('input', filterStudents);



document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const courseFill = document.getElementById('courseFill');
    const saveButton = document.getElementById('save-btn');


    // Get local storage datas
    const fetchStudents = [...JSON.parse(localStorage.getItem("students") || "[]")];

    fetchStudents.forEach((item) => {

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                <td>${item.StudentID}</td>
                <td>${item.FirstName}</td>
                <td>${item.LastName}</td>
                <td>${item.Age}</td>
                <td>${item.dob}</td>
                <td>${item.NICNumber}</td>
                <td>${item.Gender}</td>
                <td>${item.TelNumber}</td>
                 <td>${item.Email}</td>
            
               
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    
                </td>
            `;
        tableBody.appendChild(newRow);
        addEventListeners(newRow);

        console.log(item);

    })

    let editingRow = null;
    //    (stdentDetail add modal)  table save code
    function openModal(title, row = null) {
        modalTitle.textContent = title;
        if (row) {
            document.getElementById('StudentID').value = row.cells[0].textContent;
            document.getElementById('FirstName').value = row.cells[1].textContent;
            document.getElementById('LastName').value = row.cells[2].textContent;
            document.getElementById('Age').value = row.cells[3].textContent;
            document.getElementById('dob').value = row.cells[4].textContent;
            document.getElementById('NICNumber').value = row.cells[5].textContent;
            document.getElementById('Gender').value = row.cells[6].textContent;
            document.getElementById('TelNumber').value = row.cells[7].textContent;
            document.getElementById('Email').value = row.cells[8].textContent;




        } else {
            modalForm.reset();
        }
        editingRow = row;
        modal.style.display = 'block';
    }

    function closeModalWindow() {
        modal.style.display = 'none';
    }

    function addRow() {
        openModal('Add Row');
    }

    function saveRow(event) {
        event.preventDefault();


        const StudentID = document.getElementById('StudentID').value;
        const FirstName = document.getElementById('FirstName').value;
        const LastName = document.getElementById('LastName').value;
        const Age = document.getElementById('Age').value;
        const dob = document.getElementById('dob').value;
        const NICNumber = document.getElementById('NICNumber').value;
        const Gender = document.getElementById('Gender').value;
        const TelNumber = document.getElementById('TelNumber').value;
        const Email = document.getElementById('Email').value;


        const Password = btoa(document.getElementById('Password').value);
        const ConfirmPassword = btoa(document.getElementById('ConfirmPassword').value);

        const fetchStudents = [...JSON.parse(localStorage.getItem("students") || "[]")];
        const inputStudent=fetchStudents.find(st=>st.StudentID==StudentID);
        if(inputStudent){
            alert("Student Id already exist");
            return;
        }else{
            if (Password == ConfirmPassword && Password !== "" && ConfirmPassword !== "") {
                localStorage.setItem(
                    "students",
                    JSON.stringify(
                        [
                            ...JSON.parse(localStorage.getItem("students") || "[]"),
                            {
                                "StudentID": StudentID,
                                "FirstName": FirstName,
                                "LastName":LastName,
                                "Age": Age,
                                "dob": dob,
                                "NICNumber": NICNumber,
                                "Gender": Gender,
                                "TelNumber":TelNumber,
                                "Email":Email,
                                "Password": Password,
                                "ConfirmPassword": ConfirmPassword,
    
                            }
                        ]
                    )
                );
    
            } else {
                alert("Check your password")
                return;
    
            }
    
        }


        



        if (editingRow) {
            editingRow.cells[0].textContent = StudentID;
            editingRow.cells[1].textContent = FirstName;
            editingRow.cells[2].textContent = LastName;
            editingRow.cells[3].textContent = Age;
            editingRow.cells[4].textContent = dob;
            editingRow.cells[5].textContent = NICNumber;
            editingRow.cells[6].textContent = Gender;
            editingRow.cells[7].textContent = TelNumber;
            editingRow.cells[8].textContent = Email;

        } else {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${StudentID}</td>
                <td>${FirstName}</td>
                <td>${LastName}</td>
                <td>${Age}</td>
                <td>${dob}</td>
                <td>${NICNumber}</td>
                <td>${Gender}</td>
                <td>${TelNumber}</td>
                <td>${Email}</td>
               
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    
                </td>
            `;
            tableBody.appendChild(newRow);
            addEventListeners(newRow);
        }
        closeModalWindow();
    }

    function editRow(button) {
        // document.getElementById('passwordSection').style.display='none';
        const row = button.parentNode.parentNode;
        const fetchStudents = [...JSON.parse(localStorage.getItem("students"))];
        console.log(row.innerText)



        fetchStudents.forEach(item => {
            if (item.StudentID === row.cells[0].textContent) {
                fetchStudents.splice(fetchStudents.indexOf(item), 1)
            }
        });

        localStorage.setItem("students", JSON.stringify(fetchStudents));
        openModal('Edit Row', row);
    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);

        const fetchStudents = [...JSON.parse(localStorage.getItem("students"))];
        console.log(row.innerText)

        // fetchCourses.forEach((item)=>{

        //     if(item.)

        fetchStudents.forEach(item => {
            if (item.StudentID === row.cells[0].textContent) {
                fetchStudents.splice(fetchStudents.indexOf(item), 1)
            }
        });

        localStorage.setItem("students", JSON.stringify(fetchStudents));
    }

    function addEventListeners(row) {
        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');
       
        editButton.addEventListener('click', () => editRow(editButton));
        deleteButton.addEventListener('click', () => deleteRow(deleteButton));
    }

    addRowButton.addEventListener('click', addRow);
    closeModal.addEventListener('click', closeModalWindow);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModalWindow();
        }
    });
    modalForm.addEventListener('submit', saveRow);

    document.querySelectorAll('#data-table tbody tr').forEach(row => {
        addEventListeners(row);
    });
});


function sendNotification() {
    const notificationNIC = document.getElementById('notificationNIC').value;
    const notificationText = document.getElementById('notificationText').value;

    let notifications = JSON.parse(localStorage.getItem('notifications')) || {};
    if (!notifications[notificationNIC]) {
        notifications[notificationNIC] = [];
    }
    notifications[notificationNIC].push(notificationText);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    alert('Notification sent!');
}
