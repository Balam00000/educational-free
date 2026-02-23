
const courses = [
     { id: 1, name: "Java", price: getRandomPrice(), img: "images/java.png" },
     { id: 2, name: "Python", price: getRandomPrice(), img: "images/python.png" },
     { id: 3, name: "C++", price: getRandomPrice(), img: "images/cpp.png" },
      { id: 4, name: "Js", price: getRandomPrice(), img: "images/js.png" },
         { id: 5, name: "C#", price: getRandomPrice(), img: "images/cp.png" },
            { id: 6, name: "SQL", price: getRandomPrice(), img: "images/sql.png" },
                 { id: 7, name: "Swift", price: getRandomPrice(), img: "images/swift.png" },
                    { id: 8, name: "Kotlin", price: getRandomPrice(), img: "images/kotlin.png" },
                       { id: 9, name: "PHP", price: getRandomPrice(), img: "images/php.png" }
 ];
//   const name = document.getElementById("student-name").value;

//      const email = document.getElementById("student-email").value;

 function getRandomPrice() {
     return Math.floor(Math.random() * 5000) + 1000;
 }

 // Load courses dynamically in student panel
 document.addEventListener("DOMContentLoaded", function() {
     const courseContainer = document.getElementById("courses");
     if (courseContainer) {
         courses.forEach(course => {
             const courseCard = document.createElement("div");
             courseCard.classList.add("course-card");
             courseCard.innerHTML = `
                 <img src="${course.img}" alt="${course.name}">
                 <h3>${course.name}</h3>
                 <p>Price: ₹${course.price}</p>
                 <button onclick="viewCourse(${course.id})">View Course</button>

             `;
             courseContainer.appendChild(courseCard);

         });

     }

     // Load enrolled students in admin panel
     const studentList = document.getElementById("student-list");
     if (studentList) {
         loadStudents();
     }

     // Load course details in course.html
     const params = new URLSearchParams(window.location.search);
     const courseId = params.get("id");
     if (courseId) {
         const course = courses.find(c => c.id == courseId);
         if (course) {
             document.getElementById("course-img").src = course.img;
             document.getElementById("course-name").textContent = course.name;
             document.getElementById("course-price").textContent = "Price: ₹" + course.price;
         }
     }
 });

 // Navigate to course page
 function viewCourse(id) {
     window.location.href = `course.html?id=${id}`;
 }


 function enroll() {
     const studentName = document.getElementById("student-name").value;
     const courseName = document.getElementById("course-name").textContent;
     const studentEmail = document.getElementById("student-email").value;

     if (studentName.trim() === "") {
         alert("Please enter your name");
         return;
     }
     if (studentEmail.trim() === "") {
         alert("Please enter your email");
         return;
     }


     const studentData = {studentName, courseName, studentEmail};
      // Append image file

     // Send to backend
     fetch("http://localhost:2000/Course/Create", {
         method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(studentData)// Send as FormData, no need to set headers manually
     })
     .then(response => response.json())
     .then(data => {
         alert("Enrollment Successful!");
         window.location.href = "index.html";
     })
     .catch(error => console.error("Error:", error));
 }



 function loadStudents() {
     fetch("http://localhost:2000/Course/GetAll")
         .then(response => response.json())
         .then(data => {
             const studentList = document.getElementById("student-list");
             studentList.innerHTML = "";
             data.forEach(student => {
                 const row = `<tr><td>${student.courseId}</td><td>${student.studentName}</td><td>${student.courseName}</td><td>${student.studentEmail}</td>
                 <td> <button class="btn-on" onclick="deleteStudent(${student.courseId})">Delete</button></td></tr>`;
                 studentList.innerHTML += row;
             });
         })
         .catch(error => console.error("Error:", error));
 }
 function deleteStudent(courseId){
         fetch("http://localhost:2000/Course/Delete/" +courseId, {method:"DELETE"})

   .then(()=>
    {
   alert("Deleted");
    loadStudents();
    })

     .catch(error => console.error("Error:",error));
    }
  function navigateToHome()
      {
        window.location.href = "home.html";
    }
  function logout()
       {
          window.location.href = "home.html";
    }
   function search()
      {
          const lin=document.getElementById("sear-ch").value;
           const found=false;
           courses.forEach(cours => {
            if(cours.name==lin)
        {
              window.location.href = `course.html?id=${cours.id}`;
       }
     })
  }
 function trigger()
 {
     window.location.href="add.html";
     }


 function change()
 {
    if (document.body.style.background === "black") {
          document.body.style.background = "white";
          document.body.style.color = "black";
      } else {
          document.body.style.background = "black";
          document.body.style.color = "white";
      }
 }
 function add()
 {
 window.location.href = "home.html";
 }
