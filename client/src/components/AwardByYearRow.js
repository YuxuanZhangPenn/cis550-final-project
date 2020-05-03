import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AwardByYearRow extends React.Component {
	constructor(props) {
		super(props);
	} 

	render() {
		return (
			<div className="movieResults">
				<div className="prize">{this.props.prize}</div>
				<div className="nominee">{this.props.nominee}</div>
				<div className="film_title">{this.props.film_title}</div>
			</div>
		);
	}
}
