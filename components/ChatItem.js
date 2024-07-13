import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';
import {Image} from 'expo-image'
import { blurhash, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';

export default function ChatItem({item,index,router,noBorder,currentUser,}) {
    const [lastMessage,setLastMessage] = useState(undefined);
        
    useEffect(() => {

        let roomId= getRoomId(currentUser?.uid,item?.uid);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef,"messages");
        const q = query(messageRef, orderBy("createdAt", "desc"));

        return onSnapshot(q, (snapshot) => {
                  let allMessages = snapshot.docs.map(doc =>{ return doc.data()});
                  setLastMessage(allMessages[0] || null);
                });
    } , []);

    console.log(lastMessage)
    const openChatRoom = ()=>{
        router.push({pathname:"/chatRoom",params:item});
    }

    const renderTime = ()=>{
        if(lastMessage){
            let date = new Date(lastMessage?.createdAt?.seconds*1000);
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        return "";
    }
    const renderLastMessage = ()=>{
        if(typeof lastMessage === 'undefined'){
            return "Loading...";
        }
        if(lastMessage){
            if (lastMessage?.uid === currentUser?.uid) {
                return `You: ${lastMessage?.text}`
            }
            return lastMessage?.text;
        } 
        return "Say Hi!";
    }
  return (
    <TouchableOpacity onPress={openChatRoom} style={[tw`flex-row justify-between mx-4 gap-3 items-center mb-4 pb-4 ${noBorder? '' : 'border-b border-b-neutral-200'}`]}>
        {/* <Image source={{uri: item?.profileUrl}} style={[{height:hp(6),width: hp(6)},tw`w-12 h-12 rounded-full`]} /> */}

        <Image 
            style={[{height:hp(6),width: hp(6),borderRadius:100},tw`w-12 h-12 rounded-full`]}
            source={{uri: item?.profileUrl}}
            placeholder={blurhash}
            transition={500}
        />


        {/* name and last message*/}
        <View style={[tw`flex-1 gap-1`]}>
            <View style={[tw`flex-row justify-between` ]}>
                <Text style={[{fontSize: hp(1.8)},tw`font-semibold text-neutral-800`] }>
                    {item?.username}
                </Text>
                <Text style={[{fontSize: hp(1.6)},tw`font-medium text-neutral-500`] }>
                    {renderTime()}
                </Text>

            </View>
            <Text style={[{fontSize: hp(1.4)},tw`text-neutral-600`]}>{renderLastMessage()} </Text>

        </View>
    </TouchableOpacity>
  )
}