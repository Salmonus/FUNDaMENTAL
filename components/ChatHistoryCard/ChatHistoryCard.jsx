import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { TrashIcon } from "../../assets/icons";

const MAX_CHARS_DESCRIPTION = 25;

const ChatHistoryCard = ({
  date,
  language,
  description,
  openChat,
  deleteChat,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image 
            source={require("../../assets/images/chatBorder.png")}
            style={{width: "100%", height: 72}}
            resizeMode="stretch"
      />
      <View style={styles.cardInfoContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {date.month} | {date.day}
          </Text>
          <Text style={styles.dateText}>{date.year}</Text>
        </View>
        <View style={styles.textRow}>
          <Pressable
            style={(pressed) => [
              {
                opacity: pressed ? 1 : 0.5,
              },
            ]}
            onPress={openChat}
          >
            <Text style={styles.language}>{language}</Text>
          </Pressable>
          <Text style={styles.description}>
            {description.substring(0, MAX_CHARS_DESCRIPTION)}...
          </Text>
        </View>
        <Pressable style={styles.deleteChat} onPress={deleteChat}>
          <TrashIcon height={28} width={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    flexDirection: "row",
  },
  cardInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute"
  },
  textRow: {
    flexDirection: "column",
    flexWrap: "wrap",
    textAlign: "left",
    width: "65%",
  },
  language: {
    fontSize: 20,
    fontFamily: "ChakraPetch-SemiBold",
    color: "white",
    textAlign: "left",
  },
  description: {
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    color: "lightgrey",
    textAlign: "left",
  },
  deleteChat: {
    width: "10%",
    paddingRight: 15,
  },
  dateContainer: {
    width: "25%",
    flexDirection: "column",
    paddingRight: 5,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "ChakraPetch-Light",
    color: "white",
    textAlign: "left",
  },
});

export default ChatHistoryCard;
