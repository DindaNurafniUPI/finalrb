import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import NavBar from "../components/Navbar";


const AddStudent = (props) => {
  //belum definisi contoh
  const [fullName, setFullName] = useState("");
  const [picture, setPicture] = useState("");
  //lanjutkan

  // const history = useHistory();


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      fullname: "",
      profilePicture: "",
      address: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      programStudy: "",
    };

    // Set faculty based on program study
    let faculty = "";
    const { programStudy } = formData;
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Teknik Sipil":
      case "Arsitektur":
        faculty = "Fakultas Teknik";
        break;
      case "Matematika":
      case "Fisika":
      case "Informatika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      default:
        break;
    }

    //ini ndak usah
  //   const newStudent = {
  //     ...formData,
  //     faculty: faculty,
  //   };

  props.handleadd(formData);

  //terus dikasih set value contoh

  setFullName("");
  setPicture("");

  //ini dipindah app.js
  //   fetch("http://localhost:3000/students", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newStudent),
  //   })
  //     .then(() => {
  //       history.push("/student");
  //     })
  //     .catch((error) => console.log(error));
  // };
  };

  return (
    <>
    <NavBar />
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            data-testid="name"
            required
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            data-testid="profilePicture"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            data-testid="address"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            data-testid="phoneNumber"
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            data-testid="date"
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            data-testid="gender"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="programStudy">Program Study:</label>
          <select
            id="programStudy"
            name="programStudy"
            value={formData.programStudy}
            onChange={handleInputChange}
            data-testid="prody"
            required
          >
            <option value="">Select Program Study</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">Hubungan Internasional</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>
        </div>
        <button type="submit" data-testid="add-btn">
          Add Student
        </button>
      </form>
    </>
  );
};

export default AddStudent;
