const FormTextAreaInput = (
  { value, setValue, error, label, type, onFocus },
  props
) => {
  return (
    <div className="w-full mb-6 md:mb-2" key={label}>
      <label className="block text-black font-medium mb-2 dark:text-slate-300">
        {label}
      </label>
      <textarea
        className={`appearance-none text-[.9em] h-[150px] block w-full bg-white dark:bg-slate-700 placeholder-gray-800::placeholder text-black dark:text-slate-200 border ${
          error && "border-red-500"
        }  rounded py-4 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
        value={value}
        onChange={(text) => setValue(text.target.value)}
        name={label}
        type={type}
        onFocus={onFocus}
        {...props}
      />
      <span className="text-red-500 text-sm mb-2">{error}</span>
    </div>
  );
};

export default FormTextAreaInput;
