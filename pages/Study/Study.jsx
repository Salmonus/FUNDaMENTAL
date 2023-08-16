import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, Text, Animated, PanResponder, TouchableOpacity } from "react-native";
import { Header } from "../../components"
import { BackIcon } from "../../assets/icons";
import blanksData from "./blanksdata.json";
import sentsData from "./sentsdata.json";
import arabicWords from './arabic/wordsdata.json';
import frenchWords from './french/wordsdata.json';
import swahiliWords from './swahili/wordsdata.json';
import portugueseWords from './portuguese/wordsdata.json';
import LernaLangLogo from "../../assets/images/LernaLangLogo.png";
import HappyImage from "./happy.png";
import SadImage from "./sad.png";
import FlappyBirdGame from './FlappyBirdClone/App';
import Game from './src/components/OfflineGame';

const Study = ({ route, navigation }) => {
  const { language, topic, testType, gameType } = route.params;
  
  const [currentImage, setCurrentImage] = useState(LernaLangLogo);
  const [isPlayingFlappyBird, setIsPlayingFlappyBird] = useState(gameType === "flappybird" ? true : false);
  const [isPlayingOfflineGame, setIsPlayingOfflineGame] = useState(gameType === "dino" ? true : false);
  
  const [selected, setSelected] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [button, setButton] = useState('disable');
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

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

  useEffect(() => {
    let dataset;
    switch (testType) {
      case "words":
        dataset = data.words.filter(item => item.topic === topic.toLowerCase());
        break;
      case "blanks":
        dataset = data.blanks.filter(item => item.topic === topic.toLowerCase());
        break;
      case "sentences":
        dataset = data.sentences.filter(item => item.topic === topic.toLowerCase() && item.type === 'sentences');
        break;
      default:
        throw new Error("Invalid test type");
    }

    if (!dataset || dataset.length === 0) {
      console.error(`Data for testType: ${testType} is empty or unavailable. ${dataset?.length ?? 'None'}`);
      throw new Error(`Data for testType: ${testType} is empty or not available`);
    }

    const randomQuestion = dataset[Math.floor(Math.random() * dataset.length)];
    setQuestions(dataset);
    setCurrent(randomQuestion);
    setAnswered([randomQuestion]);
  }, []);

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
      setSelected(0);
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
      updateSelection(0);
    },
    }),
  ).current;

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
            selected == 2 ? styles.selected : styles.selection, {zIndex: 0}
          ]}>
          Selection 2
        </Text>
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  word: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  box: {
    backgroundColor: "blue",
    borderRadius: 16,
    padding: 8,
    width: 200,
    height: 64,
    justifyContent: "center"
  },
  selection: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "white"
  },
  selected: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    backgroundColor: "lightblue",
    overflow: "hidden",
    width: 200,
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "white"
  }
});

export default Study;