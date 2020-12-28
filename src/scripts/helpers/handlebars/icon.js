import feather from "feather-icons";

export default () => (name) => {
  if (typeof name === "undefined") {
    return "";
  }

  const icon = feather.icons[name];

  return icon ? icon.toSvg() : "";
};
