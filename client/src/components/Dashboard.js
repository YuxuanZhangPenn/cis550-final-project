import React from 'react';
import PageNavbar from './PageNavbar';
import DashboardRow from './DashboardRow';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Dashboard extends React.Component {
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
	      	<option value={yearObj.year}> {yearObj.year} </option>
	      	);
	      	//
	      	this.setState({
	        	years:yearsDivs
	      	});
		});
	}

	handleChange(e) {
		this.setState({
			selectedYear: e.target.value
		});
	}

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
	      	<DashboardRow id={"years-" + years.year} prize={years.prize} 
	      	nominee = {years.nominee} film_title = {years.film_title}/>
	    );

	      	this.setState({
	        	films:yearsDivs
	      	});
		});
	}
	render() {
		return(
			<div className="Dashboard">
				<PageNavbar active="Dashboard" />
					<div class="jumbotron text-center">
						<div class="container-fluid">
						  <h1>Interesting Movie Awards Facts</h1>
						  <p>Do you want to get some recommendations on movies?</p>
						</div>
					</div>
				<div class="jumbotron text-center">
					<div class="row">
						<div class="col-sm-8 py-3 px-lg-5 bg-light">
							<div class="container oscar-container text-left text-light rounded">
								<h6>
									The Academy Awards, more popularly known as the Oscars,
									are awards for artistic and technical merit in the film industry.
									Given annually by the Academy of Motion Picture Arts and Sciences (AMPAS), 
									the awards are an international recognition of excellence in cinematic achievements 
									as assessed by the Academy's voting membership. 
									The various category winners are awarded a copy of a golden statuette, 
									officially called the "Academy Award of Merit", although more commonly 
									referred to by its nickname, the "Oscar". The statuette depicts a knight 
									rendered in the Art Deco style.
								</h6>
							</div>
						</div>
	  					<div class="col-sm-4 py-3 px-lg-5 bg-light">
	  						<div button className = "btn btn-info btn-lg">Know more about Academy Awards</div>
						</div>	
					</div>
					<div class="row no-gutters">
						<div class="col-sm-8 py-3 px-lg-5 bg-light">
							<div class="container oscar-container text-left text-light rounded">
								<h5>
									The Golden Globe Awards are accolades bestowed by the 93 
									members of the Hollywood Foreign Press Association beginning 
									in January 1944,recognizing excellence in film, both American and 
									International, and American television.
									The annual ceremony at which the awards are presented 
									is normally held every January, and is a major part of the 
									film industry's awards season, which culminates 
									each year in the Academy Awards. 
									The eligibility period for the Golden Globes corresponds 
									to the calendar year (i.e. January 1 through December 31).
								</h5>
							</div>
						</div>
	  					<div class="col-sm-4 py-3 px-lg-5 bg-light">
		  					<div class="container button-container">
		  						<div button className = "btn btn-default btn-lg">
		  							Know more about Golden Globe Awards
		  						</div>
		  					</div>
						</div>	
					</div>
					<div class="row no-gutters">
						<div class="col-sm-8 py-3 px-lg-5 bg-light">
							<div class="container oscar-container text-left text-light rounded">
								<h5>
									The British Academy of Film and Television Arts (BAFTA)
									 is an independent charity that supports, develops and promotes 
									 the art forms of the moving image (film, television and games) in 
									 the United Kingdom. In addition to its annual awards ceremonies, 
									 BAFTA has an international programme of learning events and 
									 initiatives offering access to talent through workshops, masterclasses, 
									 scholarships, lectures and mentoring schemes in the United Kingdom and the United States.
								</h5>
							</div>
						</div>
	  					<div class="col-sm-4 py-3 px-lg-5 bg-light">
		  					<div class="container button-container">
		  						<div button className = "btn btn-warning btn-lg">
		  							Know more about BAFTA
		  						</div>
		  					</div>
						</div>	
					</div>
				</div>
			</div>
			);
	}

}