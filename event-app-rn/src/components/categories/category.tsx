import { ICategory } from '../../types'
import React from 'react'
import { Box, Text } from '../../utils/theme'
import { Entypo } from '@expo/vector-icons'

type CategoryProps = {
    category: ICategory
}

const Category = ({category}: CategoryProps) => {
  return (
    <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
      <Box flexDirection="row" alignItems="center" justifyContent='space-between'>
      <Box flexDirection="row" >
        <Text variant="textBase" fontWeight="600" mr="3">
          {category.icon.symbol}
        </Text>
        <Text variant="textBase" fontWeight="600">
          {category.name}
        </Text>
      </Box>
      <Entypo name="dots-three-vertical" size={16}/>
      </Box>
    </Box>
  )
}

export default Category
