import React from "react";
import { fetcher } from "../../services/config";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import { Box, Text } from "../../utils/theme";
import useSWR from "swr";

const HomeScreen = () => {
    const { data, isLoading } = useSWR("categories", fetcher)
    return(
    <SafeAreaWrapper>
        <Box>
            <Text>Home</Text>
        </Box>
        </SafeAreaWrapper>
    )

}

export default HomeScreen