//function c() {
//    const courseNameInput = document.getElementById("course-name"); // Assuming there's an input field with this ID
//    if (courseNameInput) {
//        const coursename = courseNameInput.value.trim();
//        if (coursename === "") {
//            alert("Please enter a valid course name.");
//            return;
//        }
//
//        // Create a new course object
//        const newCourse = {
//            id: courses.length + 1,
//            name: coursename,
//            price: getRandomPrice(),
//            img: "images/default.png" // Change this if user uploads an image
//        };
//
//        // Add to the courses array
//        courses.push(newCourse);
//
//        // Update the display
//        const courseContainer = document.getElementById("courses");
//        if (courseContainer) {
//        window.location.href = "home.html";
//            const courseCard = document.createElement("div");
//            courseCard.classList.add("course-card");
//            courseCard.innerHTML = `
//                <img src="${newCourse.img}" alt="${newCourse.name}">
//                <h3>${newCourse.name}</h3>
//                <p>Price: ₹${newCourse.price}</p>
//                <button onclick="viewCourse(${newCourse.id})">View Course</button>
//            `;
//            courseContainer.appendChild(courseCard);
//        }
//
//
//        console.log("Course added:", newCourse);
//        alert("Course added successfully!");
//    } else {
//        console.error("Element with ID 'new-course-name' not found!");
//    }
//
//}
function c() {
    const courseNameInput = document.getElementById("course-name"); // Input field for the new course name
    if (courseNameInput) {
        const coursename = courseNameInput.value.trim();
        if (coursename === "") {
            alert("Please enter a valid course name.");
            return;
        }

        // Create a new course object
        const newCourse = {
            id: courses.length + 1,
            name: coursename,
            price: getRandomPrice(),
            img: "images/default.png" // Default image, modify if needed
        };

        // Add course to the array
        courses.push(newCourse);
        console.log("Updated courses array:", courses); // Debugging

        // Call function to update display
        displayCourses();
    } else {
        console.error("Element with ID 'new-course-name' not found!");
    }
}

function displayCourses() {
//window.location.href = "home.html";
    const courseContainer = document.getElementById("courses");

    if (courseContainer) {
    window.location.href = "home.html";
        // Clear existing courses before updating
        courseContainer.innerHTML = "";

        // Loop through courses and display them
        courses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            courseCard.innerHTML = `
                <img src="${course.img}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p>Price: ₹${course.price}</p>
                <button onclick="viewCourse(${course.id})">View Course</button>
            `;
            courseContainer.appendChild(courseCard);
        });

        console.log("Courses displayed successfully!");
    } else {
        console.error("Element with ID 'courses' not found!");
    }
}
//function c() {
//    const courseNameInput = document.getElementById("course-name"); // Input field for the new course name
//    if (courseNameInput) {
//        const coursename = courseNameInput.value.trim();
//        if (coursename === "") {
//            alert("Please enter a valid course name.");
//            return;
//        }
//
//        // Create a new course object
//        const newCourse = {
//            id: courses.length + 1,
//            name: coursename,
//            price: getRandomPrice(),
//            img: "images/default.png" // Default image, modify if needed
//        };
//
//        // Add course to the array
//        courses.push(newCourse);
//        console.log("Updated courses array:", courses); // Debugging
//
//        // Call function to update display
//        displayCourses();
//    } else {
//        console.error("Element with ID 'new-course-name' not found!");
//    }
//}
