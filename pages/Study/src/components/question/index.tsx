import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Question({
  question,
  options,
  selectedOption,
  getAnswer
}: {
  question: string;
  options: string[];
  selectedOption: number;
  getAnswer: (index: number) => void;
}) {
  if (!question || !options) {
    return null;  // or return some fallback UI
  }

  const renderOption = (option: string, index: number) => {
    if (index === selectedOption) {
      return <Text key={index} style={styles.optionSelected}>{option} </Text>;
    } else {
      return (
        <TouchableOpacity key={index} onPress={() => getAnswer(index)}>
          <Text style={styles.option}>{option}</Text>
        </TouchableOpacity>
      );
    }
  };


  return (
    <>
      <Text style={styles.question}>{question}</Text>
      {options.map(renderOption)}
    </>
  );
}

export default Question;

const styles = StyleSheet.create({
  question: {
    color: 'black',
    paddingBottom: '5%',
    fontSize: 19,
    zIndex: 1,
  },
  option: {
    color: 'black',
    fontWeight: 'bold',
  },
  optionSelected: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
