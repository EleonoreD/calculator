import React, { Component } from 'react';

export default class ResultScreen extends Component {

  /*
    Component to display the current calcul ( a + b = c )
    PROPS WAITING :
    @step : current app's step (0: defining prop a, 1: defining prop b, 2: defining result of operation)
    @waiting : true if the app is waiting result from the server
    @a : value a of the calcul
    @b : value b of the calcul
    @c : result of the calcul or current typing value (a or b)
  */

  render() {
    // constitute current calcul string's operation to display
    let operation = "";
    let current = this.props.a;
    
    if( this.props.step > 0 ){
      operation += this.props.a+" + ";
      current = this.props.b;
    }

    if( this.props.step > 1 ){
      operation += this.props.b+" = ";
      current = this.props.c;
    }

    // display 0 or current number or result, according to current step
    let main = current === null & this.props.step < 2 ? 0 : current; 

    return (
      <div className="result-screen">
        <div className="calcul">
          <span>{ operation }</span>
        </div>
        <div className="main">
          <span>{ main }</span>
          { this.props.waiting && <span className="wait">PLEASE WAIT</span> }
        </div>
      </div>
    );
  }
}
