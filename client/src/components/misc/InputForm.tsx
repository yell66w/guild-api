import React from "react";
interface Props {
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  icon?: string;
  value?: string;
  setData?: any; //issue fn
  data?: dataObj; //issue obj
}
interface dataObj {
  username: string;
  password: string;
  IGN?: string;
  confirmPassword?: string;
}

const InputForm: React.FC<Props> = ({
  name,
  type,
  id,
  placeholder,
  icon,
  setData,
  data,
  value,
}) => {
  const onInputChange = (e: any) => {
    let value = e.target.value;

    switch (id) {
      case "IGN":
        setData({ ...data, IGN: value });
        break;
      case "username":
        setData({ ...data, username: value });
        break;
      case "password":
        setData({ ...data, password: value });
        break;
      case "confirmPassword":
        setData({ ...data, confirmPassword: value });
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col w-56">
      <label htmlFor={id} className="text-xs font-medium text-gray-800">
        {name}
      </label>
      <input
        className="bg-white border p-2 mb-4 text-xs focus:outline-none rounded my-1"
        type={type}
        name={id}
        id={id}
        onChange={onInputChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
