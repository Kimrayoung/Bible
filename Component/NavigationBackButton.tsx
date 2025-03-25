import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

interface NavigationBackButtonProps {
  onPressHandle: () => void;
  imageShown: Boolean;
  navigationText: string | null;
}

const NavigationBackButton: React.FC<NavigationBackButtonProps> = ({
  onPressHandle,
  imageShown,
  navigationText,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressHandle}
      style={styles.navigationContainerStyle}>
      {imageShown ? (
        <FontAwesome5 name="chevron-left" iconStyle="solid" size={20} />
      ) : (
        <></>
      )}
      {navigationText ? <Text>{navigationText}</Text> : <></>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigationContainerStyle: {
    flexDirection: 'row',
    width: 60,
  },
});

export default NavigationBackButton;
