import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

type Props = {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
};

const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label htmlFor={props.name}>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
};

export default MySelectInput;
