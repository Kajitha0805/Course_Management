const tableBody = document.querySelector('#data-table tbody');
    const searchInput = document.getElementById('searchCourse');

    function populateTable(courses) {
        tableBody.innerHTML = ''; 
        courses.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
               <td>${item.CourseID}</td>
                <td>${item.CourseName}</td>
                <td>${item.CourseFee}</td>
                <td>${item.CourseDuration}</td>
                <td>${item.BeginnerOrIntermediate}</td>

                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    function filterCourses() {
        const searchValue = searchInput.value.toLowerCase();
        const allCourses = JSON.parse(localStorage.getItem("courses"));
        
        const filterCourses = allCourses.filter(course => 
            course.CourseID.toLowerCase().includes(searchValue)
        );

        populateTable(filterCourses);
    }

    searchInput.addEventListener('input', filterCourses);




document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const saveButton = document.getElementById('save-btn');


            
            const fetchCourses=[...JSON.parse(localStorage.getItem("courses") || "[]")];

            fetchCourses.forEach((item)=>{
                // localStorage.setItem("courses","[]");
                const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${item.CourseID}</td>
                <td>${item.CourseName}</td>
                <td>${item.CourseFee}</td>
                <td>${item.CourseDuration}</td>
                <td>${item.BeginnerOrIntermediate}</td>

            
               
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
            document.getElementById('CourseID').value = row.cells[0].textContent;
            document.getElementById('CourseName').value = row.cells[1].textContent;
            document.getElementById('CourseFee').value = row.cells[2].textContent;
            document.getElementById('CourseDuration').value = row.cells[3].textContent;
            document.getElementById('BeginnerOrIntermediate').value = row.cells[4].textContent;




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
        const CourseID = document.getElementById('CourseID').value;
        const CourseName = document.getElementById('CourseName').value;
        const CourseFee = document.getElementById('CourseFee').value;
        const CourseDuration = document.getElementById('CourseDuration').value;
        const BeginnerOrIntermediate = document.getElementById('BeginnerOrIntermediate').value;


        const fetchCourses=[...JSON.parse(localStorage.getItem("courses") || "[]")];
        const newCourse=fetchCourses.find(co=>co.CourseID==CourseID);
        if(newCourse){
            alert("Course Id already exist")
            return;
        }else{
            localStorage.setItem(
                "courses",
                JSON.stringify(
                    [
                        ...JSON.parse(localStorage.getItem("courses") || "[]"),
                        {
                            "CourseID":CourseID,
                            "CourseName": CourseName,
                            "CourseFee": CourseFee,
                            "CourseDuration": CourseDuration,
                            "BeginnerOrIntermediate": BeginnerOrIntermediate,
    
                        }
                    ]
                )
            );
        }

       


        if (editingRow) {
            editingRow.cells[0].textContent = CourseID;
            editingRow.cells[1].textContent = CourseName;
            editingRow.cells[2].textContent = CourseFee;
            editingRow.cells[3].textContent = CourseDuration;
            editingRow.cells[4].textContent = BeginnerOrIntermediate;

        } else {
            
           
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${CourseID}</td>
                <td>${CourseName}</td>
                <td>${CourseFee}</td>
                <td>${CourseDuration}</td>
                <td>${BeginnerOrIntermediate}</td>
               
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
        const fetchCourses=[...JSON.parse(localStorage.getItem("courses"))];
        console.log(row.innerText)

       

        fetchCourses.forEach(item=>{
            if(item.CourseID===row.cells[0].textContent){
                fetchCourses.splice(fetchCourses.indexOf(item),1)
            }
        });

        localStorage.setItem("courses",JSON.stringify(fetchCourses));
        openModal('Edit Row', row);       

    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);

        const fetchCourses=[...JSON.parse(localStorage.getItem("courses"))];
        console.log(row.innerText)


        fetchCourses.forEach(item=>{
            if(item.CourseID===row.cells[0].textContent){
                fetchCourses.splice(fetchCourses.indexOf(item),1)
            }
        });

        localStorage.setItem("courses",JSON.stringify(fetchCourses));

        
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