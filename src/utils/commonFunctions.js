import Moment from 'react-moment';
import 'moment/locale/ko';

export const decodeHtml = (txt) => {
  const textarea = document.createElement('textarea');
  textarea.innerHtml = txt;
  console.log(txt);
  console.log(textarea.textContent);
  return textarea.value;
};

export const formatNumber = (number) => {
  const formatter = new Intl.NumberFormat('ko', { notation: 'compact' });
  return formatter.format(number);
};

export const formateDate = (date) => {
  return (
    <Moment fromNow locale="ko">
      {date}
    </Moment>
  );
};
