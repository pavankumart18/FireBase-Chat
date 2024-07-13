import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default StartPage;