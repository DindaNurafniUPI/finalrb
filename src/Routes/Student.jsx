import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentTable = ({ students, handleDelete }) => {
  return (
    <table id="table-student">
      <thead>
        <tr>
          <th>No</th>
          <th>Full Name</th>
          <th>Faculty</th>
          <th>Program Study</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id} className="student-data-row">
            <td>{index + 1}</td>
            <td>
              <Link to={`/student/${student.id}`}>{student.fullName}</Link>
            </td>
            <td>{student.faculty}</td>
            <td>{student.programStudy}</td>
            <td>
              <button
                onClick={() => handleDelete(student.id)}
                data-testid={`delete-${student.id}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/students");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStudents(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFaculty === "All") {
      setFilteredStudents(students);
    } else {
      const filteredData = students.filter(
        (student) => student.faculty === selectedFaculty
      );
      setFilteredStudents(filteredData);
    }
  }, [selectedFaculty, students]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
        setFilteredStudents(filteredStudents.filter((student) => student.id !== id));
      })
      .catch((error) => console.log(error));
  };
  

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  return (
    <>
      <h2>Student List</h2>
      <select
        value={selectedFaculty}
        onChange={handleFacultyChange}
        data-testid="filter"
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
      </select>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredStudents.length > 0 ? (
        <StudentTable students={filteredStudents} handleDelete={handleDelete} />
      ) : (
        <p>No students found.</p>
      )}
    </>
  );
};

export default Student;
