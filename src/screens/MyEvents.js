import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Color from '../utils/themes/colors';
import SportyButton from '../components/SportyButton';
import {SCREEN_TYPE} from '../utils/themes/constant';

const MyEvents = props => {
  const DATA = [
    {
      id: 1,
      title: 'Cricket',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage.jpg'),
    },
    {
      id: 2,
      title: 'Football',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage2.jpg'),
    },
    {
      id: 3,
      title: 'Volly Ball',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage3.jpg'),
    },
    {
      id: 4,
      title: 'Cricket',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage.jpg'),
    },
    {
      id: 5,
      title: 'Football',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage2.jpg'),
    },
    {
      id: 6,
      title: 'Volly Ball',
      subtitle: 'Tournament',
      image: require('../assets/images/flatimage3.jpg'),
    },
  ];

  const onClickItem = () => {
    props.navigation.navigate(SCREEN_TYPE.EVENT_DETAIL.name, {
      title: 'Manoj Trophy',
      conductedBy: 'Manoj',
    });
  };
  const onClickFilterOption = () => {
    props.navigation.navigate(SCREEN_TYPE.DASHBOARD_FILTER.name);
  };
  const onClickAddEventOption = () => {
    props.navigation.navigate(SCREEN_TYPE.ADD_EVENTS.name);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={onClickItem} style={styles.item}>
        <Image style={styles.imageStyle} source={item.image} />
        <View style={styles.viewStle}>
          <Text style={styles.subTitleStyle}>{item.subtitle}</Text>
          <Text style={styles.titleStyle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerStyle}>
        <View style={styles.fullView}>
          <SportyButton title={'Filter'} onPress={onClickFilterOption} />
        </View>
        <View style={styles.fullView}>
          <SportyButton title={'Add Event'} onPress={onClickAddEventOption} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    justifyContent: 'center',
  },
  fullView: {
    flex: 1,
  },
  item: {
    margin: 10,
    alignSelf: 'center',
    backgroundColor: Color.White,
    width: '95%',
    borderRadius: 10,
    shadowColor: Color.PinkishPurple,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  imageStyle: {
    flex: 7,
    height: 200,
    aspectRatio: 1.87,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  viewStle: {
    flex: 2,
    justifyContent: 'center',
    padding: 10,
  },
  titleStyle: {
    flex: 1,
    color: Color.PinkishPurple,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 2,
  },
  subTitleStyle: {
    flex: 1,
    fontSize: 14,
    margin: 2,
  },
  footerStyle: {
    flexDirection: 'row',
  },
});

export default MyEvents;
