import React, { useState } from 'react';
import { Display } from './Display';
import { Button } from './Button';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [currentInput, setCurrentInput] = useState("0");
  const [isNewInput, setIsNewInput] = useState(true);

  const handleNumber = (num) => {
    if (isNewInput) {
      setCurrentInput(num);
      setIsNewInput(false);
    } else {
      setCurrentInput(currentInput === "0" ? num : currentInput + num);
    }
  };

  const handleDecimal = () => {
    if (!currentInput.includes(".")) {
      setCurrentInput(currentInput + ".");
      setIsNewInput(false);
    }
  };

  const handleOperator = (op) => {
    if (currentInput) {
        setExpression((prev) => prev + currentInput + op);
        setCurrentInput("");
        setIsNewInput(true);
      } else if (expression) {
        const lastChar = expression.slice(-1);
        const isNegative = op === "-" && /[+\-*/]$/.test(expression);

        if (/[+\-*/]$/.test(lastChar)) {
          if (isNegative) {
            setExpression((prev) => prev + op);
          } else {
            setExpression((prev) => prev.slice(0, -2) + op);
          }
        }
      } 
  };

  const handleEqual = () => {
    if (currentInput || expression) {
      const finalExpression = expression + currentInput;
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function("return " + finalExpression.replace(/--/g, "+"))();
        const roundedResult = roundResult(result, 4);
        setExpression("");
        setCurrentInput(String(roundedResult));
        setIsNewInput(true);
      } catch (e) {
        setExpression("");
        setCurrentInput("error");
      }
    }
  };

  const handleClear = () => {
    setExpression("");
    setCurrentInput("0");
    setIsNewInput(true);
  };

  const roundResult = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  };

  return (
    <div className="calculator">
      <Display value={expression + (currentInput === "" ? "" : currentInput)} />
      <div className="button-grid">
        <Button id="clear" label="C" onClick={handleClear} />
        <Button className="operator" id="divide" label="/" onClick={() => handleOperator('/')} />
        <Button className="number" id="seven" label="7" onClick={() => handleNumber('7')} />
        <Button className="number" id="eight" label="8" onClick={() => handleNumber('8')} />
        <Button className="number" id="nine" label="9" onClick={() => handleNumber('9')} />
        <Button className="operator" id="multiply" label="*" onClick={() => handleOperator('*')} />
        <Button className="number" id="four" label="4" onClick={() => handleNumber('4')} />
        <Button className="number" id="five" label="5" onClick={() => handleNumber('5')} />
        <Button className="number" id="six" label="6" onClick={() => handleNumber('6')} />
        <Button className="operator" id="add" label="+" onClick={() => handleOperator('+')} />
        <Button className="number" id="one" label="1" onClick={() => handleNumber('1')} />
        <Button className="number" id="two" label="2" onClick={() => handleNumber('2')} />
        <Button className="number" id="three" label="3" onClick={() => handleNumber('3')} />
        <Button className="operator" id="subtract" label="-" onClick={() => handleOperator('-')} />
        <Button className="number" id="zero" label="0" onClick={() => handleNumber('0')} />
        <Button id="decimal" label="." onClick={handleDecimal} />
        <Button id="equals" label="=" onClick={handleEqual} />
      </div>
    </div>
  );
};

export {Calculator};