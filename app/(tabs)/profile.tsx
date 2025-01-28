import { Text, View, Image } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/store/hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import NavigateToEditProfileButton from "@/components/NavigateToEditProfileButton";

export default function Profile() {
 const { getUserFromStorage } = useUser();
 const [userData, setUserData] = useState<any>(null);
 const params = useLocalSearchParams();

 useEffect(() => {
   const fetchUserData = async () => {
     const user = await getUserFromStorage();
     setUserData(user);
   };

   fetchUserData();
 }, [params.timestamp]); // Re-fetch when timestamp changes (after updates)

 const profilePic =
   userData?.profilePicture ||
   "https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png";

 return (
   <SafeAreaView className="h-full">
     <View className="flex p-[30px]">
       <Text className="font-poppins-medium text-[18px]">Profile</Text>
       <View className="flex flex-row items-center mt-[30px]">
         <Image
           className="w-[100px] h-[100px] rounded-full"
           source={{ uri: profilePic }}
         />
         <View className="ml-[30px] flex gap-2">
           <Text className="text-[18px] font-poppins-semibold">
             {userData?.name || "Guest User"}
           </Text>
           <NavigateToEditProfileButton/>
         </View>
       </View>
       <View className="mt-[45px] flex gap-[20px]">
         <View className="flex flex-row w-full border border-gray-400 h-[50px] rounded-full items-center">
           <Ionicons
             name={"person-outline"}
             size={20}
             className="mx-[30px]"
           />
           <Text className="text-[12px] font-poppins-light">
             {userData?.name}
           </Text>
         </View>
         <View className="flex flex-row w-full border border-gray-400 h-[50px] rounded-full items-center">
           <Ionicons
             name={"mail-outline"}
             size={20}
             className="mx-[30px]"
           />
           <Text className="text-[12px] font-poppins-light">
             {userData?.email}
           </Text>
         </View>
         <View className="flex flex-row w-full border border-gray-400 h-[50px] rounded-full items-center">
           <Ionicons
             name={"call-outline"}
             size={20}
             className="mx-[30px]"
           />
           <Text className="text-[12px] font-poppins-light">
             {userData?.telephone || "You haven't provided "}
           </Text>
         </View>
         <View className="flex flex-row w-full border border-gray-400 h-[50px] rounded-full items-center">
           <Ionicons
             name={"lock-closed-outline"}
             size={20}
             className="mx-[30px]"
           />
           <Text className="text-[12px] font-poppins-light">******</Text>
           <View className="bg-[#E25822] h-[25px] rounded-full items-center justify-center w-[130px] ml-[60px]">
             <Link
               className="text-[12px] text-white font-poppins-medium"
               href={{
                 pathname: "/changePassword",
                 params: { timestamp: Date.now() }
               }}
             >
               Change password
             </Link>
           </View>
         </View>
       </View>
     </View>
   </SafeAreaView>
 );
}