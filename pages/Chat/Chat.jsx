import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { ChatBubble, ChatInputField, Header } from "../../components";
import { LadderIcon, BackIcon } from "../../assets/icons";
import { storeConversation } from "../../firebase/config";
import { AuthContext } from "../../Contexts/AuthContext";

const OPENAI_MODEL = "gpt-3.5-turbo";
const OPENAI_CHAT_REQUEST_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

const systemMessage = {
  role: "system",
  content:
    "You are a friendly and helpful language learning tutor called Fundy. Ask this user a question in English about basic english conversation so that they can practice speaking and writing English. Note that they are a basic level speaker. In your conversation with them ask one question at a time, wait for their responses and reply thoughtfully with short and concise questions. Remind the user that the max conversation length is 20. THe user is most likely from Africa and in developing country, so take in mind ad when he or she wants to talk in Arabic, french, or swahili, use that language also.",
};

const MAX_CONVERSATION_LENGTH = 20;

const Chat = ({ route, navigation }) => {
  const language = "English";
  const topic = "basic english conversation";
  const proficiency = "Basic";
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You are a friendly and helpful language learning tutor called Fundy. Ask this user a question in ${language} about ${topic} so that they can practice speaking and writing ${language}. Note that they are a ${proficiency} level speaker. In your conversation with them ask one question at a time, wait for their responses and reply thoughtfully with short and concise questions.`,
    },
  ]);

  const endConversationMessage = {
    role: "system",
    content: `End the conversation with the user by saying thanks for chatting and goodbye in ${language}`,
  };

  const [chatComponents, setChatComponents] = useState([]);
  const [chatCount, setChatCount] = useState(0);
  const scrollViewRef = useRef(null);
  const [chatEnded, setChatEnded] = useState(false);
  const { authUserId } = useContext(AuthContext);

  const getMessage = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.role === "assistant") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.content };
    });

    const apiRequestBody = {
      model: OPENAI_MODEL,
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(OPENAI_CHAT_REQUEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("OpenAI API Error:", error);
        throw new Error("OpenAI API Error");
      }

      const messageData = await response.json();
      return {
        role: "assistant",
        content: messageData.choices[0].message.content,
      };
    } catch (error) {
      console.log("Error getting message from OpenAI", error);
      return {
        role: "assistant",
        content: "I'm sorry, but I can't provide a response at the moment.",
      };
    }
  };

  useEffect(() => {
    getMessage(messages).then((messageData) => {
      setMessages([...messages, messageData]);
      const newChat = (
        <ChatBubble
          key={chatCount}
          text={messageData.content}
          leftBubble={true}
        />
      );
      setChatComponents([...chatComponents, newChat]);
      setChatCount(chatCount + 1);
    });
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatComponents]);

  const handleSendResponse = (input) => {
    const newChat = (
      <ChatBubble key={chatCount} text={input} leftBubble={false} />
    );
    const updatedMessages = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(updatedMessages);
    setChatComponents((prev) => [...prev, newChat]);
    setChatCount(chatCount + 1);

    getMessage(updatedMessages).then((messageData) => {
      const newChat = (
        <ChatBubble
          key={chatCount + 1}
          text={messageData.content}
          leftBubble={true}
        />
      );
      setMessages([...updatedMessages, messageData]);
      setChatComponents((prev) => [...prev, newChat]);
      setChatCount(chatCount + 2);
    });

    if (chatComponents.length >= MAX_CONVERSATION_LENGTH) {
      setChatEnded(true);
      setMessages([...messages, endConversationMessage]);
    }
  };

  const submitResponse = () => {
    storeConversation(messages, authUserId, language, topic, proficiency)
      .then(() => {
        navigation.navigate("Chat History");
      })
      .catch((error) => {
        console.log("Error storing conversation in firebase. Try again.", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Chat with Fundy"
        leftButton={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon height={30} width={30} />
          </TouchableOpacity>
        }
        rightButton={<LadderIcon height={30} width={30} />}
      />
      <KeyboardAvoidingView behavior="height" style={styles.scrollView}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chatComponents}
        </ScrollView>
        {chatEnded ? (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitResponse}
          >
            <Text style={styles.submitText}>End Conversation</Text>
          </TouchableOpacity>
        ) : (
          <ChatInputField value={""} sendResponse={handleSendResponse} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#0601B4",
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Chat;