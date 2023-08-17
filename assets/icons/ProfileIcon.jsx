import * as React from "react";
import { Image, View } from "react-native";

ProfileIcon = ({ border }) => {
  return (
    <View>
      <Image 
        source={border}
        style={{width: 36, height: 36}}
        resizeMode="stretch"
      />
      <Image 
        source={require("../../assets/images/settings_box_icon.png")}
        style={{width: 28, height: 28, position: "absolute", left: 4, top: 4}}
      />
    </View>
  );
};

export default ProfileIcon;
