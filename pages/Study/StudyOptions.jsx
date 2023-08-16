import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Header, CardList, RadioButton } from "../../components";
import { BackIcon } from "../../assets/icons";
import { LANGUAGES, TOPICS, TEST_TYPES, GAME_TYPES } from "../../components/constants";

const StudyOptions = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [testType, setTestType] = useState("");
  const [gameType, setGameType] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    // if (topic !== "" && testType !== "" && gameType !== "") {
    if (topic !== "" && gameType !== "") {
      setButtonDisabled(false);
    }
  }, [topic, testType, gameType]);

  const resetSelection = () => {
    setLanguage("");
    setTopic("");
    setTestType("");
    setButtonDisabled(true);
  };

  const startQuest = () => {
    navigation.navigate("Study", { language: language, topic: topic, testType: "words", gameType: gameType });
  };

  if (language === "") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center"}}>
          <Header
            text="Study"
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.subHeading}>Select a language</Text>
          <CardList
            items={LANGUAGES}
            handleSelected={(item) => setLanguage(item.id)}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center"}}>
          <Header
            text="Study"
            leftButton={
              <TouchableOpacity onPress={resetSelection}>
                <BackIcon height={30} width={30} />
              </TouchableOpacity>
            }
          />
        </View>
        <ScrollView>
          <View>
            <Text style={styles.subHeading}>Select a topic</Text>
            <RadioButton
              radioOptions={TOPICS}
              handleSelection={(item) => setTopic(item.id)}
            />
          </View>
          {/* <View>
            <Text style={styles.subHeading}>Select test type</Text>
            <RadioButton
              radioOptions={TEST_TYPES}
              handleSelection={(item) => setTestType(item.id)}
            />
          </View> */}
          <View>
            <Text style={styles.subHeading}>Select game type</Text>
            <RadioButton
              radioOptions={GAME_TYPES}
              handleSelection={(item) => setGameType(item.id)}
            />
          </View>
          <TouchableOpacity
          style={styles.startButton}
          onPress={startQuest}
          disabled={buttonDisabled}
          >
            <Image 
              source={buttonDisabled ? require("../../assets/images/wide_button.png") : require("../../assets/images/wide_button_h.png")} 
              style={{width: "100%", height: 36}}
              resizeMode="stretch"
            />
            <Text style={buttonDisabled ? styles.buttonDisabledText : styles.buttonText}>Start Quest</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  subHeading: {
    margin: 12,
    marginBottom: 0,
    fontSize: 28,
    fontFamily: "ChakraPetch-Bold",
    color: "white"
  },
  startButton: {
    height: 36,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabledText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: "ChakraPetch-Regular",
    zIndex: 0,
    position: "absolute"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "ChakraPetch-Bold",
    zIndex: 0,
    position: "absolute",
  }
});

export default StudyOptions;