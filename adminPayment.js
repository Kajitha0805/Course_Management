const tableBody = document.querySelector('#data-table tbody');
const searchInput = document.getElementById('searchStudent');

function populateTable(students) {
    tableBody.innerHTML = ''; 
    students.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.StudentID}</td>
            <td>${item.CourseID}</td>
            <td>${item.Date}</td>
            <td>${item.PayAmount}</td>
            <td  style="color:red";>${item.PendingAmount}</td>
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
    const allStudents = JSON.parse(localStorage.getItem("payments"));
    
    const filteredStudents = allStudents.filter(student => 
        student.StudentID.toLowerCase().includes(searchValue)
    );

    populateTable(filteredStudents);
}

searchInput.addEventListener('input', filterStudents);


const courseSelect=document.getElementById('CourseID');
const studentSelect=document.getElementById('StudentID');

function studentIdSelect() {
    studentSelect.innerHTML = '';

    const fetchStudents = [...JSON.parse(localStorage.getItem("students") || "[]")];
    fetchStudents.forEach(item => {
        const option = document.createElement('option');
        option.value = item.StudentID;
        option.textContent = "StudentID:"+item.StudentID+", Name:"+item.FirstName+" "+item.LastName;
        studentSelect.appendChild(option);
    });
}

studentIdSelect();

function courseIdSelect() {
    courseSelect.innerHTML = '';

    const fetchCourses = [...JSON.parse(localStorage.getItem("courses") || "[]")];
    fetchCourses.forEach(item => {
        const option = document.createElement('option');
        option.value = item.CourseID;
        option.textContent = "CourseID:"+item.CourseID+" ,CourseFee:"+item.CourseFee;
        courseSelect.appendChild(option);
    });
}

courseIdSelect();

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const CoursesAddSpace=document.getElementById("CoursesAddSpace");
    const saveButton = document.getElementById('save-btn');



            const fetchPayment=[...JSON.parse(localStorage.getItem("payments") || "[]")];

            fetchPayment.forEach((item)=>{
                // localStorage.setItem("courses","[]");
                const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item. StudentID}</td>
                <td>${item.CourseID}</td>
                <td>${item.Date}</td>
                <td>${item.PayAmount}</td>
                <td style="color:red";>${item.PendingAmount}</td>


                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
            addEventListeners(newRow);
            })

    let editingRow = null;

    function openModal(title, row = null) {
        modalTitle.textContent = title;
        if (row) {
            document.getElementById('StudentID').value = row.cells[0].textContent;
            document.getElementById('CourseID').value = row.cells[1].textContent;
            document.getElementById('Date').value = row.cells[2].textContent;
            document.getElementById('PayAmount').value = row.cells[3].textContent;
            document.getElementById('PendingAmount').value = row.cells[4].textContent;


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
        const CourseID = document.getElementById('CourseID').value;
        const Date = document.getElementById('Date').value;
        const PayAmount = document.getElementById('PayAmount').value;
        const PendingAmount = document.getElementById('PendingAmount').value;




        localStorage.setItem(
            "payments",
            JSON.stringify(
                [
                    ...JSON.parse(localStorage.getItem("payments") || "[]"),
                    {
                        "StudentID":StudentID,
                        "CourseID": CourseID,
                        "Date": Date,
                        "PayAmount": PayAmount,
                        "PendingAmount": PendingAmount


                    }
                ]
            )
        );


        if (editingRow) {
            editingRow.cells[0].textContent = StudentID;
            editingRow.cells[1].textContent = CourseID;
            editingRow.cells[2].textContent = Date;
            editingRow.cells[3].textContent = PayAmount;
            editingRow.cells[4].textContent = PendingAmount;


        } else {


            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${StudentID}</td>
                <td>${CourseID}</td>
                <td>${Date}</td>
                <td>${PayAmount}</td>
                <td>${PendingAmount}</td>


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
        // row.parentNode.removeChild(row);
        const fetchPayment=[...JSON.parse(localStorage.getItem("payments"))];
        console.log(row.innerText)



        fetchPayment.forEach(item=>{
            if(item.PaymentID===row.cells[0].textContent){
                fetchPayment.splice(fetchPayment.indexOf(item),1)
            }
        });

        localStorage.setItem("payments",JSON.stringify(fetchPayment));
        openModal('Edit Row', row);


    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);

        const fetchPayment=[...JSON.parse(localStorage.getItem("payments"))];
        console.log(row.innerText)

        // fetchCourses.forEach((item)=>{

        //     if(item.)

        fetchPayment.forEach(item=>{
            if(item.PaymentID===row.cells[0].textContent){
                fetchPayment.splice(fetchPayment.indexOf(item),1)
            }
        });

        localStorage.setItem("payments",JSON.stringify(fetchPayment));


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

