import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorApp = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [storedValue, setStoredValue] = useState(0);
  const [calculatedResult, setCalculatedResult] = useState(null);

  const updateInput = (value) => {
    if (calculatedResult !== null) {
      setCurrentInput('');
      setCalculatedResult(null);
    }
    setCurrentInput(currentInput + value);
  };

  const clearAll = () => {
    setCurrentInput('');
    setCalculatedResult(null);
  };

  const backspace = () => {
    setCurrentInput(currentInput.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      setCalculatedResult(eval(currentInput));
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
    setCurrentInput(calculatedResult?.toString() || '');
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
        <CalcButton label="+" onPress={() => updateInput('+')} />
        <CalcButton label="Back" onPress={backspace} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="4" onPress={() => updateInput('4')} />
        <CalcButton label="5" onPress={() => updateInput('5')} />
        <CalcButton label="6" onPress={() => updateInput('6')} />
        <CalcButton label="-" onPress={() => updateInput('-')} />
        <CalcButton label="Ans" onPress={usePreviousResult} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="1" onPress={() => updateInput('1')} />
        <CalcButton label="2" onPress={() => updateInput('2')} />
        <CalcButton label="3" onPress={() => updateInput('3')} />
        <CalcButton label="x" onPress={() => updateInput('*')} />
        <CalcButton label="M+" onPress={addToMemory} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="0" onPress={() => updateInput('0')} />
        <CalcButton label="." onPress={() => updateInput('.')} />
        <CalcButton label="EXP" onPress={addExponent} />
        <CalcButton label="/" onPress={() => updateInput('/')} />
        <CalcButton label="M-" onPress={subtractFromMemory} />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton label="+/-" onPress={toggleSign} />
        <CalcButton label="RND" onPress={generateRandom} />
        <CalcButton label="AC" onPress={clearAll} />
        <CalcButton label="=" onPress={calculateResult} />
        <CalcButton label="MR" onPress={recallMemory} />
      </View>
    </View>
  );
};

const CalcButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  displayText: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'right',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default CalculatorApp;
