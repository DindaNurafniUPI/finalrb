import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";


const EditStudent = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          fullname: data.fullname,
          address: data.address,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          gender: data.gender,
          programStudy: data.programStudy,
        });
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        history.push("/student");
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h2>Edit Student</h2>
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
      <button type="submit" data-testid="edit-btn">
        Edit Student
      </button>
    </>
  );
};

export default EditStudent;
