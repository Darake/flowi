import { useState } from 'react';

export const useField = (type, placeholder = 'test') => {
  const [value, setValue] = useState(placeholder);

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [
    {
      type,
      value,
      onChange
    },
    reset
  ];
};

export default { useField };
