import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

function RandomIcon({ height, width, color }) {
  return (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "#000"}
    >
      <G fillRule="evenodd">
        <Path d="M24.898 100.907a7.97 7.97 0 018.035-7.935l80.011.623c4.419.034 8.209 3.635 8.466 8.042l.517 8.868 26.68-42.392a7.776 7.776 0 0110.94-2.349l66.996 44.369a8.03 8.03 0 012.275 11.113l-43.766 66.506c-2.432 3.695-7.447 4.8-11.197 2.47l-51.928-32.265v26.49c0 4.419-3.583 8-7.993 8H32.498a7.949 7.949 0 01-7.959-7.998l.36-83.542zm11.828 6.694l-.189 71.811 74.127.073-.035-29.78-5.954-4.119c-1.809-1.25-2.375-3.81-1.257-5.71L111 127l-.466-19.749-73.808.35zM156.483 79L118 138.79l60.965 38.32 37.612-58.539L156.483 79z" />
        <Circle cx={138} cy={135} r={8} />
        <Circle cx={165} cy={130} r={8} />
        <Circle cx={193} cy={125} r={8} />
        <Circle cx={50} cy={124} r={8} />
        <Circle cx={73} cy={145} r={8} />
        <Circle cx={95} cy={123} r={8} />
        <Circle cx={51} cy={165} r={8} />
        <Circle cx={95} cy={165} r={8} />
      </G>
    </Svg>
  );
}

export default RandomIcon;
