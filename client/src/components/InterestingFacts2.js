import React from 'react';
import PageNavbar from './PageNavbar';
import InterestingFacts2Row from './InterestingFacts2Row';
import '../style/InterestingFacts2.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InterestingFacts2 extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			HighestRatingWinNothingYear: "",

			recMovies: [],
			BestPicActorActressSameYearResult: [],
			HighestRatingWinNothingYearResult: [],
			oldestWinnerResults: [],
			youngestWinnerResults: [],
			firstNominationResults:[],
			LeadingRole4timesResults:[],
			Win3awardsResults:[],
			LowestRatingBestOscarStoryResults: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.handleHighestRatingWinNothingYearChange = this.handleHighestRatingWinNothingYearChange.bind(this);

		this.submitMovie = this.submitMovie.bind(this);
		this.submitOldestWinner = this.submitOldestWinner.bind(this);
		this.submitYoungestWinner = this.submitYoungestWinner.bind(this);
		this.submitWinFirstNomination = this.submitWinFirstNomination.bind(this);
		this.submitBestPicActorActressSameYearChange = this.submitBestPicActorActressSameYearChange.bind(this);
		this.submitHighestRatingWinNothingYearChange = this.submitHighestRatingWinNothingYearChange.bind(this);
		this.submitLeadingRole4times = this.submitLeadingRole4times.bind(this);
		this.submitWin3awards = this.submitWin3awards.bind(this);
		this.submitLowestRatingBestOscarStory = this.submitLowestRatingBestOscarStory.bind(this);
		
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}

	handleBestPicActorActressSameYearChange(e) {
		this.setState({
			BestPicActorActressSameYear: e.target.value
		});
	}

	handleHighestRatingWinNothingYearChange(e) {
		this.setState({
			HighestRatingWinNothingYear: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	submitMovie() {
		fetch("http://localhost:8081/bestPicActorActressSameYear/" + this.state.movieName,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(moviesList => {
			console.log(moviesList); //displays your JSON object in the console
			let moviesDivs = moviesList.map((movie, i) => 
			<InterestingFacts2Row id={"movies-" + movie.title} title={movie.title} id = {movie.id} rating = {movie.rating} vote_count = {movie.vote_count}/>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				recMovies: moviesDivs
			});
		});
	}


	submitBestPicActorActressSameYearChange() {
		fetch("http://localhost:8081/bestPicActorActressSameYear",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultsList => {
			console.log(resultsList); //displays your JSON object in the console
			let resultsDivs = resultsList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.film_title} title={result.film_title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: resultsDivs,
				oldestWinnerResults: [],
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: []
			});
		});
	}

	submitHighestRatingWinNothingYearChange() {
		fetch("http://localhost:8081/highestRatingWinNothing/" + this.state.HighestRatingWinNothingYear,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultsList => {
			console.log(resultsList); //displays your JSON object in the console
			let resultsDivs = resultsList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} title={result.title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				HighestRatingWinNothingYearResult: resultsDivs,

			});
		});
	}

	submitOldestWinner() {
		fetch("http://localhost:8081/oldestWinner",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} nominees={result.nominee} number = {result.number+" times of nomination"} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				oldestWinnerResults: resultDivs,
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: []
			});
		});
	}

	submitYoungestWinner() {
		fetch("http://localhost:8081/youngestWinner",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} youngestWinner={result.nominee} age={result.age + " year's old"}  />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				oldestWinnerResults: [],
				youngestWinnerResults: resultDivs,
				firstNominationResults: [],
				LeadingRole4timesResults: []
			});
		});
	}


	submitWinFirstNomination() {
		fetch("http://localhost:8081/winFirstNomination",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} WinFirstNominationActor={result.nominee}  />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				oldestWinnerResults: [],
				youngestWinnerResults: [],
				firstNominationResults: resultDivs,
				LeadingRole4timesResults: []
			});
		});
	}


	submitLeadingRole4times() {
		fetch("http://localhost:8081/leadingRole4times",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.nominee} leadingRole4timesActor={result.nominee} leadingRoleTimes={result.number+" times"} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				BestPicActorActressSameYearResult: [],
				oldestWinnerResults: [],
				youngestWinnerResults: [],
				firstNominationResults: [],
				LeadingRole4timesResults: resultDivs
			});
		});
	}


	submitWin3awards() {
		fetch("http://localhost:8081/win3awards",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} win3prizeTitle={result.title} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				Win3awardsResults: resultDivs,
				LowestRatingBestOscarStoryResults: []
			});
		});
	}


	submitLowestRatingBestOscarStory() {
		fetch("http://localhost:8081/lowestRatingBestOscarStory",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(resultList => {
			console.log(resultList); //displays your JSON object in the console
			let resultDivs = resultList.map((result, i) => 
			<InterestingFacts2Row id={"movies-" + result.title} LowestRatingBestOscarStoryTitle={result.title} LowestRatingBestOscarStoryRating={"rating: "+result.rating} />
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				Win3awardsResults: [],
				LowestRatingBestOscarStoryResults: resultDivs
			});
		});
	}

	
	render() {

		return (
			<div className="InterestingFacts2">
				<PageNavbar active="InterestingFacts2" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		
			    		<div className="h5">Interesting Facts</div>
			    		<br></br>
			    		<div>
			    		<p><br/></p>
			    		</div>
			    		<div className="input-container">
			    			<p>2. Movies of highest rating of that year but win nothing in that year’s awards (Please select a year)</p>
			    			<input type='text' placeholder="Enter Year" value={this.state.HighestRatingWinNothingYear} onChange={this.handleHighestRatingWinNothingYearChange} id="BestPicActorActressSameYear" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitHighestRatingWinNothingYearChange}>Submit</button>
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.HighestRatingWinNothingYearResult}
			    		</div>
			    	</div>

			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about actors?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitLeadingRole4times}> Actor nominated “Actor in a leading role” over 4 times but never won </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitYoungestWinner}> Youngest Winner </div> &nbsp;
			    				<div button className = "btn btn-info" > Most nomination </div> &nbsp;
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitOldestWinner}> Actor won most in a certain prize </div> &nbsp;
			    				<div button className = "btn btn-info"> Actor won most "Best Actor in supporting role" </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitWinFirstNomination}> Actors won at the first nomination </div> 
			    			</div>
			    		</div>
			    		<div className="oldestWinner-results-container" id="results">
			    			{this.state.oldestWinnerResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.firstNominationResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.youngestWinnerResults}
			    		</div>
			    		<div className="winFirstNomination-results-container" id="results">
			    			{this.state.LeadingRole4timesResults}
			    		</div>
			    	</div>
			    	<div className = "jumbotron">
			    		<div className="header-container">
			    			<div className="h4">Do you want to know something about movies?</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitBestPicActorActressSameYearChange}> Movies won best picture, best actor and actress at the same year </div> &nbsp;
			    				<div button className = "btn btn-info" onClick={this.submitWin3awards}> Movies won all the three prizes </div> &nbsp;
			    			</div>
			    			<div className="headers">
			    				<div button className = "btn btn-info" onClick={this.submitLowestRatingBestOscarStory}> Top 10 lowest rating movies which won Oscar best story</div> &nbsp;
			    				<div button className = "btn btn-info"> Won most nominees in a year </div> &nbsp;
			    				<div button className = "btn btn-info"> Nominated, but won nothing </div> 
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.Win3awardsResults}
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.LowestRatingBestOscarStoryResults}
			    		</div>
			    		<div className="HighestRatingWinNothingYear-results-container" id="results">
			    			{this.state.BestPicActorActressSameYearResult}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}