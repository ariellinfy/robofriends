import React from 'react';

const SearchBox = ({ searchChange }) => {
return (
	<div className ='pa2'>
		<input 
			className = 'pa3 ba b--green bg-lightest-blue'
			type='search' 
			placeholder='search robots' 
			onChange={searchChange} //onchange event in html? an event: listening to anytime the input changes
		/>
	</div>
	);
}

export default SearchBox;