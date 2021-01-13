import React, { useState } from "react";
//import _ from "lodash";

//import OmdbContainer from "../components/OmdbContainer";
import Container from "../components/Container";
import Card from "../components/Card";
import Row from "../components/Row";
import Col from "../components/Col";
import SearchForm from "../components/SearchForm";
import Movie from "../components/Movie";
import "../App.css";
import API from "../utils/API";

function User() {
  //const [currentUser, setCurrentUser] = useState({});
  const [searchResult, setSearchResult] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  //const [userMovies, setUserMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(() => {
  //   if (_.isEmpty(currentUser)) {
  //     loadUserByName("BobDobalina");
  //   }
  //   if (!_.isEmpty(currentUser)) {
  //     loadUserMovies(currentUser);
  //   }
  // }, [userMovies, currentUser]);

  // function loadUserByName(userName) {
  //   console.log("loadUserByName");
  //   API.getUserByName(userName)
  //     .then((res) => setCurrentUser(res.data))
  //     .catch((err) => {
  //       console.log(err);
  //       return 1;
  //     });
  // }

  function searchMovies() {
    API.search(searchTerm)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(errorMessage);
      });
  }

  function saveMovie() {
    const movieData = {
      title: searchResult.Title,
      year: searchResult.Year,
      rated: searchResult.Rated,
      genre: searchResult.Genre,
      runtime: searchResult.Runtime,
      director: searchResult.Director,
      actors: searchResult.Actors,
      plot: searchResult.Plot,
      poster: searchResult.Poster,
      type: searchResult.Type,
      imdbID: searchResult.imdbID,
    };
    API.saveMovie(movieData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        setErrorMessage(err);
        console.log(errorMessage);
      });
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  // function loadUserMovies({ movies }) {
  //   setUserMovies(movies);
  // }
  return (
    <Container fluid="true">
      <Row>
        <Col size="md-12">
          <Card title="Movie Search">
            <SearchForm
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              q={searchTerm}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          {searchResult.Title ? (
            <Movie
              title={searchResult.Title}
              year={searchResult.Year}
              rated={searchResult.Rated}
              genre={searchResult.Genre}
              runtime={searchResult.Runtime}
              director={searchResult.Director}
              actors={searchResult.Actors}
              plot={searchResult.Plot}
              poster={searchResult.Poster}
              type={searchResult.Type}
              imdbID={searchResult.imdbID}
              saveMovie={saveMovie}
            />
          ) : (
            "No Results"
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default User;