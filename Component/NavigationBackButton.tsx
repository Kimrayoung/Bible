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
      {navigationText ? (
        <Text style={styles.textStyle}>{navigationText}</Text>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigationContainerStyle: {
    flexDirection: 'row',
    width: 100,
    paddingLeft: 10,
  },
  textStyle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 17,
    marginLeft: 3,
  },
});

export default NavigationBackButton;
