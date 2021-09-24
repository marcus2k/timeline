const inputStyle = () => ({
  display: "none",
});

// This is a hidden file input HTML element
const HiddenFileInput = (props) => {
  const { handleChange } = props;

  const resetHandler = (e) => {
    e.target.value = null;
  };

  return (
    <input
      style={inputStyle()}
      type="file"
      accept="image/jpeg, image/jpg, image/png, image/heic"
      id="image-upload"
      onChange={handleChange}
      required
      onClick={resetHandler}
      multiple={false}
    />
  );
};

export default HiddenFileInput;
