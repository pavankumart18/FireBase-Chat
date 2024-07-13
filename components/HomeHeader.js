import { View, Text, Platform } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import tw from 'twrnc';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItems } from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';


export default function HomeHeader() {
  const { user,logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const handleProfile = () => {
    console.log("profile")
  }
  const handleLogout = async () => {
    await logout();
  }

  return (
    <View style={[{ paddingTop: Platform.OS == 'ios' ? top : top + 10 }, tw`flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow`]}>
      <View>
        <Text style={[{ fontSize: hp(3) }, tw`font-medium text-white`]}>Chats</Text>
      </View>
      <View>
      <Menu>
        <MenuTrigger customStyles={{
          triggerWrapper: {
            height: hp(5),
            width: hp(5),
            borderRadius: hp(100),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.2)',
          },
        
        }}>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: hp(100) }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
        </MenuTrigger>
        <MenuOptions 
        customStyles={{
          optionsContainer:{
            borderRadius: 10,
            borderCurve: 'continuous',
            marginTop: 40,
            marginLeft: -30,
            backgroundColor: 'white',
            shadowColor: '0.2',
            shadowOffset: {
              width: 0,
              height: 0,
            },
                
            width: wp(30),
          }
        }}
        >
         <MenuItems 
         text="Profile"
         action={handleProfile}
          value={null}
          icon={<Feather name="user" size={hp(2.5)} color="black" />}

         />
         <Divider />
         <MenuItems 
         text="Logout"
         action={handleLogout}
          value={null}
          icon={<AntDesign name="logout" size={hp(2.5)} color="black" />}

         />
        </MenuOptions>
      </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return (
    <View style={[{ height: hp(0.1), backgroundColor: 'rgba(255,255,255,0.5)' }, tw`pd-[1px] w-full bg-neutral-200`]}>
    </View>
  )
}
