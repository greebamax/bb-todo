import feather from 'feather-icons';

export default () => options => {
  const {
    hash: {
      name,
    },
  } = options;

  if (typeof name === 'undefined') {
    return '';
  }

  const icon = feather.icons[name];

  return icon ? icon.toSvg() : '';
};
