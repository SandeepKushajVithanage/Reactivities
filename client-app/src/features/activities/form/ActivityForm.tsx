import { useState, useEffect } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

type ActivityFormProps = {};

const ActivityForm = (props: ActivityFormProps) => {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;

  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter a title for your activity"),
    description: Yup.string().required(
      "Please provide a brief description of your activity"
    ),
    category: Yup.string().required(
      "Please select a category for your activity"
    ),
    date: Yup.string().required("Please select a date for your activity"),
    venue: Yup.string().required("Please enter a venue for your activity"),
    city: Yup.string().required(
      "Please enter a city where your activity will take place"
    ),
  });

  const handleFormSubmit = (activity: ActivityFormValues) => {
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

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        if (activity) setActivity(new ActivityFormValues(activity));
      });
    }
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea name="description" rows={3} placeholder="Description" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryOptions}
            />
            <MyDateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMM d, yyyy h:mm aa"}
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Vanue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
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
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
