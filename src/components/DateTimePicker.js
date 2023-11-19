import React, {useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = ({onSelect, onCancel}) => {
  const [isPickerVisible, setPickerVisibility] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showPicker = () => {
    setPickerVisibility(true);
  };

  const hidePicker = () => {
    setPickerVisibility(false);
    onCancel();
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hidePicker();
    onSelect(date);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Show Date/Time Picker"
        onPress={() => showPicker('date')}
      />
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={'datetime'} // Set the mode to "datetime" for both date and time
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        minimumDate={new Date()}
      />
      {selectedDate && (
        <View>
          <Text>Selected Date and Time: {selectedDate.toString()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

export default DateTimePicker;
