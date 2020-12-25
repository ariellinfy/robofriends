import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

// STATE >> PROPS (parent feeds state to child component, as soon as a child receives a state, it's a property. That child can never change that property)
// 	ie. parent tells child what the 'state' is and child receives it as props (robots)

// STATE: an object that describes your app (in this case, robots and entry in searchbox)
// PROPS: never change, pure, get input then return one output, things that come out of 'state'

function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState('');

	useEffect(() => {
		fetch('http://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => setRobots(users))
	}, [])

	const onSearchChange = (event) => {
		setSearchfield(event.target.value);
	}

	const filteredRobots = robots.filter(robot => 
		robot.name.toLowerCase().includes(searchfield.toLowerCase())
	)

	return !robots.length ?
		<h1>Loading</h1>:
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

export default App;

//Input listener (SearchBox.js) >> app onSearchChange (App.js) >> update searchfield (App.js) >> compare and filter robot name (App.js) >> filter robots (CardList.js)