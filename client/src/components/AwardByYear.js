import React from 'react';
import PageNavbar from './PageNavbar';
import AwardByYearRow from './AwardByYearRow';
import '../style/AwardByYear.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AwardByYear extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedYear: "",
			years: [],
			films: []
		};

		this.submitYear = this.submitYear.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		fetch("http://localhost:8081/years",
	    {
	    	method: 'GET' // The type of HTTP request.
	    }).then(res => {
	      // Convert the response data to a JSON.
	      	return res.json();
	    }, err => {
	      // Print the error if there is one.
	      	console.log(err);
	    }).then(yearList => {
	      	let yearsDivs = yearList.map((yearObj, i) =>
	      	<option key={i} value={yearObj.year}> {yearObj.year} </option>
	      	);
	      	//
	      	this.setState({
	        	years:yearsDivs
	      	});
		})
	}

	handleChange(e) {
		this.setState({
			selectedYear: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitYear() {
		fetch("http://localhost:8081/years/" +this.state.selectedYear,
	    {
	    	method: 'GET' // The type of HTTP request.
	    }).then(res => {
	      // Convert the response data to a JSON.
	      	return res.json();
	    }, err => {
	      // Print the error if there is one.
	      	console.log(err);
	    }).then(yearsList => {
	      	let yearsDivs = yearsList.map((years, i) =>
	      	<AwardByYearRow id={"years-" + years.year} prize={years.prize} 
	      	nominee = {years.nominee} film_title = {years.film_title}/>
	    );

	      	this.setState({
	        	films:yearsDivs
	      	});
		});
	}
	render() {
		return (
			<div className="AwardByYear">
				<PageNavbar active="AwardByYear" />

				<div className="container movies-container">
			      <div className="jumbotron">
			        <div className="h2">Please select a year you want to know about Oscar ...</div>
			        <div className="movies-container">
			          <div className="dropdown-container">
			            <select onChange={this.handleChange} className="dropdown" id="yearsDropdown">
			            	<option> -- Select a year -- </option>
			            	{this.state.years}
			            </select>
			            <button className = "btn btn-info" onClick = {this.submitYear}> Submit year </button>
			            
			          </div>
			        </div>
			      </div>
			          <div className="movie">
			            <div className="header"><strong>Prize</strong></div>
			            <div className="header"><strong>Nominee</strong></div>
			            <div className="header"><strong>Film Title</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.films}
			          </div>
			      <div className="jumbotron">
			      <div className="h2">Please select a year you want to know about Golden Awards ...</div>
			        <div className="movies-container">
			          <div className="dropdown-container">
			            <select onChange={this.handleChange} className="dropdown" id="yearsDropdown">
			            	<option> -- Select a year -- </option>
			            	{this.state.years}
			            </select>
			            <button className = "btn btn-info" onClick = {this.submitYear}> Submit year </button>
			        </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}

