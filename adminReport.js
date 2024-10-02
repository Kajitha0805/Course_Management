function countStudents(){

const students = localStorage.getItem('students');


if (students) {
    
    const studentsArray = JSON.parse(students);

    
    const studentCount = studentsArray.length;

    document.getElementById("CountStudents").innerHTML="Number of students:"+ studentCount;
} else {
    alert('No students found in localStorage.');
}

}

function countCourses(){

    const Courses = localStorage.getItem('courses');
    
    
    if (Courses) {
        
        const coursesArray = JSON.parse(Courses);
    
        
        const courseCount = coursesArray.length;
    
        document.getElementById("countCourses").innerHTML="Number of Courses:"+ courseCount;
    } else {
        alert('No courses found in localStorage.');
    }
    
    }


    function calculateIncome() {

        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);


        const paydata = JSON.parse(localStorage.getItem('payments')) || [];

    
        let payIncome = 0;

   
        paydata.forEach(entry => {
            const paymententryDate = new Date(entry.Date);
            if (paymententryDate >= startDate && paymententryDate <= endDate) {
                payIncome += Number(entry.PayAmount);
            }
        });

        const adData=JSON.parse(localStorage.getItem('entrollments'))||[];
          
        let admissionIncome=0;

        adData.forEach(entry=>{
            const admissionEntryDate=new Date(entry.JoinDate);
            if(admissionEntryDate>=startDate&&admissionEntryDate<=endDate){
                admissionIncome+=Number(entry.AdmissionFee)
            }
        })
        document.getElementById('AdmissionFeeCollection').textContent = `Total Admission Fee: RS${admissionIncome}.00`;
        document.getElementById('paymentCollection').textContent = `Total Payments: RS${payIncome}.00`;
        document.getElementById('total-income').textContent = `Total Income: RS${admissionIncome+payIncome}.00`;
    }


    document.addEventListener('DOMContentLoaded', () => {
        // Function to fetch and consolidate all data
        function fetchData() {
            const students = JSON.parse(localStorage.getItem('students') || '[]');
            const courses = JSON.parse(localStorage.getItem('courses') || '[]');
            const payments = JSON.parse(localStorage.getItem('payments') || '[]');
            const entrollments=JSON.parse(localStorage.getItem('entrollments')||'[]');
            
            return { students, courses, payments ,entrollments};
        }
    
        // Function to generate a report
        function generateReport() {
            const { students, courses, payments,entrollments } = fetchData();
    
            const reportTableBody = document.querySelector('#report-table tbody');
            reportTableBody.innerHTML = ''; // Clear previous report rows
    
            students.forEach(student => {
                const matchingCourse = entrollments.filter(entrollment => entrollment.StudentID === student.StudentID);
                const matchingPayments = payments.filter(payment => payment.StudentID === student.StudentID);
                const matchingEntrollments=entrollments.filter(entrollment=>entrollment.StudentID===student.StudentID);
                console.log(matchingEntrollments)

                const admission=matchingEntrollments.map(entroll=>
                    `Course ID: ${entroll.CourseID}, Admission Fee:${entroll.AdmissionFee}`
                ).join('<br><br>');
               

                const enCourse=matchingCourse.map(entrollment=>
                    `${entrollment.CourseID} `).join('<br>');
                
    
                const paymentDetails = matchingPayments.map(payment => `
                    Course ID: ${payment.CourseID}, Amount: ${payment.PayAmount}, Date:${payment.Date}
                `).join('<br><br>');
    
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${student.StudentID}</td>
                    <td>${student.FirstName+" "+student.LastName}</td>
                    <td>${student.Age}</td>
                    <td>${student.dob}</td>
                    <td>${student.NICNumber}</td>
                    <td>${enCourse||"No Courses"}</td>
                    <td>${student.Gender}</td>
                    <td>${admission||'No paid'}</td>
                    <td>${paymentDetails || 'No Payments'}</td>
                    <td>${student.TelNumber}</td>
                `;
    
                reportTableBody.appendChild(newRow);
            });
    
            // Store the generated report in localStorage
            localStorage.setItem('studentReports', reportTableBody.innerHTML);
        }
    
        // Function to load the saved report (if any)
        function loadSavedReport() {
            const savedReport = localStorage.getItem('Reports');
            if (savedReport) {
                document.querySelector('#adminReport-table tbody').innerHTML = savedReport;
            }
        }
    
        // Generate the report when the "Generate Report" button is clicked
        document.getElementById('generateReport').addEventListener('click', generateReport);
    
        // Load saved report on page load
        loadSavedReport();
    });