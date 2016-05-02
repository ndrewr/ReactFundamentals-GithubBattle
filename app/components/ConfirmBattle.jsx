const React = require('react');

function puke (obj) {
	return <pre>{JSON.stringify(obj, null, '')}</pre>
}

const ConfirmBattle = function (props) {
	return props.isLoading
	? <p> LOADING </p>
	: <div> CONFIRM BATTLE! {puke(props)}</div>
}

module.exports = ConfirmBattle;