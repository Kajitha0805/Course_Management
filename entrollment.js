
const tableBody = document.querySelector('#data-table tbody');
const searchInput = document.getElementById('searchStudent');

function populateTable(students) {
    tableBody.innerHTML = '';
    students.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                <td>${item.EntrollmentID}</td>
                <td>${item.StudentID}</td>
                <td>${item.CourseID}</td>
                <td>${item.JoinDate}</td>
                <td>${item.AdmissionFee}</td>
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
    const allStudents = JSON.parse(localStorage.getItem("entrollments"));

    const filteredStudents = allStudents.filter(student =>
        student.StudentID.toLowerCase().includes(searchValue)
    );

    populateTable(filteredStudents);
}

searchInput.addEventListener('input', filterStudents);



const studentDropDown = document.getElementById('StudentID');

function studentSelect() {
    studentDropDown.innerHTML = '';

    const fetchStudents = [...JSON.parse(localStorage.getItem("students") || "[]")];
    fetchStudents.forEach(item => {
        const option = document.createElement('option');
        option.value = item.StudentID;
        option.textContent = "StudentID:" + item.StudentID + ", Name:" + item.FirstName + " " + item.LastName;
        studentDropDown.appendChild(option);
    });
}

studentSelect();

const courseDropDown = document.getElementById('CourseID');

function courseSelect() {
    courseDropDown.innerHTML = '';

    const fetchCourses = [...JSON.parse(localStorage.getItem("courses") || "[]")];
    fetchCourses.forEach(item => {
        const option = document.createElement('option');
        option.value = item.CourseID;
        option.textContent = "CourseID:" + item.CourseID + ", CourseName:" + item.CourseName + ", Level:" + item.BeginnerOrIntermediate;
        courseDropDown.appendChild(option);
    });
}

courseSelect();





document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const studentDropDown = document.getElementById('StudentId');
    const saveButton = document.getElementById('save-btn');



    const fetchEntrollments = [...JSON.parse(localStorage.getItem("entrollments") || "[]")];

    fetchEntrollments.forEach((item) => {
        // localStorage.setItem("courses","[]");
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                <td>${item.EntrollmentID}</td>
                <td>${item.StudentID}</td>
                <td>${item.CourseID}</td>
                <td>${item.JoinDate}</td>
                <td>${item.AdmissionFee}</td>

            
               
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
        tableBody.appendChild(newRow);
        addEventListeners(newRow);

        // console.log(item);

    })




    let editingRow = null;

    function openModal(title, row = null) {
        modalTitle.textContent = title;
        if (row) {
            document.getElementById('EntrollmentID').value = row.cells[0].textContent;
            document.getElementById('StudentID').value = row.cells[1].textContent;
            document.getElementById('CourseID').value = row.cells[2].textContent;
            document.getElementById('JoinDate').value = row.cells[3].textContent;
            document.getElementById('AdmissionFee').value = row.cells[4].textContent;




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
        const EntrollmentID = document.getElementById('EntrollmentID').value;
        const StudentID = document.getElementById('StudentID').value;
        const CourseID = document.getElementById('CourseID').value;
        const JoinDate = document.getElementById('JoinDate').value;
        const AdmissionFee = document.getElementById('AdmissionFee').value;

        const fetchEntrollments = [...JSON.parse(localStorage.getItem("entrollments") || "[]")];
        const inputEntroll = fetchEntrollments.find(en => en.EntrollmentID == EntrollmentID);
        if (inputEntroll) {
            alert("Id already exist");
            return;
        } else {
            localStorage.setItem(
                "entrollments",
                JSON.stringify(
                    [
                        ...JSON.parse(localStorage.getItem("entrollments") || "[]"),
                        {
                            "EntrollmentID": EntrollmentID,
                            "StudentID": StudentID,
                            "CourseID": CourseID,
                            "JoinDate": JoinDate,
                            "AdmissionFee": AdmissionFee,

                        }
                    ]
                )
            );

        }



        if (editingRow) {
            editingRow.cells[0].textContent = EntrollmentID;
            editingRow.cells[1].textContent = StudentID;
            editingRow.cells[2].textContent = CourseID;
            editingRow.cells[3].textContent = JoinDate;
            editingRow.cells[4].textContent = AdmissionFee;

        } else {


            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${EntrollmentID}</td>
                <td>${StudentID}</td>
                <td>${CourseID}</td>
                <td>${JoinDate}</td>
                <td>${AdmissionFee}</td>
               
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
        const row = button.parentNode.parentNode;
        const fetchEntrollments = [...JSON.parse(localStorage.getItem("entrollments"))];
        console.log(row.innerText)



        fetchEntrollments.forEach(item => {
            if (item.EntrollmentID === row.cells[0].textContent) {
                fetchEntrollments.splice(fetchEntrollments.indexOf(item), 1)
            }
        });

        localStorage.setItem("entrollments", JSON.stringify(fetchEntrollments));
        openModal('Edit Row', row);

    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);

        const fetchEntrollments = [...JSON.parse(localStorage.getItem("entrollments"))];
        console.log(row.innerText)


        fetchEntrollments.forEach(item => {
            if (item.EntrollmentID === row.cells[0].textContent) {
                fetchEntrollments.splice(fetchEntrollments.indexOf(item), 1)
            }
        });

        localStorage.setItem("entrollments", JSON.stringify(fetchEntrollments));


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