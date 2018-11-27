import React, { Component } from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleLeft, faBan } from '@fortawesome/free-solid-svg-icons'

export default class Keyboard extends Component {

  /*
    Keyboard component to enter current value for a or b of the operation (a+b)
    PROPS WAITING :
    @step : current app's step (0: defining prop a, 1: defining prop b, 2: defining result of operation)
    @waiting : true if the app is waiting result from the server
    @valueUpdated : callback function to notify the parent
    @resetCallback : callback to reset all operation
  */

  state = { value: null, keypressed: null };

  // listen to keypress
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillReceiveProps( nextProps ){
    if( this.props.step != nextProps.step ){
      // step was updated by the parent, reset current value
      this.setState( { value : null });
    }
  }

  // method to activate temporatly an animation on a key
  animateKey( val ){
    this.setState( { keypressed : val });
      setTimeout( ()=>{
        this.setState( { keypressed : null });
      }, 100);
  }

  // callback when a key is pressed
  handleKeyDown( event ){
    if( event.code.includes("Digit") || event.code.includes('Numpad') ){
      // detect key pressed on numbers
      let num = event.code.replace('Digit','');
      num = parseInt(num.replace('Numpad',''));
      if( !isNaN(num) ){
        this.clickOnNumber( num );
        this.animateKey( num );
      }
    }
    else if( event.code === "Backspace" ){
      // detect key pressed on backspace -> clear one
      this.clearOne();
      this.animateKey( "backspace" ); 
    }
    else if( event.code === "Escape" ){
      // detect key pressed on escape -> reset
      this.reset();
      this.animateKey( "reset" ); 
    }
  }

  // update current state and notify parent
  update( newVal ){
    this.props.valueUpdated( newVal );
    this.setState( { value : newVal });
  }

  // function when a number is clicked
  clickOnNumber( val ){
    // is app is waiting a result, ignore clicks on numbers
    if( this.props.waiting ) return;

    if( this.state.value === null && val === 0 ) return; // ignore first 0 typed 
    let newVal = ( this.state.value || "" ) + val;
    this.update( newVal );
  }

  // remove last entry in value
  clearOne(){
    // is app is waiting a result, ignores action
    if( this.props.waiting ) return;

    let newVal = this.state.value !== null && this.state.value.length > 1 ? this.state.value.substring(0, this.state.value.length-1 ) : null;
    this.update( newVal );
  }

  clearAll(){
    // is app is waiting a result, ignores action
    if( this.props.waiting ) return;
    
    let newVal = null;
    this.update( newVal );
  }

  reset(){
    // is app is waiting a result, ignores action
    if( this.props.waiting ) return;
    
    this.clearAll();
    this.props.resetCallback();
  }

  render() {
    
    let numbers = [ 7, 8 , 9, 4, 5, 6, 1, 2, 3, 0 ];
    let keys = [];
    numbers.forEach( ( num ) => {
      let classNames = "key number";
      if( num%3 == 0 ) classNames += " last-of-line"; // if number 3 multiply, it gets the last-of-line classname
      if( this.state.keypressed == num ) classNames += " clicked"; // add clicked classname to animate key pressed
      keys.push( 
        <div key={'key-'+num} className={classNames} onClick={this.clickOnNumber.bind(this, num)} >{num}</div>
      )
    });

    let resetClassnames = "key clear";
    if( this.state.keypressed == "reset" ) resetClassnames += " clicked";

    let clearClassnames = "key clear last-of-line";
    if( this.state.keypressed == "backspace" ) clearClassnames += " clicked";

    return (
      <div className="keyboard">
        <div className="controls">
          <div className={resetClassnames} onClick={this. reset.bind(this)}>
            <FontAwesomeIcon icon={faBan}/>
          </div>
          <div className="key clear-all" onClick={this.clearAll.bind(this)}>
            <FontAwesomeIcon icon={faAngleDoubleLeft}/>
          </div>
          <div className={clearClassnames} onClick={this.clearOne.bind(this)} >
            <FontAwesomeIcon icon={faAngleLeft}/>
          </div>
        </div>
        <div className="numbers">
          {keys}
        </div>
      </div>
    );
  }
}
