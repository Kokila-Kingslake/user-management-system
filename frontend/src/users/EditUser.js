import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"; // ✨ added useCallback
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🚀 Fix: useCallback to memoize loadUser
  const loadUser = useCallback(async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  }, [id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]); // no warnings now ✅

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
