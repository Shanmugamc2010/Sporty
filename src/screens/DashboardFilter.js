import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {apiCall} from '../apimanager/ApiManager';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {GAME_TYPE, GENDER} from '../utils/themes/constant';

const FIELD_TYPE = {
  STATE: 'state',
  GAME: 'game',
  GENDER: 'gender',
  CATEGORY: 'category',
};

const DashboardFilter = props => {
  const [selectedType, setSelectedType] = useState(FIELD_TYPE.STATE);
  const [checkedItems, setCheckedItems] = useState({
    state: [],
    gender: [],
    game: [],
    category: [],
  });
  const stateDataSelector = useSelector(state => state.stateData);
  const filterTypes = [FIELD_TYPE.STATE, FIELD_TYPE.GAME, FIELD_TYPE.GENDER];
  useEffect(() => {
    // Access myFunction from the navigation options
    const myFunction = props.navigation.getState();
    console.log(myFunction);

    // Now you can use myFunction in this component
    // if (myFunction) {
    //   console.log(myFunction);
    // }
  }, []);
  const filterValues = () => {
    let data = [];
    if (selectedType === FIELD_TYPE.STATE) {
      data = stateDataSelector;
    } else if (selectedType === FIELD_TYPE.GAME) {
      data = Object.values(GAME_TYPE);
    } else if (selectedType === FIELD_TYPE.GENDER) {
      data = Object.values(GENDER);
    }
    return data;
  };
  const onClickRenderItem = type => {
    setSelectedType(type);
  };
  console.log(checkedItems);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onClickRenderItem(item)}
        style={item === selectedType ? styles.selecteditem : styles.item}>
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
  const onClickRenderValueItem = item => {
    if (checkedItems[selectedType].includes(item)) {
      setCheckedItems(prevItems => {
        return {
          ...prevItems,
          [selectedType]: prevItems[selectedType].filter(i => i !== item),
        };
      });
    } else {
      setCheckedItems(prevItems => {
        return {
          ...prevItems,
          [selectedType]: [...prevItems[selectedType], item],
        };
      });
    }
  };
  const renderFilterValuesItem = ({item}) => {
    const isChecked = checkedItems[selectedType].includes(item);
    return (
      <TouchableOpacity
        onPress={() => onClickRenderValueItem(item)}
        style={styles.valuesitem}>
        <Image
          source={
            isChecked
              ? require('./../assets/images/checked.png')
              : require('./../assets/images/unchecked.png')
          }
          style={styles.checkBox}
        />
        <Text style={styles.filterTypeText}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const clearFilter = () => {
    setCheckedItems({
      state: [],
      gender: [],
      game: [],
      category: [],
    });
  };
  const onApplyPress = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <FlatList
          data={filterTypes}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={filterValues()}
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
          <SportyButton title={'Reset'} onPress={clearFilter} />
        </View>
        <View style={styles.fullView}>
          <SportyButton title={'Apply'} onPress={onApplyPress} />
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
