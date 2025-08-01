import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [angleUnit, setAngleUnit] = useState('deg'); // 'deg' or 'rad'

  const handleNumber = (number) => {
    if (shouldResetDisplay) {
      setDisplay(number);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleOperator = (operator) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    const finalEquation = equation + display;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(finalEquation);
      setDisplay(String(result));
      setEquation('');
      setShouldResetDisplay(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercent = () => {
    const currentValue = parseFloat(display);
    const result = currentValue / 100;
    setDisplay(String(result));
  };

  const handlePlusMinus = () => {
    setDisplay(String(-parseFloat(display)));
  };

  // Scientific Calculator Functions
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const handleScientificFunction = (func) => {
    const value = parseFloat(display);
    let result;

    try {
      switch (func) {
        case 'sin':
          result = angleUnit === 'deg' ? Math.sin(toRadians(value)) : Math.sin(value);
          break;
        case 'cos':
          result = angleUnit === 'deg' ? Math.cos(toRadians(value)) : Math.cos(value);
          break;
        case 'tan':
          result = angleUnit === 'deg' ? Math.tan(toRadians(value)) : Math.tan(value);
          break;
        case 'asin':
          result = angleUnit === 'deg' ? toDegrees(Math.asin(value)) : Math.asin(value);
          break;
        case 'acos':
          result = angleUnit === 'deg' ? toDegrees(Math.acos(value)) : Math.acos(value);
          break;
        case 'atan':
          result = angleUnit === 'deg' ? toDegrees(Math.atan(value)) : Math.atan(value);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'square':
          result = Math.pow(value, 2);
          break;
        case 'cube':
          result = Math.pow(value, 3);
          break;
        case 'pow':
          result = Math.pow(value, 2.718); // e^x approximation
          break;
        case 'factorial':
          if (value < 0 || value !== Math.floor(value)) {
            throw new Error('Invalid factorial');
          }
          result = value === 0 ? 1 : Array.from({length: value}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
          break;
        case 'reciprocal':
          result = 1 / value;
          break;
        case 'abs':
          result = Math.abs(value);
          break;
        default:
          throw new Error('Unknown function');
      }
      setDisplay(String(result));
      setShouldResetDisplay(true);
    } catch (error) {
      setDisplay('Error');
      setShouldResetDisplay(true);
    }
  };

  const handleMemory = (operation) => {
    const value = parseFloat(display);
    let memoryValue = parseFloat(localStorage.getItem('calculatorMemory') || '0');
    
    switch (operation) {
      case 'MC': // Memory Clear
        localStorage.removeItem('calculatorMemory');
        break;
      case 'MR': // Memory Recall
        setDisplay(String(memoryValue));
        setShouldResetDisplay(true);
        break;
      case 'M+': // Memory Add
        localStorage.setItem('calculatorMemory', String(memoryValue + value));
        setShouldResetDisplay(true);
        break;
      case 'M-': // Memory Subtract
        localStorage.setItem('calculatorMemory', String(memoryValue - value));
        setShouldResetDisplay(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`calculator ${isScientific ? 'scientific' : ''}`}>
      <div className="calculator-brand">
        <div className="brand-logo">
          <span className="logo-icon">🧮</span>
          <span className="brand-name">CalciCo</span>
        </div>
        <div className="brand-tagline">Smart Calculations</div>
      </div>
      
      <div className="calculator-header">
        <div className="header-controls">
          <button 
            className={`mode-toggle ${isScientific ? 'active' : ''}`}
            onClick={() => setIsScientific(!isScientific)}
          >
            <span className="toggle-icon">{isScientific ? '🔢' : '🔬'}</span>
            <span className="toggle-text">{isScientific ? 'Standard' : 'Scientific'}</span>
          </button>
          {isScientific && (
            <button 
              className={`angle-toggle ${angleUnit === 'rad' ? 'active' : ''}`}
              onClick={() => setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg')}
            >
              <span className="angle-icon">📐</span>
              <span className="angle-text">{angleUnit.toUpperCase()}</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="calculator-display">
        <div className="equation">{equation}</div>
        <div className="current-value">{display}</div>
      </div>
      
      {isScientific && (
        <div className="scientific-buttons">
          <div className="scientific-row">
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('sin')}>
              sin
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('cos')}>
              cos
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('tan')}>
              tan
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('log')}>
              log
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('ln')}>
              ln
            </button>
          </div>
          
          <div className="scientific-row">
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('asin')}>
              asin
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('acos')}>
              acos
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('atan')}>
              atan
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('sqrt')}>
              √
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('square')}>
              x²
            </button>
          </div>
          
          <div className="scientific-row">
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('cube')}>
              x³
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('pow')}>
              eˣ
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('factorial')}>
              x!
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('reciprocal')}>
              1/x
            </button>
            <button className="btn btn-scientific" onClick={() => handleScientificFunction('abs')}>
              |x|
            </button>
          </div>
          
          <div className="memory-row">
            <button className="btn btn-memory" onClick={() => handleMemory('MC')}>
              MC
            </button>
            <button className="btn btn-memory" onClick={() => handleMemory('MR')}>
              MR
            </button>
            <button className="btn btn-memory" onClick={() => handleMemory('M+')}>
              M+
            </button>
            <button className="btn btn-memory" onClick={() => handleMemory('M-')}>
              M-
            </button>
          </div>
        </div>
      )}
      
      <div className="calculator-buttons">
        <button className="btn btn-secondary" onClick={handleClear}>
          AC
        </button>
        <button className="btn btn-secondary" onClick={handlePlusMinus}>
          ±
        </button>
        <button className="btn btn-secondary" onClick={handlePercent}>
          %
        </button>
        <button className="btn btn-operator" onClick={() => handleOperator('/')}>
          ÷
        </button>
        
        <button className="btn btn-number" onClick={() => handleNumber('7')}>
          7
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('8')}>
          8
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('9')}>
          9
        </button>
        <button className="btn btn-operator" onClick={() => handleOperator('*')}>
          ×
        </button>
        
        <button className="btn btn-number" onClick={() => handleNumber('4')}>
          4
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('5')}>
          5
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('6')}>
          6
        </button>
        <button className="btn btn-operator" onClick={() => handleOperator('-')}>
          −
        </button>
        
        <button className="btn btn-number" onClick={() => handleNumber('1')}>
          1
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('2')}>
          2
        </button>
        <button className="btn btn-number" onClick={() => handleNumber('3')}>
          3
        </button>
        <button className="btn btn-operator" onClick={() => handleOperator('+')}>
          +
        </button>
        
        <button className="btn btn-number btn-zero" onClick={() => handleNumber('0')}>
          0
        </button>
        <button className="btn btn-number" onClick={handleDecimal}>
          .
        </button>
        <button className="btn btn-equals" onClick={handleEqual}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator; 