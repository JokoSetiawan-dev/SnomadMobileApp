import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useProfilePicture } from '@/store/hooks/useProfilePicture';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@/store/hooks/useUser';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atom/authAtom';

interface ProfilePictureProps {
 size?: number;
 className?: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
 size = 100,
 className = ""
}) => {
 const { pickAndUploadImage, isLoading, error } = useProfilePicture();
 const { getUserFromStorage, updateUserData } = useUser();
 const [userData, setUserData] = useState<any>(null);
 const [imageError, setImageError] = useState(false);
 const [user] = useRecoilState(userState)

 useEffect(() => {
   const fetchUserData = async () => {
     const user = await getUserFromStorage();
     setUserData(user);
   };

   fetchUserData();
 }, []);


 const handlePress = async () => {
   try {
     setImageError(false);
     await pickAndUploadImage();
   } catch (err) {
     console.error('Failed to update profile picture:', err);
   }
 };

 return (
   <View className={`relative ${className}`}>
     <TouchableOpacity
       onPress={handlePress}
       disabled={isLoading}
       className="relative"
     >
       <Image
         source={{
           uri: imageError || !user?.profilePicture
             ? 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png'
             : user.profilePicture
         }}
         className={`rounded-full`}
         style={{ width: size, height: size }}
         onError={() => setImageError(true)}
       />

       {isLoading && (
         <View className="absolute inset-0 bg-black/30 rounded-full items-center justify-center">
           <ActivityIndicator color="white" />
         </View>
       )}

       <View className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm">
         <Ionicons name="person-outline" size={size * 0.2} />
       </View>
     </TouchableOpacity>

     {error && (
       <Text className="text-red-500 text-xs mt-1 text-center">
         {error}
       </Text>
     )}
   </View>
 );
};