import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

type LoadingComponentProps = {
  inverted?: boolean;
  content: string;
};

const LoadingComponent = ({
  inverted = true,
  content = "Loading...",
}: LoadingComponentProps) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
