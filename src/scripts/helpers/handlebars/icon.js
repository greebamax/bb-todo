import feather from 'feather-icons';

export default () => options => {
  const {
    hash: {
      className,
      name,
    },
  } = options;
  const iconSvg = feather.icons[name].toSvg();

  return `<span class="icon">${iconSvg}</span>`;
};
