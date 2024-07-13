import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser}) {
    if(currentUser?.uid==message?.uid){
        // Message sent by the current user
        return (
            <View style={[tw`justify-end mb-3 mr-3 flex-row`]}>
                <View style={{width:wp(80)}}>
                    <View style={[tw`flex self-end p-3 rounded-2xl bg-white border border-neutral-200`]}>
                        <Text style={{fontSize:hp(1.9)}}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        )
    }else{
        // Message sent by the other user
        return (
            <View style={[tw` mb-3 ml-3 flex-row`]}>
                <View style={{width:wp(80)}}>
                    <View style={[tw`flex self-start p-3 px-4 rounded-2xl bg-indigo-200 border border-indigo-200`]}>
                        <Text style={{fontSize:hp(1.9)}}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}