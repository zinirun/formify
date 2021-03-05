import moment from 'moment';

export const dateFormater = (date) => {
    return moment(date).format('YYYY년 MM월 DD일 hh:mm');
};
