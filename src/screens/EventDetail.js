import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Color from '../utils/themes/colors';
import {FONT_NAME} from '../utils/themes/FontName';
import {SCREEN_TYPE} from '../utils/themes/constant';
const EventDetail = ({route, navigation}) => {
  const {title} = route.params;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollToIndex(currentIndex);

      setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);
  const lineSeperator = () => {
    return <View style={styles.seperatorStyle} />;
  };
  const gameDetailItem = (key, value) => {
    return (
      <View style={styles.gameDetailContainer}>
        <Text style={styles.gameDetailKeyText}>{`${key}`}</Text>
        <Text style={styles.gameDetailValueStyle}>{`: ${value}`}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };

  const Swiper = () => {
    return (
      <View style={styles.swipeContainer}>
        <FlatList
          ref={flatListRef}
          data={[
            {
              id: '1',
              image: require('/Users/dev/Sporty/src/assets/images/image.jpeg'),
            },
            {
              id: '2',
              image: require('/Users/dev/Sporty/src/assets/images/image1.jpeg'),
            },
            {
              id: '3',
              image: require('/Users/dev/Sporty/src/assets/images/image2.jpeg'),
            },
          ]}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <>
        {gameDetailItem('Conducted By', 'Manoj')}
        {gameDetailItem('Venue', 'Chennai')}
        {gameDetailItem('Game Type', 'Cricket')}
        {gameDetailItem('Gender', 'Male')}
        {gameDetailItem('State', 'Tamil Nady')}
        {gameDetailItem('District', 'Theni')}
        {gameDetailItem('Start Date', '10/11/2021')}
        {gameDetailItem('End Date', '10/11/2021')}
        {gameDetailItem('Last Date Of Registration', '10/11/2021')}
        {gameDetailItem('Registration Link', '10/11/2021')}
        {gameDetailItem('Contact Email', 'manoj.s@foodhub.com')}
        {gameDetailItem('Contact Number1', '8531896253')}
        {gameDetailItem('Contact Number2', '8531896253')}
        {gameDetailItem('Prize Money', '1000 rupees')}
        {gameDetailItem('Prize Details', 'Trophy')}
        {gameDetailItem('Game Rules', '-')}
      </>
    );
  };

  const onEditPress = () => {
    const eventDetails = {
      titleProps: 'Manoj Trophy',
      conductedProps: 'Manoj',
      venueProps: 'Chennai',
      gameTypeProps: 'Cricket',
      registerProps: 'manoj.com',
      emailProps: 'manoj.s@foodhub.com',
      contact1Props: '123',
      contact2Props: '123',
      prizeMoneyProps: '10',
      prizeDetailsProps: 'none',
      rulesProps: 'win',
    };
    navigation.navigate(SCREEN_TYPE.ADD_EVENTS.name, {
      eventDetails,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTextStyle}>{title}</Text>
        <TouchableOpacity style={styles.headerContainer} onPress={onEditPress}>
          <Text style={styles.editTextStyle}>Edit</Text>
        </TouchableOpacity>
      </View>
      {lineSeperator()}
      <ScrollView style={styles.scrollViewStyle}>
        {Swiper()}
        <View style={styles.itemContainer}>{renderDetails()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 8, flex: 1},
  scrollViewStyle: {flex: 1},
  editTextStyle: {
    color: 'blue',
    fontSize: 17,
    paddingHorizontal: 10,
    fontFamily: FONT_NAME.SEMI_BOLD,
  },
  headerContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    borderRadius: 6,
  },
  headerTextStyle: {
    color: Color.PinkishPurple,
    fontFamily: FONT_NAME.BOLD,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  seperatorStyle: {
    borderColor: Color.MoodyBlue,
    borderWidth: 0.5,
    width: '95%',
    marginVertical: 5,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 6,
    marginTop: 10,
    padding: 10,
    backgroundColor: Color.White,
    shadowColor: 'grey',
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
  },
  gameDetailContainer: {
    marginHorizontal: 2,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
  },
  gameDetailKeyText: {
    flex: 0.4,
    fontFamily: FONT_NAME.SEMI_BOLD,
    color: Color.MoodyBlue,
    fontSize: 16,
  },
  gameDetailValueStyle: {
    flex: 0.6,
    fontFamily: FONT_NAME.SEMI_BOLD,
    color: Color.PinkishPurple,
    fontSize: 16,
  },
  imageStyle: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageContainer: {
    paddingRight: '8%',
    width: Dimensions.get('window').width,
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  swipeContainer: {
    marginVertical: 10,
    height: 150,
  },
});

export default EventDetail;
