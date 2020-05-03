import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class FindMoviesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="movieName">{this.props.movieName}</div>
				<div className="year">{this.props.year}</div>
				<div className="rating">{this.props.rating}</div>
			</div>
		);
	}
}
