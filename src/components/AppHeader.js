import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../utils/themes/colors';
import {useRoute} from '@react-navigation/native';
import {SCREEN_TYPE} from '../utils/themes/constant';

const AppBar = props => {
  const route = useRoute();

  const onClickLeftIcon = () => {
    if (!props.onClickLeftIcon) {
      props.navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerLeft} onPress={onClickLeftIcon}>
        <Image
          style={styles.backIcon}
          source={
            route?.name === SCREEN_TYPE.DASHBOARD.name
              ? null
              : require('../assets/images/left-arrow.png')
          }
        />
        <Text style={styles.title}>{props.options?.headerTitle}</Text>
      </TouchableOpacity>
      <View style={styles.fullView} />
      <Image
        style={styles.logoStyle}
        source={require('./../assets/images/LogoMedium.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Color.White,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    color: Color.PinkishPurple,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  logoStyle: {
    width: 50,
    height: 50,
  },
});

export default AppBar;
