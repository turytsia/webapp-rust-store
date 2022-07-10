import "./imageInput.css";

import { useState, useEffect, useRef } from "react";

import Button from "../Button/Button";

export default function ImageInput(props) {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(props.value);
  const onClick = () => inputRef.current.click();
  const onChange = (e) => {
    let pickedFile = null;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
    }
    props.onChange(props.name, pickedFile);
    setFile(pickedFile);
  };
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <div className="image-input">
      <input
        ref={inputRef}
        onChange={onChange}
        type="file"
        name={props.name}
        accept=".jpg,.png,.jpeg"
        style={{ display: "none" }}
      />
      {preview && (
        <div className="image-input__preview">
          <img src={preview} alt="preview" />
        </div>
      )}
      <div className="image-input__button">
        <Button onClick={onClick}>Pick Image</Button>
      </div>
    </div>
  );
}
