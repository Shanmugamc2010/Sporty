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
import {apiCall} from '../apimanager/ApiManager';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {isAfterOrEqualDate, isValidString} from '../utils/helper';
const EventDetail = ({route, navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tournamentData, setTournamentData] = useState([]);
  useEffect(() => {
    getTournamentData();
  }, []);
  const getTournamentData = async () => {
    const response = await apiCall(
      ApiNetwork.getTournamentApiCall({
        tournamentId: route.params.tournamentId,
      }),
    );
    setTournamentData(response?.data);
  };

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
    let val = isValidString(value) ? value : '';
    return (
      <View style={styles.gameDetailContainer}>
        <Text style={styles.gameDetailKeyText}>{`${key}`}</Text>
        <Text style={styles.gameDetailValueStyle}>{`: ${val}`}</Text>
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
              image: null,
            },
            {
              id: '2',
              image: null,
            },
            {
              id: '3',
              image: null,
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
  const keysToRemove = [
    'tournamentId',
    'gameTypeId',
    'uploadedDocument1',
    'uploadedDocument2',
    'uploadedDocument3',
    'statusId',
    'gameType',
  ];

  const renderDetails = () => {
    return (
      <>
        {Object.entries(tournamentData)
          .filter(([key]) => !keysToRemove.includes(key))
          .map(([key, value]) => {
            return (
              <View key={key}>{gameDetailItem(key, value?.toString())}</View>
            );
          })}
      </>
    );
  };

  const onEditPress = () => {
    navigation.navigate(SCREEN_TYPE.ADD_EVENTS.name, {
      eventDetails: tournamentData,
      isUpdateTournament: true,
    });
  };

  const isEventEditable = () => {
    let res = false;
    if (tournamentData.startDate) {
      res = tournamentData
        ? isAfterOrEqualDate(tournamentData.startDate, new Date())
        : false;
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTextStyle}>
          {tournamentData?.tournamentTitle}
        </Text>
        {isEventEditable() ? (
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={onEditPress}>
            <Text style={styles.editTextStyle}>Edit</Text>
          </TouchableOpacity>
        ) : null}
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
