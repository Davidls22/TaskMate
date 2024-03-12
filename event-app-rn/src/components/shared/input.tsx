import {StyleSheet,TextInput,TextInputProps, View } from "react-native";
import theme, {Box, Text } from "../../utils/theme";
import { FieldError } from "react-hook-form"

type InputProps = {
    label: string
    error?: FieldError | undefined
  } & TextInputProps

  const Input = ({ label, error, ...props }: InputProps) => {
    return (
       <Box flexDirection="column" mb="6">
        <Text variant="textXs" textTransform="uppercase" mb="3.5">
            {label}
        </Text>
        <TextInput 
        style={{
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.fuchsia800,
            borderRadius: theme.borderRadii["rounded-5xl"]
        }}
        {...props}
        />
        {error && (
          <Text mt="3.5" color="rose500">
            {label} is required
          </Text>
        )}
       </Box>
    )
}

export default Input

const styles = StyleSheet.create({})