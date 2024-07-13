import { View, Text,Image ,TextInput,TouchableOpacity, Pressable,Alert} from 'react-native'
import React ,{ useRef ,useState,useContext}from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Ionicons, Octicons ,Feather} from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import CustomKeyBoardView from '../components/CustomKeyBoardView';
import { AuthContext } from '../context/authContext';
const SignUp = () => {
  const {register} = useContext(AuthContext);
  const router = useRouter()
  const emailRef= useRef("");
  const passwordRef= useRef("");
  const userNameRef= useRef("");
  const profileRef= useRef("");
  const [loading, setLoading] = useState(false)
  const handleRegister = async () =>{
    if(emailRef.current === "" || passwordRef.current === "" || userNameRef.current === "" || profileRef.current === ""){
      Alert.alert("Sign Up","Please fill all the fields");
      return;
    }
    console.log(emailRef.current,passwordRef.current);

    //register Process
    setLoading(true);
    let response = await register(emailRef.current,passwordRef.current,userNameRef.current,profileRef.current);
    setLoading(false);
    console.log(response);
    if (response.success){
      router.push("home");
    }else{
      Alert.alert("Sign Up",response.data);
    
    }
  }
  return (
    <CustomKeyBoardView>
      <StatusBar style="dark" />
      <View style={{paddingTop: hp(7), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
        {/* Logo */}
        <View className="items-center">
          <Image style={{ height: hp(20)}} resizeMode='contain' source={require('../assets/images/register.png')} />
        </View>

        {/* Form */}
        <View className="gap-10">
          <Text style={{fontSize: hp(4)}} className="text-center tracking-wider font-bold text-neutral-800"  >
            Sign Up 
          </Text>
          {/* Input */}
          <View className="gap-4">
            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center">
                <Feather name="user" size={hp(2.7)} color="gray" />
                <TextInput 
                  onChangeText={value => userNameRef.current = value}
                  style={{fontSize: hp(2)}}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="User Name"
                  placeholderTextColor={'gray'}
                />
            </View>
            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center">
                <Octicons name="mail" size={hp(2.7)} color="gray" />
                <TextInput 
                  onChangeText={value => emailRef.current = value}
                  style={{fontSize: hp(2)}}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Email Address"
                  placeholderTextColor={'gray'}
                />
              </View>
                <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center">
                    <Octicons name="lock" size={hp(2.7)} color="gray" />
                    <TextInput
                      onChangeText={value => passwordRef.current = value} 
                      style={{fontSize: hp(2)}}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="Create Password"
                      placeholderTextColor={'gray'}
                      secureTextEntry={true}
                    />
                </View>

              <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center">
                  <Feather name="image" size={hp(2.7)} color="gray" />
                  <TextInput 
                    onChangeText={value => profileRef.current = value}
                    style={{fontSize: hp(2)}}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Profile Picture URL"
                    placeholderTextColor={'gray'}
                  />
              </View>

          </View>
          {/* Button */}
          <View>
            {
            loading?(
              <View className="flex-row justify-center">
                <Loading size={hp(6.5)} />
              </View>

            ):(
              <TouchableOpacity onPress={handleRegister} style={{height:hp(6.5)}} className="bg-indigo-500 rounded-xl justify-center items-center">
                <Text style={{fontSize:hp(2.7)}} className="text-white font-bold tracking-wider">
                  Sign Up
                </Text>
              </TouchableOpacity>

            )
             }
          </View>
         
          {/* Sign Up Text */}
          <View className="flex-row justify-center">
              <Text style={{fontSize:hp(1.8)}} className="font-semibold text-neutral-500" > Already have an account? </Text>
              <Pressable onPress={()=>{router.push('signIn')}}>
                <Text style={{fontSize:hp(1.8)}} className="font-bold text-indigo-500" > Sign In </Text>
              </Pressable>
          </View>


        </View>
        </View>
    </CustomKeyBoardView>
  )
}

export default SignUp