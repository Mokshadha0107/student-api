const express = require("express");
const app = express();
app.use(express.json());

// Initial student records
let students = [
  { id: 101, name: "Mokshadha", age: 20, department: "CSE" },
  { id: 102, name: "Sneha", age: 21, department: "CSE" },
  { id: 103, name: "Shalini", age: 22, department: "ECE" }
];

// 1. GET: Retrieve all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// 2. GET: Retrieve a student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

// 3. POST: Add a new student
app.post("/students", (req, res) => {
  const { name, age, department } = req.body;
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 101;
  const student = { id: newId, name, age: Number(age), department };
  students.push(student);
  res.status(201).json(student);
});

// 4. PATCH: Update selected student fields
app.patch("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const { name, age, department } = req.body;
  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = Number(age);
  if (department !== undefined) student.department = department;
  res.status(200).json(student);
});

// 5. DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
});