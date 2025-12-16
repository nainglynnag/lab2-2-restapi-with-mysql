const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

function isValidateDataTypes(student) {
  const {
    student_id,
    name,
    date_of_birth,
    guardian_name,
    ph_no,
    email,
    address,
  } = student;

  if (
    typeof student_id !== "string" ||
    typeof name !== "string" ||
    typeof date_of_birth !== "string" ||
    typeof guardian_name !== "string" ||
    typeof ph_no !== "number" ||
    (email && typeof email !== "string") ||
    (address && typeof address !== "string")
  ) {
    return false;
  }

  return true;
}

const isExistingStudent = async (student_id) => {
  const data = await db.query(`SELECT * FROM students WHERE student_id = ?`, [
    student_id,
  ]);

  return data[0].length > 0;
};

// Get all students
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;

    const students = await db.query(
      `SELECT * FROM students
        LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.status(200).json({
      meta: {
        page: page,
        limit: limit,
        total: students[0].length,
      },
      data: students[0],
      link: {
        self: `/api/students?page=${page}&limit=${limit}`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db.query(
      `SELECT * FROM students WHERE student_id = ?`,
      [id]
    );

    if (student[0].length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      data: { ...student[0][0] },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new student
router.post("/", async (req, res) => {
  try {
    const {
      student_id,
      name,
      date_of_birth,
      guardian_name,
      ph_no,
      email,
      address,
    } = req.body;

    // Validate required fields
    if (!student_id || !name || !date_of_birth || !guardian_name || !ph_no) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate data types
    const typePass = isValidateDataTypes(req.body);
    if (!typePass) return res.status(400).json({ error: "Invalid data types" });

    // Check for duplicate student_id
    const existingStudent = await isExistingStudent(student_id);
    if (existingStudent)
      return res.status(409).json({ error: "Student ID already exists" });

    await db.query(
      `INSERT INTO students (student_id, name, date_of_birth, guardian_name, ph_no, email, address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_id, name, date_of_birth, guardian_name, ph_no, email, address]
    );

    res.status(201).json({
      message: "Student created successfully",
      data: {
        student_id,
        name,
        date_of_birth,
        guardian_name,
        ph_no,
        email: email || null,
        address: address || null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date_of_birth, guardian_name, ph_no, email, address } =
      req.body;

    // Validate required fields
    if (!name || !date_of_birth || !guardian_name || !ph_no) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate data types
    const typePass = isValidateDataTypes({ student_id: id, ...req.body });
    if (!typePass) return res.status(400).json({ error: "Invalid data types" });

    // Check if student exists
    const existingStudent = await isExistingStudent(id);

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    await db.query(
      `UPDATE students
      SET name = ?, date_of_birth = ?, guardian_name = ?, ph_no = ?, email = ?, address = ?
      WHERE student_id = ?`,
      [
        name,
        date_of_birth,
        guardian_name,
        ph_no,
        email || null,
        address || null,
        id,
      ]
    );

    res.status(200).json({
      message: "Student data updated successfully",
      data: {
        student_id: id,
        name,
        date_of_birth,
        guardian_name,
        ph_no,
        email: email || null,
        address: address || null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const existingStudent = await isExistingStudent(id);

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    await db.query(`DELETE FROM students WHERE student_id = ?`, [id]);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
