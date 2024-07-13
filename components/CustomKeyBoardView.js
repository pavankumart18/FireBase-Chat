import { View, Text } from 'react-native'
import React from 'react'
import { Platform , KeyboardAvoidingView, ScrollView} from 'react-native'
export default function CustomKeyBoardView({children,inChat}) {
  let keyConfig= {};
  let scrollViewConfig = {};
  if (inChat) {
    keyConfig = {keyboardVerticalOffset: 90}
    scrollViewConfig = {contentContainerStyle:{flexGrow:1}}
  }
    
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex:1}}
    {...keyConfig}
    >
        <ScrollView
        style={{flex:1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}