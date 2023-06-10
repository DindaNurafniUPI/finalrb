import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Welcome to Student Portal</h1>
      <Link to="/student" data-testid="student-btn">
        <button>All Students</button>
      </Link>
    </>
  );
};

export default Home;
