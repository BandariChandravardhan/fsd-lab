const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let students = [{
    name : "Bheeshma",
    rollno : "160124748093",
    gpa : 8.7,
    semester : 3,
    mobile : "9876543210"
},{
    name : "Pranav",
    rollno : "160124748099",
    gpa : 9.0,
    semester : 4,
    mobile : "9876543211"
},
    {
    name : "Bhargav",
    rollno : "160124748118",
    gpa : 9.5,
    semester : 4,
    mobile : "9876543211"
},
    
]

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

app.get(["/students", "/api/students"], (req, res) => {
    res.json(students);
});

app.get(["/students/:rollno", "/api/students/:rollno"], (req, res) => {
    const student = students.find((item) => item.rollno === req.params.rollno);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
});

app.post(["/students", "/api/students"], (req, res) => {
    const { name, rollno, gpa, semester, mobile } = req.body;
    if (!name || !rollno || gpa === undefined || semester === undefined || !mobile) {
        return res.status(400).json({ error: "name, rollno, gpa, semester, and mobile are required" });
    }
    if (students.some((student) => student.rollno === String(rollno))) {
        return res.status(409).json({ error: "A student with this roll number already exists" });
    }

    const student = { name, rollno: String(rollno), gpa, semester, mobile };
    students.push(student);
    res.status(201).json(student);
});

app.put(["/students/:rollno/promote", "/api/students/:rollno/promote"], (req, res) => {
    const student = students.find((item) => item.rollno === req.params.rollno);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    const previousSemester = student.semester;
    student.semester += 1;
    res.json({
        message: `Student promoted from semester ${previousSemester} to semester ${student.semester}`,
        student
    });
});

app.delete(["/students/:rollno", "/api/students/:rollno"], (req, res) => {
    const studentIndex = students.findIndex((item) => item.rollno === req.params.rollno);
    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    const [deletedStudent] = students.splice(studentIndex, 1);
    res.json({ message: "Student deleted successfully", student: deletedStudent });
});

app.listen(PORT, () => {
    console.log(`Student Management API listening on port ${PORT}`);
});
