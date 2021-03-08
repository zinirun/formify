import moment from 'moment';

export const dateFormater = (date) => {
    return moment(date).format('YYYY-MM-DD hh:mm');
};