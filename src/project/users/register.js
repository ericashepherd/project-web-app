import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import * as filepaths from "../constants/filepaths";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const register = async () => {
    try {
      await client.register({username, password});
      const credentials = { username: username, password: password };
      const user = await client.login(credentials);
      dispatch(setCurrentUser(user));
      navigate(filepaths.PROFILE_PATH);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="d-flex wd-max-width px-4 pt-5 justify-content-center">
      <div className="wd-center-align">
        <h1 className="wd-gray">Register</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="form-control mb-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="form-control mb-2"
        />
        <button onClick={register} className="btn btn-outline-success w-100">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Register;
