import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity } from "react-native";
import { Header, CardList, RadioButton } from "../../components";
import { LadderIcon } from "../../assets/icons";
import { LANGUAGES, TOPICS, TEST_TYPES } from "../../components/constants";

const StudyOptions = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [testType, setTestType] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (topic !== "" && testType !== "") {
      setButtonDisabled(false);
    }
  }, [topic, testType]);

  const startQuest = () => {
    navigation.navigate("Study");
  };

  if (language === "") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center"}}>
          <Header
            text="Study"
            leftButton={<LadderIcon height={30} width={30} />}
          />
        </View>
        <View>
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
            leftButton={<LadderIcon height={30} width={30} />}
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
          <View>
            <Text style={styles.subHeading}>Select test type</Text>
            <RadioButton
              radioOptions={TEST_TYPES}
              handleSelection={(item) => setTestType(item.id)}
            />
          </View>
          <TouchableOpacity
          style={buttonDisabled ? styles.buttonDisabled : styles.startButton}
          onPress={startQuest}
          disabled={buttonDisabled}
          >
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
    backgroundColor: "white",
    height: "100%"
  },
  subHeading: {
    margin: 12,
    marginBottom: 0,
    fontSize: 28,
    fontWeight: "bold",
    color: "black"
  },
  buttonDisabled: {
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.5)",
    height: 36,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    marginTop: 36
  },
  startButton: {
    borderWidth: 2,
    borderColor: "black",
    height: 36,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    marginTop: 36
  },
  buttonDisabledText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.5)"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default StudyOptions;