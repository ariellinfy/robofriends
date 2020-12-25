import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchfield, requestRobots } from '../redux/actions';

class App extends React.Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}
	
	render() {
		const { searchfield, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => 
			robot.name.toLowerCase().includes(searchfield.toLowerCase()));
		return isPending ?
			<h1>Loading</h1> :
		(
			<div className = 'tc'>
				<h1 className = 'f1'>RoboFriends</h1>
				<SearchBox searchChange = {onSearchChange}/>
				<Scroll>
				<ErrorBoundry>
					<CardList robots = {filteredRobots}/>
				</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	searchfield: state.searchRobots.searchfield,
	robots: state.requestRobots.robots,
	isPending: state.requestRobots.isPending,
	error: state.requestRobots.error,
})

const mapDispatchToProps = (dispatch) => ({
	onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);