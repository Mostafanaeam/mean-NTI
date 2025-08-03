// Task 1: Create Database
use FacultySystemDB;

// Task 2: Create Collection and Define Data
db.student.insertMany([
  {
    FirstName: "Ahmed",
    LastName: "Ali",
    Age: 22,
    Faculty: {
      Name: "Engineering",
      Address: "123 University Road"
    },
    Grades: [
      { CourseName: "Math", Grade: 85, Pass: true },
      { CourseName: "Physics", Grade: 78, Pass: true }
    ],
    IsFired: false
  },
  {
    FirstName: "Sara",
    LastName: "Mohamed",
    Age: 20,
    Faculty: {
      Name: "Science",
      Address: "45 Main Street"
    },
    Grades: [
      { CourseName: "Biology", Grade: 88, Pass: true },
      { CourseName: "Chemistry", Grade: 92, Pass: true }
    ],
    IsFired: false
  },
  {
    FirstName: "Hassan",
    LastName: "Ahmed",
    Age: 19,
    Faculty: {
      Name: "Arts",
      Address: "78 Arts Blvd"
    },
    Grades: [
      { CourseName: "History", Grade: 72, Pass: true },
      { CourseName: "Philosophy", Grade: 64, Pass: true }
    ],
    IsFired: true
  }
]);

// Task 4: Retrieve Data
// a. All Students
db.student.find();

// b. Student with Specific First Name
db.student.find({ FirstName: "Ahmed" });

// c. Students whose First Name or Last Name is "Ahmed"
db.student.find({
  $or: [
    { FirstName: "Ahmed" },
    { LastName: "Ahmed" }
  ]
});

// d. Students whose First Name isn’t "Ahmed"
db.student.find({ FirstName: { $ne: "Ahmed" } });

// e. Students with Age Less Than 21
db.student.find({ Age: { $lt: 21 } });

// f. All Fired Students
db.student.find({ IsFired: true });

// g. Students with Age ≥ 21 and Faculty is Not NULL
db.student.find({
  Age: { $gte: 21 },
  Faculty: { $exists: true }
});

// h. Specific Student with Limited Fields
db.student.find(
  { FirstName: "Ahmed" },
  { FirstName: 1, LastName: 1, IsFired: 1 }
);

// Task 5: Update Student's LastName
db.student.updateOne(
  { FirstName: "Ahmed" },
  { $set: { LastName: "Hussein" } }
);

// Task 6: Delete Fired Students
db.student.deleteMany({ IsFired: true });

// Task 7: Delete All Students Collection
db.student.drop();

// Task 8: Delete the Whole Database
db.dropDatabase();

// Task 9: Create New Database and Collections
use FacultySystemV2;

// a. Create and Populate `student` Collection
db.student.insertMany([
  {
    FirstName: "Ahmed",
    LastName: "Ali",
    IsFired: false,
    FacultyID: "FAC01",
    Courses: [
      { CourseID: "CSE101", Grade: 88 },
      { CourseID: "CSE102", Grade: 90 }
    ]
  },
  {
    FirstName: "Sara",
    LastName: "Mohamed",
    IsFired: false,
    FacultyID: "FAC02",
    Courses: [
      { CourseID: "BIO101", Grade: 85 },
      { CourseID: "BIO102", Grade: 89 }
    ]
  }
]);

// b. Create and Populate `Faculty` Collection
db.faculty.insertMany([
  { FacultyID: "FAC01", Name: "Engineering", Address: "123 University Road" },
  { FacultyID: "FAC02", Name: "Science", Address: "45 Main Street" }
]);

// c. Create and Populate `Course` Collection
db.course.insertMany([
  { CourseID: "CSE101", Name: "Computer Science 101", FinalMark: 100 },
  { CourseID: "BIO101", Name: "Biology 101", FinalMark: 100 }
]);
