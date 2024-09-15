import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorApp = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [storedValue, setStoredValue] = useState(0);
  const [calculatedResult, setCalculatedResult] = useState(null);
  const [previousResult, setPreviousResult] = useState(null);

  const updateInput = (value) => {
    if (calculatedResult !== null) {
      setCurrentInput(previousResult + value);  // Use the result to continue calculation
      setCalculatedResult(null);
    } else {
      setCurrentInput(currentInput + value);
    }
  };

  const clearAll = () => {
    setCurrentInput('');
    setCalculatedResult(null);
  };

  const backspace = () => {
    setCurrentInput(currentInput.slice(0, -1) || '');  // Ensure fallback to empty string
  };

  const calculateResult = () => {
    try {
      const result = eval(currentInput);
      setCalculatedResult(result);
      setPreviousResult(result);  // Store the result for further use
    } catch (error) {
      setCalculatedResult('Invalid Input');
    }
  };

  const addToMemory = () => {
    setStoredValue(storedValue + parseFloat(calculatedResult || currentInput));
  };

  const subtractFromMemory = () => {
    setStoredValue(storedValue - parseFloat(calculatedResult || currentInput));
  };

  const recallMemory = () => {
    setCurrentInput(storedValue.toString());
  };

  const usePreviousResult = () => {
    if (previousResult !== null) {
      setCurrentInput((currentInput || '') + previousResult.toString());
    }
  };

  const toggleSign = () => {
    if (currentInput.startsWith('-')) {
      setCurrentInput(currentInput.slice(1));
    } else {
      setCurrentInput('-' + currentInput);
    }
  };

  const generateRandom = () => {
    setCurrentInput(Math.random().toFixed(5).toString());
  };

  const addExponent = () => {
    setCurrentInput(currentInput + 'e');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.displayText}>
        {calculatedResult !== null ? calculatedResult : currentInput || '0'}
      </Text>

      <View style={styles.buttonRow}>
        <CalcButton label="7" onPress={() => updateInput('7')} />
        <CalcButton label="8" onPress={() => updateInput('8')} />
        <CalcButton label="9" onPress={() => updateInput('9')} />
        <SpecialButton label="+" onPress={() => updateInput('+')} />
        <SpecialButton label="Back" onPress={backspace} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="4" onPress={() => updateInput('4')} />
        <CalcButton label="5" onPress={() => updateInput('5')} />
        <CalcButton label="6" onPress={() => updateInput('6')} />
        <SpecialButton label="-" onPress={() => updateInput('-')} />
        <SpecialButton label="Ans" onPress={usePreviousResult} /> 
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="1" onPress={() => updateInput('1')} />
        <CalcButton label="2" onPress={() => updateInput('2')} />
        <CalcButton label="3" onPress={() => updateInput('3')} />
        <SpecialButton label="x" onPress={() => updateInput('*')} />
        <SpecialButton label="M+" onPress={addToMemory} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="0" onPress={() => updateInput('0')} />
        <CalcButton label="." onPress={() => updateInput('.')} />
        <SpecialButton label="EXP" onPress={addExponent} />
        <SpecialButton label="/" onPress={() => updateInput('/')} />
        <SpecialButton label="M-" onPress={subtractFromMemory} />
      </View>

      <View style={styles.buttonRow}>
        <SpecialButton label="+/-" onPress={toggleSign} />
        <SpecialButton label="RND" onPress={generateRandom} />
        <CalcButton label="AC" onPress={clearAll} />
        <CalcButton label="=" onPress={calculateResult} />
        <SpecialButton label="MR" onPress={recallMemory} />
      </View>
    </View>
  );
};

const CalcButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const SpecialButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.special_button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingBottom: 30,
    gap: 10,
  },
  displayText: { 
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'right',
    width: '95%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '90%',
  },
  button: {
    flex: 1,
    height: 80,
    backgroundColor: '#aec0d3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  special_button: {
    flex: 1,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 25,
  },
});

export default CalculatorApp;
