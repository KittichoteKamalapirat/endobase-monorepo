import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { BiTimeFive } from "react-icons/bi";
import { TbBulb, TbTemperature } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { useDispatch } from "react-redux";
import { ICON_SIZE } from "../../constants";
import { InputType } from "../../constants/inputType";
import { Setting, useUpdateSettingMutation } from "../../generated/graphql";
import { showToast } from "../../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "../Buttons/Button";
import TextField, { TextFieldTypes } from "../forms/TextField";
import HDivider from "../layouts/HDivider";

import { FaRegHospital } from "react-icons/fa";
interface Props {
  setting: Setting;
  defaultValues: FormValues;
}

enum FormNames {
  VALUE = "value",
}

interface FormValues {
  [FormNames.VALUE]: string;
}

const UpdateSetting = ({ setting, defaultValues }: Props) => {
  // graphql
  const [updateSetting, { loading: updateLoading }] =
    useUpdateSettingMutation();

  // constants
  const { name, value, description, label } = setting;

  // redux
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    if (!name) return;
    try {
      await updateSetting({
        variables: {
          input: { name, value: data[FormNames.VALUE] },
        },
      });
      dispatch(
        showToast({
          message: `Setting for ${name} successfully update`,
          variant: "success",
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const icon = (() => {
    switch (setting.name) {
      case "containerSnapshotIntervalMin":
        return <BiTimeFive size={ICON_SIZE + 10} />;
      case "humidityThreshold":
        return <WiHumidity size={ICON_SIZE + 10} />;
      case "temperatureThreshold":
        return <TbTemperature size={ICON_SIZE + 10} />;
      case "hospitalName":
        return <FaRegHospital size={ICON_SIZE + 4} />;
      case "trayLocationBlinkingSec":
        return <TbBulb size={ICON_SIZE + 10} />;
      default:
        return null;
    }
  })();

  const inputType = name === "hospitalName" ? InputType.Text : InputType.Number;

  useEffect(() => {
    if (value) setValue(FormNames.VALUE, value); // sometimes, initialValue is set before the value is loaded
  }, [value, setValue]);

  return (
    <>
      <div className="grid grid-cols-2 my-4">
        <div id="left" className="col-span-1">
          <div className="flex items-center gap-2">
            {icon}
            <div className="font-bold">{label}:</div>
          </div>
          <div>{description}</div>
        </div>

        <div id="right" className="col-span-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <TextField
                required
                name={FormNames.VALUE}
                control={control as unknown as Control}
                containerClass="w-full sm:w-80"
                placeholder={setting.label}
                type={TextFieldTypes.OUTLINED}
                inputType={inputType}
                extraClass="w-full"
                labelClass="mt-4.5 mb-2"
                error={errors[FormNames.VALUE]}
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
export default UpdateSetting;
