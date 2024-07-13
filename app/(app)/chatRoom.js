import { View, Text, TextInput, TouchableOpacity ,Alert, Keyboard} from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import tw, { create } from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import CustomKeyBoardView from '../../components/CustomKeyBoardView';
import { getRoomId } from '../../utils/common';
import { setDoc, Timestamp,doc,collection,addDoc,query,orderBy,onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
export default function chatRoom() {
    const item = useLocalSearchParams();
    const {user} = useAuth();
    const router = useRouter();
    const [messages, setMessage] = useState('')
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);
    
    useEffect(() => {
        createRoomIfNotExists();

        let roomId= getRoomId(user?.uid,item?.uid);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef,"messages");
        const q = query(messageRef, orderBy("createdAt", "asc"));

        let unsub=  onSnapshot(q, (snapshot) => {
                  let allMessages = snapshot.docs.map(doc =>{ return doc.data()});
                  setMessage([...allMessages]);
                });
        const KeyBoardDidShow = Keyboard.addListener('keyboardDidShow',updateScroll);

        return ()=>{
          unsub();
          KeyBoardDidShow.remove();
        }
    } , []);

    useEffect(() => {
        updateScroll();
    }, [messages])

    const updateScroll = () => { 
      setTimeout(() => {  
        scrollViewRef?.current.scrollToEnd({ animated: true })
      },100);
    }

    const createRoomIfNotExists = async () => {
      // create a room if it does not exist
      let roomId= getRoomId(user?.uid,item?.uid);
      await setDoc(doc(db,"rooms",roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      });
    }

    const handleSendMessage = async () => {
      let message=textRef.current;
      if(!message){ return;}
      try{
        let roomId= getRoomId(user?.uid,item?.uid);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef,"messages");
        textRef.current='';
        if (inputRef) {
          inputRef.current.clear();
        }

        const newDoc = await addDoc( messageRef,{
          uid: user?.uid,
          text: message,
          profileUrl: user?.profileUrl,
          senderName: user?.username,
          createdAt: Timestamp.fromDate(new Date())
        });

        console.log('new Message',newDoc.id);


      }catch(e){
        Alert.alert("Error",e.message)
      }



    }

  return (
    <CustomKeyBoardView inChat={true}>
    <View style={[tw`flex-1 bg-white`]}>
        <StatusBar style="dark" />

        <ChatRoomHeader user={item} router={router}/>
        <View style={[tw`h-3 border-b border-neutral-300`]}/>
        <View style={[tw`flex-1 justify-between bg-neutral-100 overflow-visible`]}>
            <View style={[tw`flex-1`]}>
                <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>    
            </View>  
            <View style={[{marginBottom: hp(1.7)},tw`pt-2`]}>

                  <View style={[tw`flex-row  mx-3 bg-white justify-between border p-2 rounded-full border-neutral-300 pl-5`]}>
                      <TextInput 
                          ref={inputRef}
                          onChangeText={value =>textRef.current=value}
                          placeholder="Type a message"
                          style={[{fontSize: hp(2)},tw`flex-1 mr-2`]}

                      />
                      <TouchableOpacity onPress={handleSendMessage} style={[tw`bg-neutral-200 p-2 mr-[1px] rounded-full`]}>
                        <Feather name="send" size={hp(2.7)} color="gray" />

                      </TouchableOpacity>
                    </View>
                </View>

        </View>
    </View>
    </CustomKeyBoardView>
  )
}