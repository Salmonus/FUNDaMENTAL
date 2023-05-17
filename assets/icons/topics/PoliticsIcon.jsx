import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function PoliticsIcon({ height, width, color }) {
  return (
    <Svg
      width={width || "800px"}
      height={height || "800px"}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "#000"}
    >
      <G fill="#000">
        <Path d="M7.25 1.25C7.25.56 7.81 0 8.5 0h1.75a.75.75 0 010 1.5h-1.5v1.056a5.002 5.002 0 014.242 4.653.75.75 0 11-1.498.086 3.5 3.5 0 00-6.988 0 .75.75 0 11-1.498-.086A5.002 5.002 0 017.25 2.556V1.25z" />
        <Path
          fillRule="evenodd"
          d="M1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H13v4h2.25a.75.75 0 010 1.5H.75a.75.75 0 010-1.5H3v-4H1.75A.75.75 0 011 9.75zm3.5 4.75h2.75v-4H4.5v4zm4.25 0h2.75v-4H8.75v4z"
          clipRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export default PoliticsIcon;
