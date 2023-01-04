import { Control, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { InputType } from "../constants/inputType";
import { useEmptyTraysQuery } from "../generated/graphql";
import Button, { ButtonTypes, HTMLButtonType } from "./Buttons/Button";
import LinkButton from "./Buttons/LinkButton";
import { SelectOption } from "./forms/CheckboxField";
import SelectField from "./forms/SelectField";
import TextField, { TextFieldTypes } from "./forms/TextField";
import PageHeading from "./typography/PageHeading";

interface Props {
  onSubmit: any;
  initialData: EndoFormValues;
  isEdit?: boolean;
}

enum FormNames {
  SERIAL_NUM = "serialNum",
  BRAND = "brand",
  TYPE = "type",
  MODEL = "model",
  DRYING_TIME = "dryingTime",
  TRAY = "tray",
}

export interface EndoFormValues {
  [FormNames.SERIAL_NUM]: string;
  [FormNames.BRAND]: string;
  [FormNames.TYPE]: string;
  [FormNames.MODEL]: string;
  [FormNames.DRYING_TIME]: string;
  [FormNames.TRAY]: SelectOption | null;
}

const EndoEditor = ({ onSubmit, initialData, isEdit = false }: Props) => {
  // for back button
  const { state } = useLocation();
  const { prev } = state || {};

  const {
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    handleSubmit,
    register,
    watch,
  } = useForm<EndoFormValues>({
    defaultValues: initialData,
  });

  const {
    data: emptyTraysData,
    loading: emptyTraysLoading,
    error: emptyTraysError,
  } = useEmptyTraysQuery({ fetchPolicy: "network-only" });

  const emptyTraysOptions =
    emptyTraysData?.emptyTrays.map((tray) => ({
      value: tray.id,
      label: tray.position,
    })) || [];

  const trayOptions = [
    ...emptyTraysOptions,
    ...(initialData.tray?.label ? [initialData.tray] : []), // have to add the current one as well
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between my-4">
        <LinkButton
          label="Back"
          href={prev ? `${prev}` : "/"}
          type={ButtonTypes.OUTLINED}
        />
        <Button
          label="Save"
          buttonType={HTMLButtonType.SUBMIT}
          extraClass="ml-2.5 w-24"
          loading={isSubmitting}
          disabled={!isDirty}
        />
      </div>
      <PageHeading
        heading={isEdit ? "Edit an endoscope" : "Add a new endoscope"}
      />
      <div className="w-1/2 flex flex-col gap-4">
        <TextField
          required
          name={FormNames.SERIAL_NUM}
          control={control as unknown as Control}
          label="Serial Number"
          placeholder="123456789"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.SERIAL_NUM]}
        />

        <TextField
          required
          name={FormNames.BRAND}
          control={control as unknown as Control}
          label="Brand"
          placeholder="Olympus, Fuji, etc"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.BRAND]}
        />

        <TextField
          required
          name={FormNames.TYPE}
          control={control as unknown as Control}
          label="Type"
          placeholder="Gastro, Broncho, etc"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.TYPE]}
        />

        <TextField
          required
          name={FormNames.MODEL}
          control={control as unknown as Control}
          label="Model"
          placeholder="ModelX, V1, etc"
          type={TextFieldTypes.OUTLINED}
          error={errors[FormNames.MODEL]}
        />

        <TextField
          required
          name={FormNames.DRYING_TIME}
          control={control as unknown as Control}
          label="Drying Time (minutes)"
          placeholder="30"
          type={TextFieldTypes.OUTLINED}
          inputType={InputType.Number}
          error={errors[FormNames.DRYING_TIME]}
          showNumberArrows={false}
        />

        <SelectField
          name={FormNames.TRAY}
          label="Tray"
          labelClass="mt-4.5 mb-2"
          selectClass="w-full"
          control={control as unknown as Control}
          options={trayOptions}
          isSearchable
          isClearable={false}
          isLoading={emptyTraysLoading}
          required
          noOptionsMessage="There are no empty trays. Please delete an endoscope to empty trays"
        />
      </div>
    </form>
  );
};
export default EndoEditor;
