import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { BiTimeFive } from "react-icons/bi";
import { ICON_SIZE } from "../constants";
import { InputType } from "../constants/inputType";
import {
  useSnapshotIntervalMinsQuery,
  useUpdateSettingMutation,
} from "../generated/graphql";
import Button, { HTMLButtonType } from "./Buttons/Button";
import TextField, { TextFieldTypes } from "./forms/TextField";
import HDivider from "./layouts/HDivider";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";

interface Props {}

enum FormNames {
  TIME = "time",
}

interface FormValues {
  [FormNames.TIME]: string;
}

const initialData = { time: "0" };

const IntervalSetting = ({}: Props) => {
  // graphql
  const { data, loading, error } = useSnapshotIntervalMinsQuery();
  const [updateSetting, { loading: updateLoading }] =
    useUpdateSettingMutation();

  // constants
  const { name, value, description, label } = data?.snapshotIntervalMins || {};

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    if (!name) return;
    await updateSetting({
      variables: {
        input: { name, value: data[FormNames.TIME] },
      },
    });
  };

  useEffect(() => {
    if (value) setValue(FormNames.TIME, value); // sometimes, initialValue is set before the value is loaded
  }, [value, setValue]);

  if (loading) return <Loading />;
  if (error) return <Error text="Error retrieving setting" />;
  return (
    <>
      <div className="grid grid-cols-2 my-4">
        <div id="left" className="col-span-1">
          <div className="flex items-center gap-2">
            <BiTimeFive size={ICON_SIZE + 10} />
            <div className="font-bold">{label}:</div>
          </div>
          <div>{description}</div>
        </div>

        <div id="right" className="col-span-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <TextField
                required
                name={FormNames.TIME}
                control={control as unknown as Control}
                containerClass="w-full sm:w-80"
                placeholder="Drying Time"
                type={TextFieldTypes.OUTLINED}
                inputType={InputType.Text}
                extraClass="w-full"
                labelClass="mt-4.5 mb-2"
                error={errors[FormNames.TIME]}
              />
              <Button
                label="Update"
                buttonType={HTMLButtonType.SUBMIT}
                loading={updateLoading}
                disabled={!isDirty}
              />
            </div>
          </form>
        </div>
      </div>
      <HDivider />
    </>
  );
};
export default IntervalSetting;
