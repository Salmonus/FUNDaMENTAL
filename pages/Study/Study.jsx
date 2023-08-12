import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView, Text, ScrollView, Button, TextInput, Image } from "react-native";
import { Header, CardList, RadioButton } from "../../components";
import { LadderIcon } from "../../assets/icons";
import Question from "./src/components/question";
import CustomButton from "./src/components/button";
import blanksData from './blanksdata.json';
import sentsData from './sentsdata.json';
import { LANGUAGES, TOPICS } from "../../components/constants";
import arabicWords from './arabic/wordsdata.json';
import frenchWords from './french/wordsdata.json';
import swahiliWords from './swahili/wordsdata.json';
import portugueseWords from './portuguese/wordsdata.json';
import frenchLangDocs from './french/frenchlangdocs.json';
import arabicLangDocs from './arabic/arabiclangdocs.json';
import swahiliLangDocs from './swahili/swahililangdocs.json';
import portugueseLangDocs from './portuguese/portugueselangdocs.json';
import { firebase, auth, db } from "../../firebase/config.js";
import { setDoc, doc } from "firebase/firestore";
import LernaLangLogo from "../../assets/images/LernaLangLogo.png";
import HappyImage from "./happy.png";
import SadImage from "./sad.png";

const TEST_TYPES = [
  { label: 'Words', value: 'words' },
  { label: 'Blanks', value: 'blanks' },
  { label: 'Sentences', value: 'sentences' },
];

const GUIDE_LANGUAGES = ['french', 'arabic', 'swahili', 'portuguese'];

