import React, { useEffect, useState } from 'react'
import { Text, View ,Button, Pressable, StatusBar} from 'react-native'
import { useAuth } from '../../context/authContext'
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native';
import ChatList from '../../components/ChatList';
import tw from 'twrnc';
import { query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseconfig';
import { getDocs } from 'firebase/firestore';
export default function Home(){
    const {user} = useAuth();
    const [users, setUsers] = useState([])
    useEffect(() => {
      if(user.uid!==undefined && user){
        getUsers()
      }
      
    }, [])
    const getUsers = async ()=>{
      //fetch users
      const q = query(usersRef,where("uid","!=",user.uid));
      const querySnapshot = await getDocs(q);
      let data=[]
      querySnapshot.forEach((doc)=>{
        data.push({...doc.data()})
      })
      setUsers(data)
    }
    return (
      <View className="flex-1 bg-white">
        <StatusBar style="light" />
        {
          users.length>0?(
            <ChatList  currentUser={user} users={users}/>

          ):(
            <View style={[{top:hp(30)},tw`flex items-center`]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
        }
      </View>
    )
}

