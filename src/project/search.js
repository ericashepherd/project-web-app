import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./styles.css";


function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const fetchVideos = async (search) => {
    const results = await client.findVideos(search);
    setResults(results);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {
      fetchVideos(search);
    }
  }, [search]);

  return (
    <div className="mt-3">
      <h1 className="wd-gray">Search</h1>
      <div className="wd-max-width">
        <div className="row wd-max-width">
          <div className="col-8 wd-max-width">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div className="col wd-max-width">
            <button
              onClick={() => navigate(`/search/${searchTerm}`)}
              className="btn btn-success w-100"
            >
              Search
            </button>
          </div>
        </div>
        <hr/>
      </div>

      {results && <h4 className="wd-gray wd-center-align">Results</h4>}
      <ul className="list-group wd-links">
        {results &&
          results.map((item, index) => (
            <Link to={`/details/${item.id.videoId}`}>
              <li key={index} className="list-group-item">
                <div className="row wd-center-align">
                  <div className="col">
                      <h3 className="wd-red">{item.snippet.title}</h3>
                    </div>
                  <div className="col">
                    <img
                      className="float-end"
                      src={item.snippet.thumbnails.default.url}
                      alt={item.snippet.title}
                    />
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ul>
      {results && <><br/><hr/><br/></>}
    </div>
  );
}

export default Search;
