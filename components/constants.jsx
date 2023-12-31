// stores constants used in the application
// import all the icons from assets/icons

import {
  MusicIcon,
  FoodIcon,
  ActivitiesIcon,
  SportsIcon,
  TravelIcon,
  MoviesIcon,
  ArtIcon,
  PoliticsIcon,
  SchoolIcon,
  WeatherIcon,
  WorkIcon,
  RandomIcon,
  FamilyIcon,
  RelationshipsIcon,
  TechIcon,
  ArabicIcon,
} from "../assets/icons";

import {
  EnglishIcon,
  SpanishIcon,
  FrenchIcon,
  GermanIcon,
  ItalianIcon,
  PortugueseIcon,
  ChineseIcon,
  JapaneseIcon,
  KoreanIcon,
  RussianIcon,
  DutchIcon,
  HindiIcon,
  TurkishIcon,
  SwahiliIcon,
} from "../assets/icons";

const PROFICIENCY = {
  BEGINNER: "Beginner",
  CONVERSATIONAL: "Conversational",
  PROFICIENT: "Proficient",
};

const SKILL_LEVELS = [
  {
    id: "0",
    label: "Beginner",
    value: "Beginner",
  },
  {
    id: "1",
    label: "Conversational",
    value: "Conversational",
  },
  {
    id: "2",
    label: "Proficient",
    value: "Proficient",
  },
];

const LANGUAGES = [
  {
    id: "french",
    text: "French",
    icon: <FrenchIcon height={36} width={36} />,
  },
  {
    id: "arabic",
    text: "Arabic",
    icon: <ArabicIcon height={36} width={36} />,
  },
  {
    id: "swahili",
    text: "Swahili",
    icon: <SwahiliIcon height={36} width={36} />,
  }, {
    id: "portuguese",
    text: "Portuguese",
    icon: <PortugueseIcon height={36} width={36} />,
  },
];

const TOPICS = [
  {
    id: "daily",
    label: "Daily",
    icon: <RandomIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "politics",
    label: "Politics",
    icon: <PoliticsIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "work",
    label: "Work",
    icon: <WorkIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "friends & family",
    label: "Friends & Family",
    icon: <FamilyIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "tech",
    label: "Tech",
    icon: <TechIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "school",
    label: "School",
    icon: <SchoolIcon height={34} width={34} color="#0601B4" />,
  },
];

const TEST_TYPES = [
  { id: "words", label: "Words" },
  { id: "blanks", label: "Blanks" },
  { id: "sentences", label: "Sentences" }
];

const GAME_TYPES = [
  { id: "word", label: "Word Game" },
  { id: "flappybird", label: "Flappy Bird" },
  { id: "dino", label: "Dinosaur Game" }
]

export { SKILL_LEVELS, LANGUAGES, TOPICS, PROFICIENCY, TEST_TYPES, GAME_TYPES };
