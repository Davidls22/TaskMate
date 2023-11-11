import {StyleSheet,TextInput,TextInputProps, View } from "react-native";
import theme, {Box, Text } from "../../utils/theme";

type InputProps = {
    label: string
    error?: undefined
} & TextInputProps

const Input = ({ label }: InputProps) => {
    return (
       <Box flexDirection="column" mb="6">
        <Text variant="textXs" textTransform="uppercase" mb="3.5">
            {label}
        </Text>
        <TextInput 
        style={{
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.fuchsia500,
            borderRadius: theme.borderRadii["rounded-7xl"]
        }}
    placeholder={"Email"}
    />
       </Box>
    )
}

export default Input

const styles = StyleSheet.create({})