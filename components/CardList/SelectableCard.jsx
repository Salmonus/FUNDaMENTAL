import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const SelectableCard = ({ id, text, selected, onPress, children }) => {
  return (
    <Pressable
      id={id}
      onPress={onPress}
      style={selected ? styles.selectedCard : styles.card}
    >
      <View style={[styles.cardContainer]}>
        <View style={styles.icon}>{children}</View>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    padding: 12,
    height: 64,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "black",
    margin: 4,
  },
  selectedCard: {
    padding: 12,
    height: 64,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "black",
    margin: 4,
    backgroundColor: "lightgrey"
  },
  textStyle: {
    flex: 5,
    color: "black",
    fontSize: 22,
    fontWeight: 600,
    paddingLeft: 12,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    width: 36,
    height: 36,
  },
});

export default SelectableCard;
