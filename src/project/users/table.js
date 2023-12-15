import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill,
  BsPencil,
  BsTrash3Fill,
  BsPlusCircleFill,
  BsArrowRight,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import * as client from "./client";
import * as filepaths from "../constants/filepaths";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import "../styles.css";

function UserTable() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("USER"); // ["USER", "ADMIN", "FACULTY", "STUDENT"
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
  });


  // signs out client and returns to login screen
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate(filepaths.LOGIN_PATH);
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
      if (user._id === currentUser._id) {
        signout();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.users();
    setUsers(users);
  };

  const fetchUsersByRole = async (role) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users.filter((u) => u.role === role));
    if (role === "USER"){
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  if (currentUser && currentUser.role==="ADMIN") {
  return (
    <div className="px-5 mt-4">
      <div className="row">
        <div className="col">
          <h1 className="wd-gray">User Table</h1>
        </div>
        <div className="col-2 mb-1">
          <select
            onChange={(e) => fetchUsersByRole(e.target.value)}
            value={role || "USER"}
            className="form-select float-end mt-2"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-light table-striped 
            table-hover table-bordered px-3">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>&nbsp;</th>
            </tr>
            <tr>
              <td>
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="password"
                  type="password"
                  className="form-control w-50 float-end"
                />
                <input
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="username"
                  className="form-control w-50"
                />
              </td>
              <td>
                <input
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  value={user.firstName}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  value={user.lastName}
                  className="form-control"
                />
              </td>
              <td>
                <select
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  value={user.role}
                  className="form-control"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="STUDENT">Student</option>
                </select>
              </td>
              <td className="text-nowrap">
                <BsFillCheckCircleFill 
                  onClick={updateUser}
                  className="me-2 text-success fs-1 text" 
                />
                <BsPlusCircleFill
                  onClick={createUser}
                  className="text-success fs-1 text"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td className="text-nowrap">
                  <button className="btn btn-danger me-2">
                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                  </button>
                  <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectUser(user)} />
                  </button>
                  <BsArrowRight
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="text-success fs-1 text"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
  else{
    return("Unathorized Access: Please log in as an Admin.")
  }
}

export default UserTable;
