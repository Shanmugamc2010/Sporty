import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Color from '../utils/themes/colors';
import SportyButton from '../components/SportyButton';

const onClickRenderItem = () => {};

const renderItem = ({item, index}) => {
  return (
    <TouchableOpacity
      onPress={onClickRenderItem}
      style={index === 0 ? styles.selecteditem : styles.item}>
      <Text
        style={[
          styles.filterTypeText,
          index === 0 ? {fontWeight: '600'} : null,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};
const renderFilterValuesItem = ({item}) => {
  return (
    <TouchableOpacity onPress={onClickRenderItem} style={styles.valuesitem}>
      <Image
        source={require('./../assets/images/unchecked.png')}
        style={styles.checkBox}
      />
      <Text style={styles.filterTypeText}>{item}</Text>
    </TouchableOpacity>
  );
};

const DashboardFilter = props => {
  const filterTypes = ['State', 'District', 'Game', 'Gender', 'Category'];
  const filterValues = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
  ];
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <FlatList
          data={filterTypes}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={filterValues}
          renderItem={renderFilterValuesItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footerStyle}>
        <View style={styles.fullView}>
          <SportyButton
            title={'Cancel'}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
        <View style={styles.fullView}>
          <SportyButton title={'Reset'} />
        </View>
        <View style={styles.fullView}>
          <SportyButton
            title={'Apply'}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Color.Blur,
  },
  mainView: {
    height: '50%',
    backgroundColor: Color.White,
    flexDirection: 'row',
    padding: 10,
  },
  item: {
    margin: 5,
    borderColor: Color.PinkishPurple,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  selecteditem: {
    margin: 5,
    borderColor: Color.PinkishPurple,
    borderLeftWidth: 4,
    borderBottomWidth: 0.3,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  valuesitem: {
    margin: 5,
    borderColor: Color.PinkishPurple,
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.3,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  filterTypeText: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.PinkishPurple,
  },
  checkBox: {
    width: 25,
    height: 25,
  },
  footerStyle: {
    flexDirection: 'row',
    backgroundColor: Color.White,
  },
  fullView: {
    flex: 1,
    marginBottom: 20,
  },
});

export default DashboardFilter;
