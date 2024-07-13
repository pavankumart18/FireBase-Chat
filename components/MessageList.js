import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages ,scrollViewRef,currentUser}) {
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <MessageItem key={index} message={message} currentUser={currentUser}/>
        ))
      ) : (
        <Text>No messages available</Text>
      )}
    </ScrollView>
  )
}
