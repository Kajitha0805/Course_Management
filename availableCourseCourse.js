document.addEventListener('DOMContentLoaded', () => {
    const cardSection = document.getElementById('CoursesAddSpace');
    const addRowButton = document.getElementById('add-row');

    const fetchCourses = [...JSON.parse(localStorage.getItem("courses") || "[]")];

    fetchCourses.forEach((item) => {

        const newRow = document.createElement('div');
        newRow.innerHTML = `
              
                <p>${item.CourseName}</p>
                <p>RS.${item.CourseFee}</p>
                <p>${item.CourseDuration}</p>
                <p>${item.BeginnerOrIntermediate}</p>
           
                <button class="edit"  style="display:none;">Edit</button>
                <button class="delete" style="display:none;">Delete</button>
            `;
        cardSection.appendChild(newRow);
        addEventListeners(newRow);



    })

    let editingRow = null;


    function saveRow(event) {
        event.preventDefault();
        const CourseID = document.getElementById('CourseID').value;
        const CourseName = document.getElementById('CourseName').value;
        const CourseFee = document.getElementById('CourseFee').value;
        const CourseDuration = document.getElementById('CourseDuration').value;
        const BeginnerOrIntermediate = document.getElementById('BeginnerOrIntermediate').value;



        localStorage.setItem(
            "courses",
            JSON.stringify(
                [
                    ...JSON.parse(localStorage.getItem("courses") || "[]"),
                    {
                        "CourseID": CourseID,
                        "CourseName": CourseName,
                        "CourseFee": CourseFee,
                        "CourseDuration": CourseDuration,
                        "BeginnerOrIntermediate": BeginnerOrIntermediate,

                    }
                ]
            )
        );


        if (editingRow) {
            const newRow = document.createElement('div');
            newRow.innerHTML = `
                
                <p>${CourseName}</p>
                <p>${CourseFee}</p>
                <p>${CourseDuration}</p>
                <p>${BeginnerOrIntermediate}</p>
               <button id="studentAddCourse">Add Course</button>
               
                    <button class="edit"  style="display:none;">Edit</button>
                    <button class="delete" style="display:none;">Delete</button>
                
            `;
            cardSection.appendChild(newRow);
            addEventListeners(newRow);

        }

    }

    function editRow(button) {
        const row = button.parentNode.parentNode;

        const fetchCourses = [...JSON.parse(localStorage.getItem("courses"))];
        console.log(row.innerText)

        fetchCourses.forEach(item => {
            if (item.CourseID === row.cells[0].textContent) {
                fetchCourses.splice(fetchCourses.indexOf(item), 1)
            }
        });

        localStorage.setItem("courses", JSON.stringify(fetchCourses));
        openModal('Edit Row', row);


    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);

        const fetchCourses = [...JSON.parse(localStorage.getItem("courses"))];
        console.log(row.innerText)

        fetchCourses.forEach(item => {
            if (item.CourseID === row.cells[0].textContent) {
                fetchCourses.splice(fetchCourses.indexOf(item), 1)
            }
        });

        localStorage.setItem("courses", JSON.stringify(fetchCourses));


    }

    function addEventListeners(row) {
        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');

        editButton.addEventListener('click', () => editRow(editButton));
        deleteButton.addEventListener('click', () => deleteRow(deleteButton));
    }

    addRowButton.addEventListener('click', addRow);

});