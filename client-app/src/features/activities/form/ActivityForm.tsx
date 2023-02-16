import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

type ActivityFormProps = {};

const ActivityForm = ({}: ActivityFormProps) => {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          name="title"
          value={activity.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <Form.TextArea
          name="description"
          value={activity.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <Form.Input
          name="category"
          value={activity.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <Form.Input
          name="date"
          value={activity.date}
          onChange={handleInputChange}
          type="date"
          placeholder="Date"
        />
        <Form.Input
          name="city"
          value={activity.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <Form.Input
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
          placeholder="Vanue"
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
