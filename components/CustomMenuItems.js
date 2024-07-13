
import {
    MenuOption,
  } from 'react-native-popup-menu';

import { View, Text } from 'react-native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';




export const MenuItems = ({
    text,action,value,icon
})=>{
    return (
        <MenuOption onSelect={()=> action(value)} >
            <View style={[tw`px-4 py-1 flex-row items-center justify-between`]}>
                <Text style={[{fontSize:hp(1.7)},tw`text-neutral-600 font-semibold`]}>{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}