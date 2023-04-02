import { forwardRef } from "react";
import { ChangeHandler, FieldError, RefCallBack } from "react-hook-form";
import FormFieldLabel from "../FormFieldLabel";

export interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  error?: FieldError;
  options: RadioOption[];
  labelClass?: string;

  // from register
  name?: string;
  onBlur?: ChangeHandler;
  onChange?: ChangeHandler;
}

const RadioField = forwardRef(
  (
    { name, options, onChange, onBlur, label, labelClass = "mb-2" }: Props,
    ref
  ) => {
    return (
      <>
        <FormFieldLabel label={label} extraClass={`${labelClass} `} />

        <div className="flex gap-4 mt-4">
          {options.map((option) => (
            <div key={option.value}>
              <label htmlFor={option.value} className="text-xl border rounded-md px-4 py-2 hover:cursor-pointer" >
                <input
                  ref={ref as RefCallBack}
                  id={option.value}
                  name={name}
                  type="radio"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={option.value}

                />
                <span className="ml-1">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
);

RadioField.displayName = "RadioField";

export default RadioField;
