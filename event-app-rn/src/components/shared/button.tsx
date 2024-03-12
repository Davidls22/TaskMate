import { Box, Text } from "../../utils/theme";
import React from "react";
import { Pressable } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  uppercase?: boolean;
};

const Button = ({
  label,
  onLongPress,
  onPress,
  disabled,
  uppercase,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Box
        bg={disabled ? "gray400" : "blu300"}
        py="3.5"
        borderRadius="rounded-3xl"
        margin="12"
      >
        <Text
          color="fuchsia800"
          variant="textSm"
          fontWeight="800"
          textAlign="center"
          textTransform={uppercase ? "uppercase" : "none"}
        >
          {label}
        </Text>
      </Box> 
    </Pressable>
  );
};

export default Button;
