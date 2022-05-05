import React, { Component } from 'react'
import styles from '../css/Calc.module.css'

class Calc extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      screen: '0',
      op: '',
      acc: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.writeDigit = this.putChar.bind(this)
    this.clearScreen = this.clearScreen.bind(this)
    this.calulate = this.calulate.bind(this) 
  }
  
  handleChange(event) {
    this.setState({ screen: event.target.value})
  }

  putChar(char) {
    return () => {
      let screen = this.state.screen
      // check if screen is not filled up
      if (screen.length < 11){ 
        // replace 0
        if (screen === '0' && char !== '.') {
          screen = String(char)
        }
        else screen += String(char)
        this.setState({ screen: screen})
      }
    }
  }

  setOP(operator) {
    return () => {
      const acc = parseFloat(this.state.screen)
      this.setState({
        screen: '0',
        acc: acc,
        op: operator
      })
    }
  }

  clearScreen() {
    this.setState({ screen: '0', op: '', acc: 0 })
  }

  calulate() {
    const {screen, acc, op} = this.state
    const scr_int = parseFloat(screen)
    let result
    if (acc !== 0) {
      switch(op) {
        case '+':
          result = acc + scr_int
          break;

        case '-':
          result = acc - scr_int
          break;

        case '*':
          result = acc * scr_int
          break;

        case '/':
          if (scr_int === 0){ result = 'E' }
          else { result = acc / scr_int }
          break;

        default:
          result = screen
      }
    }
    else {
       result = 0
    }
    this.setState({
      screen: String(result)
    })
  }

  render() {
    return (
      <div className='calc_app'>
        <input type={'text'} value={this.state.screen}  readOnly></input>
        <div id={styles.btngrid}>
          <button onClick={this.putChar(1)}>1</button>
          <button onClick={this.putChar(2)}>2</button>
          <button onClick={this.putChar(3)}>3</button>
          <button className={styles.red} onClick={this.clearScreen}>C</button>
          <button onClick={this.putChar(4)}>4</button>
          <button onClick={this.putChar(5)}>5</button>
          <button onClick={this.putChar(6)}>6</button>
          <button className={styles.blue} onClick={this.setOP('+')}>+</button>
          <button onClick={this.putChar(7)}>7</button>
          <button onClick={this.putChar(8)}>8</button>
          <button onClick={this.putChar(9)}>9</button>
          <button className={styles.blue} onClick={this.setOP('-')}>-</button>
          <button className={styles.blue} onClick={this.putChar('.')}>.</button>
          <button onClick={this.putChar(0)}>0</button>
          <button className={styles.blue} onClick={this.setOP('/')}>&#247;</button>
          <button className={styles.blue} onClick={this.setOP('*')}>&times;</button>
          <button className={styles.eq} onClick={this.calulate}>=</button>
        </div>
      </div>
    )
  }
}

export default Calc
