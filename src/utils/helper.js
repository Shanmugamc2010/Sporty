import moment from 'moment';
export const isBeforeOrEqualDate = (a, b) => {
  let result = false;
  const date1 = moment(a);
  const date2 = moment(b);
  if (date1.isSameOrBefore(date2)) {
    result = true;
  }
  return result;
};

export const isAfterOrEqualDate = (a, b) => {
  let result = false;
  const date1 = moment(a);
  const date2 = moment(b);
  if (date1.isSameOrAfter(date2)) {
    result = true;
  }
  return result;
};

export const isValidString = data => {
  return data !== null && data !== undefined && data !== '' && data !== 'null';
};

export const isValidArray = data => {
  return Array.isArray(data) && data.length > 0;
};
