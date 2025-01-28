import { Text, View, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/store/hooks/useUser";
import { useEditProfile } from "@/store/hooks/useEditProfile";
import { Controller } from "react-hook-form";
import CustomInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { ProfilePicture } from "@/components/ProfilePicture";

export default function EditProfile() {
   const { form, isSubmitting, error, onSubmit } = useEditProfile();
   const {
     control,
     formState: { errors },
     watch,
   } = form;
   const { getUserFromStorage } = useUser();
   const [userData, setUserData] = useState<any>(null);
   
   useEffect(() => {
     const fetchUserData = async () => {
       const user = await getUserFromStorage();
       setUserData(user);
     };

     fetchUserData();
   }, []);

   useEffect(() => {
     const subscription = watch((value) => {
       console.log('Form values:', value);
     });
     return () => subscription.unsubscribe();
   }, [watch]);

   const handleSubmitWithNavigation = async () => {
       try {
         await onSubmit();
       } catch (error) {
         console.error("Submit error:", error);
         router.push("/profile");
       }
   };

   return (
     <SafeAreaView>
       <View className="p-[30px] flex flex-col h-full">
         <View className="flex flex-row items-center gap-6">
           <Link 
             href={{
               pathname: "/profile",
               params: { timestamp: Date.now() }
             }}
           >
             <Ionicons
               name={"arrow-back"}
               size={25}
               className="mx-[30px]"
             />
           </Link>
           <Text className="font-poppins-medium text-[18px]">Edit Profile</Text>
         </View>
         <View className="mt-[50px] ">
           <ProfilePicture size={100} />
         </View>
         <View className="mt-[50px]">
           <Controller
             control={control}
             name="name"
             render={({ field: { onChange, value } }) => (
               <CustomInput
                 className="placeholder: font-poppins-light placeholder: text-[12px] placeholder: w-full"
                 iconSource={require("../assets/icons/person4.png")}
                 placeholder="Enter your name"
                 value={value}
                 onChangeText={onChange}
                 secureTextEntry={false}
                 errorMessage={errors.name?.message}
               />
             )}
           />

           <View className="flex flex-row w-full border border-gray-300 h-[50px] rounded-full items-center mb-[20px]">
             <Ionicons
               name={"mail-outline"}
               size={20}
               className="mx-[20px]"
             />
             <Text className="text-[12px] font-poppins-light">
               {userData?.email}
             </Text>
           </View>

           <Controller
             control={control}
             name="telephone"
             render={({ field: { onChange, value } }) => (
               <CustomInput
                 className="placeholder: font-poppins-light placeholder: text-[12px] placeholder: w-full"
                 iconSource={require("../assets/icons/call.png")}
                 placeholder="Enter your phone number"
                 value={value}
                 onChangeText={(text) => {
                   const numericValue = text.replace(/[^0-9]/g, '');
                   onChange(numericValue);
                 }}
                 secureTextEntry={false}
                 errorMessage={errors.telephone?.message}
                 keyboardType="numeric"
                 maxLength={15}
               />
             )}
           />
         </View>
         <View className="flex-1 justify-end">
           <SubmitButton
             onPress={handleSubmitWithNavigation}
             isSubmitting={isSubmitting}
             buttonText="Save changes"
             disabled={isSubmitting}
           />
         </View>
       </View>
     </SafeAreaView>
   );
}