import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';

// App Components
import ResultScreen from './ResultScreen';
import Keyboard from './Keyboard';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default class App extends Component {

  state = Object.assign( { entered : false }, this.getInitialState() );

  getInitialState() {
    return { 
      username: null,
      a : null,
      b : null,
      c : null,
      step : 0, // steps defines wich property we are editing,
      valSteps : [ 'a', 'b', 'c' ], // for step 0 : we edit state.a, for step 1 state.b, for step 3 state.c
      resultReceived : false ,
      waiting: false,
    };
  }

  // listen to keypress
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  // callback when a key is pressed
  handleKeyDown( event ){
    if( event.code === "Enter" || event.code === 'NumpadEnter' ){
      this.buttonClickHandler();
      this.setState( { entered : true });
      setTimeout( ()=>{
        this.setState( { entered : false });
      }, 100);
    }
  }

  resetCalcul(){
    // reset to intial state
    this.setState( this.getInitialState() );
  }

  // callback method used by the keyboard component to notify the main app
  currentValueUpdated( val ){
    let step = this.state.step;
    if( this.state.resultReceived === true && this.state.step == 2 ){
      this.resetCalcul(); // if value updated and previous result is already obtained , result all operation
      step = 0;
    }
    let newState = {};
    newState[ this.state.valSteps[step] ] = val;
    this.setState(newState);
  }

  // + or = button click handler
  buttonClickHandler(){

    if( this.state.waiting ) return;  // do nothing if calculator is waiting for an answer

    if( this.state.step == 2 && !this.state.waiting ){
      // if we type enter after a calcul done, reset all
      this.resetCalcul();
      return;
    } 

    // update current value 
    if( this.state[ this.state.valSteps[this.state.step]] === null )
      this.currentValueUpdated( 0 );

    let newStep = this.state.step + 1;

    // if step == 2 , we got a and b parameter of the operation, we can ask the server the result
    if( newStep == 2 ){
      const params = new URLSearchParams();
      params.append('a', this.state.a || 0 );
      params.append('b', this.state.b || 0 );

      // do operation server's side
      fetch('/api/do', { method: 'POST', body: params })
        .then(res => res.json())
        .then(result => {
          this.currentValueUpdated( result.value );
          this.setState({ resultReceived : true, waiting : false });
        });

      this.setState({ waiting : true });
    }
    this.setState({ step : newStep });
  }

  render() {
    const { a, b, c, step, waiting, entered } = this.state;

    let buttonLegend = step == 0 ? "+" : "=";
    let buttonClassNames = waiting ? "button button-wait" : "button";
    if( entered ) buttonClassNames += " clicked";
    if( waiting === true ){
      buttonLegend = <FontAwesomeIcon className="spinner" icon={faCircleNotch} spin />
    }

    return (
      <div id="calculator">
        <ResultScreen step={step} waiting={waiting} a={a} b ={b} c={c}></ResultScreen>
        <Keyboard step={step} waiting={waiting} resetCallback={this.resetCalcul.bind(this)} valueUpdated={this.currentValueUpdated.bind(this)} ></Keyboard>
        <div onClick={this.buttonClickHandler.bind(this)} className={buttonClassNames}>
          {buttonLegend}
        </div>
      </div>
    );
  }
}
