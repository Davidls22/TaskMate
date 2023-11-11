import React from "react"
import Svg, { Path } from "react-native-svg"

type IconProps = {
  width?: number
  height?: number
  color?: string
}

type IconName = "home" | "completed" | "categories" | "calendar"

const Home = ({ color = "black", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12L12 2L22 12H19V21H5V12H2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  
  const Completed = ({ color = "black", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Custom SVG paths for the completed icon */}
      <Path
        d="M9 17L4 12L3 13L9 19L21 7L20 6L9 17Z"
        fill={color} // Use 'fill' instead of 'stroke' for a filled shape
      />
    </Svg>
  );
  
  

  const Calendar = ({ color = "black", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Custom SVG paths for the calendar icon */}
      <Path
        d="M20 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V6C22 4.89543 21.1046 4 20 4Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2V6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 2V6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 10H22"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  

  const Categories = ({
    color = "black",
    height = 20,
    width = 20,
  }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Custom SVG paths for the categories icon */}
      <Path
        d="M4 5H20V7H4V5ZM4 12H20V14H4V12ZM4 19H20V21H4V19Z"
        fill={color} // Use 'fill' instead of 'stroke' for a filled shape
      />
    </Svg>
  );
  
  

const Icons = ({
  name,
  color,
  height,
  width,
}: IconProps & { name: IconName }) => {
  switch (name) {
    case "home":
      return <Home color={color} height={height} width={width} />
    case "completed":
      return <Completed color={color} height={height} width={width} />
    case "categories":
      return <Categories color={color} height={height} width={width} />
    case "calendar":
      return <Calendar color={color} height={height} width={width} />
  }
}

export default Icons