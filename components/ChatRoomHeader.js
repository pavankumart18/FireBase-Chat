import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({user,router}) {
  return (
    <Stack.Screen 
        options={{
            title:'',
            headerShadowVisible:false,
            headerLeft:()=>{
                return(
                    <View style={tw`flex-row items-center gap-4`}>
                        <TouchableOpacity onPress={()=> router.back()}>
                            <Entypo name="chevron-left" size={hp(4)} color="gray" />
                        </TouchableOpacity>
                        <View style={tw`flex-row items-center gap-3`}>
                            <Image 
                                source={user?.profileUrl}
                                style={[{height:hp(6),width: hp(6),borderRadius:100},tw`w-12 h-12 rounded-full`]}
                            />
                            <Text style={[{fontSize: hp(2.5)},tw`font-semibold text-neutral-800`]}>
                                {user?.username}
                                </Text>
                            </View>
                    </View>
                )
            },
            headerRight:()=>{
                return(
                <View style={[tw`flex-row items-center gap-8`]}>
                    <Ionicons name="call" size={hp(3)} color={'#737373'} />
                    <Ionicons name="videocam" size={hp(3)} color={'#737373'} />
                </View>
                );
            }
        }}
    />
  )
}