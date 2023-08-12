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
    icon: <FrenchIcon height={50} width={50} />,
  },
  {
    id: "arabic",
    text: "Arabic",
    icon: <ArabicIcon height={50} width={50} />,
  },
  {
    id: "swahili",
    text: "Swahili",
    icon: <SwahiliIcon height={50} width={50} />,
  }, {
    id: "portuguese",
    text: "Portuguese",
    icon: <PortugueseIcon height={50} width={50} />,
  },
];

const TOPICS = [
  {
    id: "0",
    text: "Daily",
    icon: <RandomIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "1",
    text: "Politics",
    icon: <PoliticsIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "2",
    text: "Work",
    icon: <WorkIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "3",
    text: "Friends & Family",
    icon: <FamilyIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "4",
    text: "Tech",
    icon: <TechIcon height={34} width={34} color="#0601B4" />,
  },
  {
    id: "5",
    text: "School",
    icon: <SchoolIcon height={34} width={34} color="#0601B4" />,
  },
];

export { SKILL_LEVELS, LANGUAGES, TOPICS, PROFICIENCY };
