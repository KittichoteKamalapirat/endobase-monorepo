// id, brand, model, type, storage time

import { Control, useForm } from "react-hook-form";
import { InputType } from "../../constants/inputType";
import { useUpdateDryingTimeMutation } from "../../generated/graphql";
import Button, { HTMLButtonType } from "../Buttons/Button";
import TextField, { TextFieldTypes } from "../forms/TextField";

interface Props {
  pickEndo: any;
  refetchEndos: any;
}

enum FormNames {
  TIME = "time",
}

interface FormValues {
  [FormNames.TIME]: string;
}

export const endoColumns = ({ pickEndo, refetchEndos }: Props) => {
  const handleUseEndo = async (id: string) => {
    await pickEndo({ variables: { id } });
    await refetchEndos(); // refetch so the link to /wash/null => /wash/session_id
  };
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
