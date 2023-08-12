import React from 'react';
import { Image } from 'react-native';

function LernaLangLogo({ width = 300, height = 300 }) {
  return (
    <Image
      source={require('./LernaLangLogo.png')}
      style={{ width, height, resizeMode: 'contain' }}
    />
  );
}

export default LernaLangLogo;
