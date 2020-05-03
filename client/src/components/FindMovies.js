import React from 'react';
import '../style/FindMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import FindMoviesRow from './FindMoviesRow';

export default class FindMovies extends React.Component {
  constructor(props) {
    super(props);

    // State maintained by this React component is the selected movie name,
    // and the list of recommended movies.
    this.state = {
      movieName: "",
      recMovies: []
    }

    this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
    this.submitMovie = this.submitMovie.bind(this);
  }

  handleMovieNameChange(e) {
    this.setState({
      movieName: e.target.value
    });
  }

  submitMovie() {

    fetch("http://localhost:8081/findmovies/" + this.state.movieName.replace(/\ /g,"_"),
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(MoviesList => {
      console.log(MoviesList); //displays your JSON object in the console
      let MoviesDivs = MoviesList.map((movieObj, i) => 

        <FindMoviesRow movieName={movieObj.movieName} year={movieObj.year} rating={movieObj.rating}/>
        );

      //This saves our HTML representation of the data into the state, which we can call in our render function
      this.setState({
        recMovies: MoviesDivs
      });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
    
  }

  
  render() {

    return (
      <div className="FindMovies">
      <PageNavbar active="FindMovies" />
        <div className="container recommendations-container">  
          <div className="jumbotron">
              <h1 className="display-4">Find Movies</h1>
              <p className="lead">Get start with searching for intersting movies ...</p>
              <br></br>
              <div className="input-group mb-3">
                <input type="text" placeholder="1917" value={this.state.movieName} onChange={this.handleMovieNameChange} className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" id="movieName" />
                <div className="input-group-append">
                  <button id="submitMovieBtn" className="btn btn-outline-secondary" onClick={this.submitMovie} type="button">Search</button>
                </div>
              </div>
              <div className="header-container">
                <div className="h6">The movies you might search for ...</div>
                <div className="headers">
                  <div className="header"><strong>Movie Name</strong></div>
                  <div className="header"><strong>Year</strong></div>
                  <div className="header"><strong>Rating</strong></div>
                </div>
              </div>
              <div className="results-container" id="results">
                {this.state.recMovies}
              </div>
          </div>
      </div>
    </div>
    );
  }
}