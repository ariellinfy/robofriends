import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import {robots} from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

// STATE >> PROPS (parent feeds state to child component, as soon as a child receives a state, it's a property. That child can never change that property)
// 	ie. parent tells child what the 'state' is and child receives it as props (robots)

// STATE: an object that describes your app (in this case, robots and entry in searchbox)
// PROPS: never change, pure, get input then return one output, things that come out of 'state'


class App extends Component { //an object
	constructor() {
		super() //calls the constructor of component
		this.state = { //what describes our app, things that can change, usually live in parent component
			//virtual DOM collects this entire state and React uses this state to render and pass them down as props to below components
			robots : [],
			searchfield: '',
		}
	}

	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/users') //make http request
		.then(response => response.json())
		.then(users => this.setState({robots: users})); //update state
	}

	//fetch is a method on the window object, comes with all browsers now.
	//It is a tool for us to make requests to servers

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
		// console.log(event.target.value); //gives the value of the search term
		// console.log(filteredRobots);
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => 
			robot.name.toLowerCase().includes(searchfield.toLowerCase())
		)
		return !robots.length ?
			<h1>Loading</h1>:
		(
			<div className = 'tc'>
				<h1 className = 'f1'>RoboFriends</h1>
				<SearchBox searchChange = {this.onSearchChange}/>
				<Scroll>
				<ErrorBoundry>
					<CardList robots = {filteredRobots}/>
				</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

export default App;

//Input listener (SearchBox.js) >> app onSearchChange (App.js) >> update searchfield (App.js) >> compare and filter robot name (App.js) >> filter robots (CardList.js)