const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const transparentBg = require('../styles/index').transparentBg;
const MainContainer = require('./MainContainer.jsx');

const Home = React.createClass({
	render() {
		return (
			<MainContainer>
			<h1> Github Battle </h1>
			<p className='lead'>Some Motto</p>
			<Link to='/playerOne'>
				<button type='button' className='btn btn-lg btn-success'>Get Started</button>
			</Link>
			</MainContainer>
		)
	}
});

module.exports = Home;