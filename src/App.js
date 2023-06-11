import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import Student from "./Routes/Student";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  // let navigate = useNavigate();

  const renderStudents = async () => {
    try {
        const respone = await fetch("http://localhost:3001/student");
        const result = await respone.json();
        setStudents(result);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
};

const handleadd = async (student) => {
    try {
        await fetch("http://localhost:3001/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });
        renderStudents();
        navigate("/student");
    } catch (error) { }
};

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddStudent handleadd={handleadd} />} />
        <Route path="student" element={<Student />}>
          <Route index element={<Student />} />
          <Route path=":id" element={<EditStudent />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
