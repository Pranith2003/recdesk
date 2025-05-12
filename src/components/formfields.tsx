const FormFields = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  options = [],
  as = "input",
  type = "text",
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : as === "select" ? (
        <select id={id} name={value} onChange={onChange}>
          {options?.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormFields;