const Study = ({ navigation }) => {
  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState('');
  const [data, setData] = useState({
    words: [],
    blanks: blanksData,
    sentences: sentsData,
  });
  const [guideLanguage, setGuideLanguage] = useState(null);
  const [guideData, setGuideData] = useState(null);
  const [testType, setTestType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [selected, setSelected] = useState('');
  const [button, setButton] = useState('disable');
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const [currentImage, setCurrentImage] = useState(LernaLangLogo);
  const loadDataForGuide = (lang) => {
    let langDocsModule;
    switch (lang) {
      case 'french':
        langDocsModule = frenchLangDocs;
        break;
      case 'arabic':
        langDocsModule = arabicLangDocs;
        break;
      case 'swahili':
        langDocsModule = swahiliLangDocs;
        break;
      case 'portuguese':
        langDocsModule = portugueseLangDocs;
        break;
      default:
        langDocsModule = frenchLangDocs;
        break;
    }
    setGuideData(langDocsModule);
  };
  const loadDataForLanguage = (lang) => {
    let wordsDataModule;
    switch (lang) {
      case 'arabic':
        wordsDataModule = arabicWords;
        break;
      case 'french':
        wordsDataModule = frenchWords;
        break;
      case 'swahili':
        wordsDataModule = swahiliWords;
        break;
      case 'portuguese':
        wordsDataModule = portugueseWords;
        break;
      default:
        wordsDataModule = arabicWords;
        break;
    }

    const loadDataForGuide = (lang) => {

      let langDocsModule;
      switch (lang) {
        case 'french':
          langDocsModule = frenchLangDocs;
          break;
        case 'arabic':
          langDocsModule = arabicLangDocs;
          break;
        case 'swahili':
          langDocsModule = swahiliLangDocs;
          break;
        case 'portuguese':
          langDocsModule = portugueseLangDocs;
          break;
        default:
          langDocsModule = frenchLangDocs;
          break;
      }
      setGuideData(prevData => ({ ...prevData, [lang]: langDocsModule }));
    };

    setData(prevData => {
      if (!wordsDataModule || wordsDataModule.length === 0) {
        console.error(`No data found for language: ${lang}`);
        return prevData;
      }
      return { ...prevData, words: wordsDataModule }
    });
  };

  const navigateBackToMenu = () => {
    setMenuSelected('');
  }


  useEffect(() => {
    if (language) {
      loadDataForLanguage(language);
    }
  }, [language]);

  const initQuest = () => {
    setLoading(true);
    try {
      if (!testType) {
        console.log("Test type not selected.");
        throw new Error('Test type is not selected');
      }

      let dataset;
      switch (testType) {
        case 'words':
          if (!data.words || data.words.length === 0) {
            console.error(`Words data is empty or unavailable. ${data.words?.length ?? 'None'}`);
            throw new Error('Words data is empty or not available');
          }
          dataset = data.words.filter(item => item.topic === topic.toLowerCase());
          break;
        case 'blanks':
          dataset = data.blanks.filter(item => item.topic === topic.toLowerCase());
          break;
        case 'sentences':
          dataset = data.sentences.filter(item => item.topic === topic.toLowerCase() && item.type === 'sentences');
          break;
        default:
          throw new Error('Invalid test type');
      }

      if (!dataset || dataset.length === 0) {
        console.error(`Data for testType: ${testType} is empty or unavailable. ${dataset?.length ?? 'None'}`);
        throw new Error(`Data for testType: ${testType} is empty or not available`);
      }

      const randomQuestion = dataset[Math.floor(Math.random() * dataset.length)];
      setQuestions(dataset);
      setCurrent(randomQuestion);
      setAnswered([randomQuestion]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testType && data.words?.length !== 0) {
      initQuest();
    }
  }, [testType, topic, data]);
  useEffect(() => {
    if (languageGuide) {
      loadDataForGuide(languageGuide);
    }
  }, [languageGuide]);
  useEffect(() => {
    const mergedGuideData = {
      'french': frenchLangDocs,
      'arabic': arabicLangDocs,
      'swahili': swahiliLangDocs,
      'portuguese': portugueseLangDocs
    };
    setGuideData(mergedGuideData);
  }, []);
  const getAnswer = (index) => {
    if (index === '') {
      setSelected(index);
      setButton('disable');
      return;
    }
    setSelected(index);
    setButton('check');
  };

  const answerCheck = () => {
    if (testType === 'sentences') {
      if (userInput === current.answer.join(' ')) {
        setCurrentImage(HappyImage);
        setButton('correct');
      } else {
        setCurrentImage(SadImage);
        setButton('incorrect');
      }
    } else {
      if (questions.length === answered.length) {
        console.log('All questions answered! Resetting...');
        answerReset();
      } else if (selected + 1 === current.answer) {
        setCurrentImage(HappyImage);
        setButton('correct');
      } else {
        setCurrentImage(SadImage);
        setButton('incorrect');
      }
    }
  };

  const filterNotAnswered = () => {
    return questions.filter(q => !answered.find(a => q.id === a.id));
  };

  const answerNext = () => {
    const notAnswered = filterNotAnswered();
    if (notAnswered.length === 0) {
      console.error('No unanswered questions left.');
      return;
    }
    const randomQuestion = notAnswered[Math.floor(Math.random() * notAnswered.length)];
    setButton('disable');
    setSelected('');
    setUserInput('');
    setCurrent(randomQuestion);
    setAnswered(prevAnswered => [...prevAnswered, randomQuestion]);
  };

  const answerReset = () => {
    setButton('disable');
    setSelected('');
    setUserInput('');
    initQuest();
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user && testType) {
      const docRef = doc(db, "profiles", user.uid);
      setDoc(docRef, { memorized: answered.length }, { merge: true });
    }
  }, [answered]);

  const [menuSelected, setMenuSelected] = useState('');
  const [languageGuide, setLanguageGuide] = useState(null);

  if (menuSelected === 'LanguageGuide') {
    return (
      <SafeAreaView style={styles.languageGuideContainer}>
        <Header
          text="Language Guide(Beta)"
          rightButton={<Button title="Back" onPress={navigateBackToMenu} />}
        />
        <ScrollView style={styles.scrollView}>
          {guideData && Object.keys(guideData).map(lang => (
            <View key={lang}>
              <Text style={styles.subHeading}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</Text>
              {Object.entries(guideData[lang]).map(([key, value]) => (
                <View key={key} style={styles.jsonDataBox}>
                  <Text style={styles.jsonKey}>{key}</Text>
                  <Text style={styles.jsonValue}>{value}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }


  if (!menuSelected) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          text="LernaLang"
          rightButton={null}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.menuList}>
            <Button title="Study" onPress={() => setMenuSelected('Study')} />
            <Button title="Language Guide(Beta)" onPress={() => setMenuSelected('LanguageGuide')} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (menuSelected === 'Study') {
    if (!testType) {
      return (
        <SafeAreaView style={styles.container}>
          <Header
            text="Study"
            rightButton={<Button title="Back" onPress={navigateBackToMenu} />}
          />
          <ScrollView>
            <View style={styles.selectionList}>
              <Text style={styles.subHeading}>Select a language</Text>
              {
                LANGUAGES ? (
                  <CardList
                    items={LANGUAGES}
                    scrollDirection="horizontal"
                    handleSelected={(item) => setLanguage(item.id)}
                  />
                ) : <Text>No languages found!</Text>
              }
            </View>
            <View style={styles.selectionList}>
              <Text style={styles.subHeading}>Select a topic</Text>
              <CardList
                items={TOPICS}
                scrollDirection="horizontal"
                handleSelected={(item) => setTopic(item.text)}
              />
            </View>
            <View style={styles.proficiencyList}>
              <Text style={styles.subHeading}>Select test type</Text>
              <RadioButton
                radioOptions={TEST_TYPES}
                handleSelection={(e) => setTestType(e.value)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    if (loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header
          text={`Study - Memorized: ${answered.length}`}
          leftButton={<LadderIcon height={30} width={30} />}
          rightButton={<Text title="Back to Menu" onPress={navigateBackToMenu} />}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the missing word</Text>
          <Image source={currentImage} style={{ width: 300, height: 300 }} />
          {
            current ? (
              testType === 'sentences' ? (
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => setUserInput(text)}
                  value={userInput}
                />
              ) : (
                <Question
                  style={styles.questionContainer}
                  question={current.question}
                  options={current.options}
                  selectedOption={selected}
                  getAnswer={getAnswer}
                />
              )
            ) : null
          }
          <CustomButton
            state={button}
            wordCorrect={current?.options ? current?.options[current?.answer - 1] : ''}
            onPressedCheck={answerCheck}
            onPressedNext={answerNext}
            onPressedReset={answerReset}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header
          text={`Study - Memorized: ${answered.length}`}
          leftButton={<LadderIcon height={30} width={30} />}
          rightButton={<LadderIcon title="Back to Menu" onPress={navigateBackToMenu} />}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Fill in the missing word</Text>
          <Image source={currentImage} style={{ width: 300, height: 300 }} />
          {
            current ? (
              testType === 'sentences' ? (
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => setUserInput(text)}
                  value={userInput}
                />
              ) : (
                <Question
                  style={styles.questionContainer}
                  question={current.question}
                  options={current.options}
                  selectedOption={selected}
                  getAnswer={getAnswer}
                />
              )
            ) : null
          }
          <CustomButton
            state={button}
            wordCorrect={current?.options ? current?.options[current?.answer - 1] : ''}
            onPressedCheck={answerCheck}
            onPressedNext={answerNext}
            onPressedReset={answerReset}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  title: {
    color: 'black',
    paddingTop: '5%',
    paddingBottom: '5%',
    fontSize: 12,
  },
  subHeading: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  selectionList: {
    marginTop: 5,
    marginBottom: 5,
  },
  proficiencyList: {
    width: '100%',
    marginBottom: 70,
  },
  jsonDataBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  jsonKey: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  jsonValue: {
    flex: 2,
    fontSize: 16,
  },
  languageGuideContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    borderRadius: 50,
    backgroundColor: '#FFF',
    shadowColor: '#888881',
    shadowOffset: { width: Dimensions.get('window').width, height: Dimensions.get('window').width },
    shadowOpacity: 1,
    shadowRadius: 30,
    overflow: 'hidden',
  },
});

export default Study;
