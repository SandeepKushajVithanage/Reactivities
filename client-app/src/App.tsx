import "./App.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import List from "semantic-ui-react/dist/commonjs/elements/List/List";

type Props = {};

const App = (props: Props) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
