import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ChatHistoryCard, Header } from "../../components";
import { LadderIcon } from "../../assets/icons";
import { getConversations } from "../../firebase/config";
import { AuthContext } from "../../Contexts/AuthContext";

const ChatHistory = ({ route, navigation }) => {
  const { authUserId } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);


  // get all the conversations for the user on screen load
  // Prevent insufficient quota warning by updating data every 5 sec
  useEffect(() => {
    console.log("update")
    getConversations(authUserId).then((conversations) => {
      const modifiedConversations = conversations.map((conversation) => {
        return {
          timestamp: conversation?.timestamp,
          time: conversation?.timestamp,
          date: {
            month: conversation?.timestamp
              ?.toDate()
              ?.toLocaleString("default", { month: "short" }),
            day: conversation?.timestamp
              ?.toDate()
              ?.toLocaleString("default", { day: "2-digit" }),
            year: conversation?.timestamp
              ?.toDate()
              ?.toLocaleString("default", { year: "numeric" }),
          },
          onPress: () => {
            console.log("conversation pressed with id: ", conversation.id);
          },
          language: conversation?.language,
          description: conversation?.messages[1]?.content,
          messages: conversation.messages,
        };
      });
      setConversations(modifiedConversations);
    });
  }, []);

  useFocusEffect(() => {
    setTimeout(() => {
      console.log("update 5")
      getConversations(authUserId).then((conversations) => {
        const modifiedConversations = conversations.map((conversation) => {
          return {
            timestamp: conversation?.timestamp,
            time: conversation?.timestamp,
            date: {
              month: conversation?.timestamp
                ?.toDate()
                ?.toLocaleString("default", { month: "short" }),
              day: conversation?.timestamp
                ?.toDate()
                ?.toLocaleString("default", { day: "2-digit" }),
              year: conversation?.timestamp
                ?.toDate()
                ?.toLocaleString("default", { year: "numeric" }),
            },
            onPress: () => {
              console.log("conversation pressed with id: ", conversation.id);
            },
            language: conversation?.language,
            description: conversation?.messages[1]?.content,
            messages: conversation.messages,
          };
        });
        setConversations(modifiedConversations);
      });
    }, 5000)
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Chat List"
        rightButton={null}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scollViewcontent}
      >
        <TouchableOpacity 
          style={styles.newButton}
          onPress={() => navigation.navigate("Chat", { chatHistory: null })}
        >
          <Image 
            source={require("../../assets/images/chatBorder.png")}
            style={{width: "100%", height: 72}}
            resizeMode="stretch"
          />
          <Text style={styles.buttonText}>+ New Chat</Text>
        </TouchableOpacity>
        {conversations.map((chat) => (
          <ChatHistoryCard
            key={chat.timestamp}
            date={chat.date}
            language={chat.language}
            description={chat.description}
            openChat={() => navigation.navigate("Chat", { chatHistory: conversations.filter(convo => convo.timestamp === chat.timestamp) })}
            deleteChat={() => console.log("Delete chat")}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 12,
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    top: 20,
  },
  scollViewcontent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  newButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "ChakraPetch-Bold",
    zIndex: 0,
    position: "absolute",
  }
});

export default ChatHistory;
