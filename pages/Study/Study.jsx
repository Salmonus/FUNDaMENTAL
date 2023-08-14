import React, {useRef} from "react";
import { StyleSheet, View, SafeAreaView, Text, Animated, PanResponder } from "react-native";

const Study = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
      PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
      onPanResponderRelease: () => {
        if (pan.y._value < -120) {
        console.log("Selection 1")
        }
        else if (pan.y._value > 110) {
        console.log("Selection 2")
        }
        pan.flattenOffset();
        Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        }).start();
      },
      }),
    ).current;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.container, styles.memorized]}>
          Selection 1
        </Text>
        <Animated.View
          style={[
            styles.box,
            {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            }
          ]}
          {...panResponder.panHandlers}>
          <Text style={styles.word}>Word</Text>
        </Animated.View>
        <Text style={[styles.container, styles.notMemorized]}>
          Selection 2
        </Text>
      </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  box: {
    backgroundColor: "blue",
    borderRadius: 16,
    padding: 20,
    width: 200
  },
  memorized: {
    marginTop: 64,
    fontSize: 20,
    color: "green",
  },
  notMemorized: {
    marginTop: 112,
    fontSize: 20,
    color: "red",
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  }
});

export default Study;