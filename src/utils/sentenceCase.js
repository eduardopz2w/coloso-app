import _ from 'lodash';

export default function (sentence) {
  if (_.isString(sentence) && sentence.length > 1) {
    return sentence[0].toUpperCase() + sentence.substring(1);
  }

  return sentence;
}
