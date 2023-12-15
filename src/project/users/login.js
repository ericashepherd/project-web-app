import * as client from "./client";
import * as filepaths from "../constants/filepaths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import "../styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.login(credentials);
      dispatch(setCurrentUser(user));
      navigate(filepaths.PROFILE_PATH);
    } catch (err) {
      //setError(err.response.data.message);
      setError("Invalid credentials")
    }
  };

  return (
    <div className="d-flex wd-max-width px-4 pt-5 justify-content-center">
      <div className="wd-center-align">        
        <h1 className="wd-gray">Login</h1>
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
        <button onClick={login} className="btn btn-outline-success w-100">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;
