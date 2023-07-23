import React from "react";

interface Props {
  id: string;
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: any) => void;
}

const InputField = ({
  id,
  name,
  label,
  value,
  type = "text",
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-neutral-900 text-lg font-semibold " htmlFor={name}>
        {label}
      </label>
      <input
        className="border border-neutral-200 rounded-sm p-2 focus:border-primary-600 py-2 h-12"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {/* <h1
    className={
      errorMessage.email ? "text-danger-500 text-right" : "opacity-0"
    }
  >
    {errorMessage.email}
  </h1> */}
    </div>
  );
};

export default InputField;
