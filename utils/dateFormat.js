import moment from "moment";

export const dateFormat = (date, getFormat, changeFormat) => {
  let newDate = moment(date, getFormat).format(changeFormat);
  return newDate;
};
