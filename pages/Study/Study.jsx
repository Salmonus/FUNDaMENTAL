import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, SafeAreaView, Text, Animated, PanResponder, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import { Header } from "../../components"
import { BackIcon } from "../../assets/icons";
import { updateBalance } from "../../firebase/config";
import blanksData from "./blanksdata.json";
import sentsData from "./sentsdata.json";
import arabicWords from './arabic/wordsdata.json';
import frenchWords from './french/wordsdata.json';
import swahiliWords from './swahili/wordsdata.json';
import portugueseWords from './portuguese/wordsdata.json';
import LernaLangLogo from "../../assets/images/LernaLangLogo.png";
import FlappyBirdGame from './FlappyBirdClone/App';
import Game from './src/components/OfflineGame';;

const Study = ({ route, navigation }) => {
  const { language, topic, testType, gameType } = route.params;

  const { authUserId } = useContext(AuthContext);
  
  const [currentImage, setCurrentImage] = useState(LernaLangLogo);
  const [isPlayingFlappyBird, setIsPlayingFlappyBird] = useState(gameType === "flappybird" ? true : false);
  const [isPlayingOfflineGame, setIsPlayingOfflineGame] = useState(gameType === "dino" ? true : false);
  
  const [selected, setSelected] = useState(0);  
  const [selection, setSelection] = useState(0);  
  const [answered, setAnswered] = useState([]);

  const [current, setCurrent] = useState(null);

  const [screen, setScreen] = useState("");

  const pan = useRef(new Animated.ValueXY()).current;

  let wordsDataModule;
  switch (language) {
    case "arabic":
      wordsDataModule = arabicWords;
      break;
    case "french":
      wordsDataModule = frenchWords;
      break;
    case "swahili":
      wordsDataModule = swahiliWords;
      break;
    case "portuguese":
      wordsDataModule = portugueseWords;
      break;
    default:
      wordsDataModule = arabicWords;
      break;
  }

  const [data, setData] = useState({
    words: wordsDataModule,
    blanks: blanksData,
    sentences: sentsData,
  });

  let dataSet;
  switch (testType) {
    case "words":
      dataSet = data.words.filter(item => item.topic === topic.toLowerCase());
      break;
    case "blanks":
      dataSet = data.blanks.filter(item => item.topic === topic.toLowerCase());
      break;
    case "sentences":
      dataSet = data.sentences.filter(item => item.topic === topic.toLowerCase() && item.type === 'sentences');
      break;
    default:
      throw new Error("Invalid test type");
  }

  const [questions, setQuestions] = useState(dataSet);

  if (!questions || questions.length === 0) {
    console.error(`Data for testType: ${testType} is empty or unavailable. ${questions?.length ?? 'None'}`);
    throw new Error(`Data for testType: ${testType} is empty or not available`);
  }
  
  const generateRandomQuestion = () => {
    while (true) {
      const randomQuestion = dataSet[Math.floor(Math.random() * dataSet.length)];
      if (randomQuestion.answer !== 3 && !answered.includes(randomQuestion)) {
        setScreen("ShowQuestion");
        setCurrent(randomQuestion);
        setAnswered([randomQuestion]);
        break;
      }
    }
  };

  useEffect(() => {
    generateRandomQuestion();
    setScreen("ShowQuestion")
  }, [questions])

  useEffect(() => {
    if (selection === 0 || current === null) {
      return;
    }

    if (current.answer === selection) {
      setSelected(0);
      setSelection(0);
      updateBalance(authUserId, 1).then(setScreen("Correct"));
    } else {
      setSelected(0);
      setSelection(0);
      setScreen("Incorrect");
    }
  }, [selection]);

  const handleGameOver = () => {
    setIsPlayingFlappyBird(false);
  };

  if (isPlayingFlappyBird) {
    return <FlappyBirdGame onGameOver={handleGameOver} />;
  }
  if (isPlayingOfflineGame) {
    return <Game onGameOver={() => setIsPlayingOfflineGame(false)} />;
  }

  const updateSelection = (y=pan.y._value) => {
    if (y < -120) {
      setSelected(1);
    } else if (y > 120) {
      setSelected(2);
    } else {
      setSelected(0);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false})(e, gestureState);
      updateSelection()
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
      
      let choice;
      if (pan.y._value < -110) {
        choice = 1
      } else if (pan.y._value > 110) {
        choice = 2
      }

      if (choice) {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 0,
          useNativeDriver: false,
        }).start(() => setSelection(choice))
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
      
    },
    }),
  ).current;

  if (screen === "ShowQuestion") {
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          text="Study"
          leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon height={30} width={30} />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
        <Text style={[
            selected == 1 ? styles.selected : styles.selection, 
            {zIndex: 0}
          ]}>
          {current !== null ? current.options[0] : ""}
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
          <Image 
            source={require("../../assets/images/chatBorder.png")}
            style={{width: "100%", height: 72}}
            resizeMode="stretch"
          />
          <Text style={styles.word}>{current !== null ? current.question : ""}</Text>
        </Animated.View>
        <Text style={[
            selected == 2 ? styles.selected : styles.selection, {zIndex: 0}
          ]}>
          {current !== null ? current.options[1] : ""}
        </Text>
      </View>
    </SafeAreaView>
    );
  } else if (screen === "Correct" || screen === "Incorrect") {
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          text="Study"
          leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon height={30} width={30} />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View>
          <Text style={[styles.centerText, screen === "Correct" ? {color: "green"} : {color: "red"}]}>{screen}!</Text>
          <Text style={styles.description}>{current.options[current.answer - 1]} means {(current.question).toLowerCase()} in {language}!</Text>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={generateRandomQuestion}
          >
            <Image 
              source={require("../../assets/images/wide_button.png")} 
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  word: {
    fontSize: 36,
    fontFamily: "ChakraPetch-Bold",
    color: "white",
    position: "absolute"
  },
  centerText: {
    fontSize: 36,
    fontFamily: "ChakraPetch-Bold",
    textAlign: "center"
  },
  description: {
    fontSize: 20,
    fontFamily: "ChakraPetch-Light",
    color: "lightgrey"
  },
  box: {
    width: 200,
    height: 64,
    justifyContent: "center",
    alignItems: "center"
  },
  selection: {
    fontSize: 24,
    fontFamily: "ChakraPetch-Regular",
    textAlign: "center",
    color: "white",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "white"
  },
  selected: {
    fontSize: 24,
    fontFamily: "ChakraPetch-Regular",
    textAlign: "center",
    color: "white",
    backgroundColor: "lightblue",
    overflow: "hidden",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "white"
  },
  nextButton: {
    height: 36,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "ChakraPetch-Bold",
    zIndex: 0,
    position: "absolute",
  }
});

export default Study;