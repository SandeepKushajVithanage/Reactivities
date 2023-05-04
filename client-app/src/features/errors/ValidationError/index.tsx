import React from "react";
import { Message } from "semantic-ui-react";

type Props = {
  errors: any;
};

const ValidationError = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error: any, index: number) => (
            <Message.Item key={index}>{error}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationError;
