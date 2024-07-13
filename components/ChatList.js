import { View, Text ,FlatList} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';
export default function ChatList({currentUser,users}) {

    const router = useRouter();
  return (
    <View style={[,tw`flex-1 `]}>
        <FlatList 
            data={users}
            contentContainerStyle={{flex:1,paddingVertical: 25}}
            keyExtractor={item=>Math.random().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=><ChatItem  
            noBorder={index+1== users.length} 
            item={item} 
            currentUser={currentUser}
            index={index}
            router={router}
        />}
        />
    </View>
  )
}