// components/SeePasswordButton.tsx
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface SeePasswordButtonProps {
  isSecure: boolean;
  onPress: () => void;
}

const SeePasswordButton: React.FC<SeePasswordButtonProps> = ({ isSecure, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {isSecure ? (
        <Image source={require("../assets/icons/eye-open.png")} style={{ width: 20, height: 20}}/> // Show eye icon when password is hidden
      ) : (
        <Image source={require("../assets/icons/eye-close.png")} style={{ width: 20, height: 20}}/> // Show eye-off icon when password is visible
      )}
    </TouchableOpacity>
  );
};

export default SeePasswordButton;
