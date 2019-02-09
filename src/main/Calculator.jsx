import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

// initialState to do operations
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    // clone
    state = {...initialState}

    constructor(props) {
        super(props)

        this.clearMemory  = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit     = this.addDigit.bind(this)

    }
    clearMemory() {
        console.log('clean')
        // from react
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        console.log(operation)
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            // get current operation
            const currentOperation = this.state.operation
            // clone the current values
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`).toFixed(5)

            } catch(e) {
                values[0] = this.state.values[0]
              }
            values[1] = 0 // redefine index 1 to 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    // to avoid more than one point on display
    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }


    render() {
        // const addDigit = n => this.addDigit(n)
        // const setOperation = op => this.setOperation(op)

        return ( // expression

            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="C" click={this.clearMemory} triple c/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
                
            </div>

        )
    }

}