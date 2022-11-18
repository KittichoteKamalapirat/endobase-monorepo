// id, brand, model, type, storage time

import { Control, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { InputType } from "../../constants/inputType";
import { useUpdateDryingTimeMutation } from "../../generated/graphql";
import { showToast } from "../../redux/slices/toastReducer";
import Button, { HTMLButtonType } from "../Buttons/Button";
import TextField, { TextFieldTypes } from "../forms/TextField";

enum FormNames {
  TIME = "time",
}

interface FormValues {
  [FormNames.TIME]: string;
}

export const endoColumns = () => {
  return [
    {
      Header: "Serial",
      accessor: "serialNum",
    },
    {
      Header: "Location",
      accessor: "position",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Type",
      accessor: "type",
    },

    {
      Header: "Drying Time",
      accessor: "dryingTime",
      Cell: ({ value, row }: { value: string; row: any }) => {
        const dispatch = useDispatch();

        const endoId = row.original.id as string;
        const initialData = { time: value };
        const [updateDryingTime, { loading }] = useUpdateDryingTimeMutation();

        const {
          handleSubmit,
          control,
          formState: { errors, isDirty },
        } = useForm<FormValues>({
          defaultValues: initialData,
        });

        const onSubmit = async (data: FormValues) => {
          console.log("clicked", data);
          await updateDryingTime({
            variables: {
              input: { endoId, mins: parseInt(data[FormNames.TIME]) },
            },
          });
          dispatch(
            showToast({
              message: "Drying time successfully updated!",
              variant: "success",
            })
          );
        };

        return (
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
                loading={loading}
                disabled={!isDirty}
              />
            </div>
          </form>
        );
      },
    },
  ];
};
