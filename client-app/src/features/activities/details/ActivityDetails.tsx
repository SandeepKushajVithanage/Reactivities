import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

type ActivityDetailsProps = {};

const ActivityDetails = (props: ActivityDetailsProps) => {
  const { activityStore } = useStore();
  const { selectedActivity, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !selectedActivity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={selectedActivity} />
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar activity={selectedActivity} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
