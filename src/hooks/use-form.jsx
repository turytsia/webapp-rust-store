import { useCallback, useState } from "react";

export default function useForm(onSubmit) {
  const [inputs, setInputs] = useState({});

  const _onSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const onChange = useCallback(
    (name, value) => {
      setInputs((prevState) => {
        const nextState = { ...prevState };
        nextState[name] = value;
        return nextState;
      });
    },
    []
  );

  return [onChange, _onSubmit];
}
