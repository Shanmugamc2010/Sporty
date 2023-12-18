import React, {useEffect, useState} from 'react';
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
import {apiCall} from '../apimanager/ApiManager';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {useRoute} from '@react-navigation/native';
import {isAfterDate, isBeforeDate} from '../utils/helper';

const MyEvents = props => {
  const [tournamentData, setTournamentData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [filterValues, setFilterValues] = useState(null);
  const route = useRoute();
  useEffect(() => {
    getTournamentsData();
  }, []);
  const getTournamentsData = async () => {
    const response = await apiCall(
      ApiNetwork.getTournamentsApiCall({
        pageNo: 1,
        rowsPerPage: 100,
        Status: 1,
      }),
    );
    getFlatListData(response?.result);
  };

  const getFlatListData = res => {
    const currentDate = new Date();
    let data = [];
    if (
      route.name === SCREEN_TYPE.ALL_EVENT.name ||
      route.name === SCREEN_TYPE.ALL_EVENTS.name
    ) {
      data = res;
    } else if (route.name === SCREEN_TYPE.PAST_EVENT.name) {
      data = res.filter(value => isBeforeDate(value.startDate, currentDate));
    } else if (route.name === SCREEN_TYPE.FUTURE_EVENT.name) {
      data = res.filter(value => isAfterDate(value.startDate, currentDate));
    }
    setTournamentData(data);
  };

  const onClickItem = item => {
    props.navigation.navigate(SCREEN_TYPE.EVENT_DETAIL.name, {
      tournamentId: item.tournamentId,
    });
  };
  const onClickFilterOption = () => {
    props.navigation.navigate(SCREEN_TYPE.DASHBOARD_FILTER.name, {
      tournamentData,
      setFilteredData,
      setFilterValues,
      filterValues,
    });
  };
  const onClickAddEventOption = () => {
    props.navigation.navigate(SCREEN_TYPE.ADD_EVENTS.name);
  };
  const renderItem = ({item}) => {
    const isValidImage =
      item?.uploadedDocument1 !== '' && item?.uploadedDocument1 !== 'string';
    return (
      <TouchableOpacity onPress={() => onClickItem(item)} style={styles.item}>
        <Image
          style={styles.imageStyle}
          source={
            isValidImage
              ? {uri: `data:image/jpg;base64,${item?.uploadDocument1}`}
              : require('../assets/images/flatimage3.jpg')
          }
        />
        <View style={styles.viewStle}>
          <Text style={styles.subTitleStyle}>{item.venue}</Text>
          <Text style={styles.titleStyle}>{item.tournamentTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData ? filteredData : tournamentData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerStyle}>
        {route?.name === SCREEN_TYPE.ALL_EVENTS.name ? (
          <View style={styles.fullView}>
            <SportyButton title={'Filter'} onPress={onClickFilterOption} />
          </View>
        ) : null}
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
