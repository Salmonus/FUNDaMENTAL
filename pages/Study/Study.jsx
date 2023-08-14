import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, Text, Animated, PanResponder } from "react-native";

const Study = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const [oneSelected, setOneSelected] = useState(false);
    const [twoSelected, setTwoSelected] = useState(false);

    const updateSelection = (y=pan.y._value) => {
      if (y < -120) {
        setOneSelected(true);
      } else if (y > 120) {
        setTwoSelected(true);
      } else {
        setOneSelected(false);
        setTwoSelected(false);
      }
    }

    const panResponder = useRef(
      PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        updateSelection();
        Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false})(e, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        console.log(pan.y._value);
        updateSelection(0);
      },
      }),
    ).current;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={[
            oneSelected ? styles.selected : styles.selection, 
            {zIndex: 0}
          ]}>
          Selection 1
        </Text>
        <Animated.View
          style={[
            styles.box,
            {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            zIndex: 1
            }            
          ]}
          {...panResponder.panHandlers}>
          <Text style={styles.word}>Word</Text>
        </Animated.View>
        <Text style={[
            twoSelected ? styles.selected : styles.selection, {zIndex: 0}
          ]}>
          Selection 2
        </Text>
      </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  box: {
    backgroundColor: "blue",
    borderRadius: 16,
    padding: 8,
    width: 200
  },
  selection: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
  },
  selected: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
    backgroundColor: "lightblue",
    overflow: "hidden",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
  }
});

export default Study;