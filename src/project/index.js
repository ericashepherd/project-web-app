
import Home from "./home";
import Login from "./users/login";
import Register from "./users/register";
import Profile from "./users/profile";
import UserTable from "./users/table";
import * as filepaths from "./constants/filepaths";
import store from "./store";
import { Provider } from "react-redux";

import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./nav";
import CurrentUser from "./users/currentUser";
import Search from "./search";
import Details from "./details";
import UserDetails from "./users/details";

import banner from "./images/banner2.jpg";
import "./styles.css";

function Project() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <div className="mx-0 my-0 px-0 py-0">
          <div className="wd-image-container row mx-0 my-0 px-0 py-0">
            <img src={banner} alt="banner" className="wd-banner mx-0 my-0 px-0 py-0"></img>
            <h1 className="wd-title mx-0 my-0 px-2 py-0">
              少林山東太極螳螂武術學院
              <h2>Shaolin Tai Chi Praying Mantis Institute
              </h2>
            </h1>
          </div>
            <div className="wd-content-container row mx-0 my-0 px-0 py-0 ">   
              <div className="row wd-center-align wd-max-width mx-0 my-0 px-0 py-0">
                  <Nav />
              </div>
              <div className="row mx-0 my-0 px-0 py-0">
                  <Routes>
                    <Route path="/" element={<Navigate to={filepaths.HOME_PATH}  />} />
                    <Route path={filepaths.HOME_PATH} element={<Home />} />
                    <Route path={filepaths.LOGIN_PATH} element={<Login />} />
                    <Route path={filepaths.PROFILE_PATH} element={<Profile />} />
                    <Route path={filepaths.PROFILE_ID_PATH} element={<UserDetails />} />
                    <Route path={filepaths.REGISTER_PATH} element={<Register />} />
                    <Route path={filepaths.ADMIN_PATH} element={<UserTable />} />
                    <Route path={filepaths.SEARCH_PATH} element={<Search />} />
                    <Route path={filepaths.SEARCH_ID_PATH} element={<Search />} />
                    <Route path={filepaths.VID_DETAILS_PATH} element={<Details />} />
                  </Routes>
              </div>
            </div>

        </div>
      </CurrentUser>
    </Provider>
  );
}

export default Project;
