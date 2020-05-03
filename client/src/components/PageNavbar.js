import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['Dashboard','FindMovies', 'AwardByYear', 'InterestingFacts', 'InterestingFacts2'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			      	<span className="navbar-brand center">Movie Awards</span>
			      	<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							{this.state.navDivs} 
						</div>

						<ul className = "navbar navbar-nav navbar-right navbar-expand-lg navbar-light bg-light">
							<li><a href = "">Login in</a></li>
						</ul>

			     	</div>
			    </nav>
			</div>
        );
	}
}