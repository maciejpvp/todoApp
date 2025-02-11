type FormInputProps = {
  placeholder: string;
  required?: boolean;
};

export const FormInput = ({
  placeholder,
  required = false,
}: FormInputProps) => {
  return (
    <input
      placeholder={placeholder}
      name={placeholder}
      required={required}
      className="bg-stone-800 rounded-md p-2 outline-none"
    />
  );
};
