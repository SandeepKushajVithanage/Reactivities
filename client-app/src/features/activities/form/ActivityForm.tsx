import { ChangeEvent, useState, useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

type ActivityFormProps = {};

const ActivityForm = (props: ActivityFormProps) => {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  const handleSubmit = () => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        if (activity) setActivity(activity);
      });
    }
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

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
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
