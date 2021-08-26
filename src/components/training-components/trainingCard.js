import React from "react";
import {  Card, Image, List } from "semantic-ui-react";
import moment from "moment";

import {
  FETCH_TRAINER_QUERY,
} from "../../utils/graphql";

import { useQuery, useMutation, gql } from "@apollo/client";

function TrainingCard({
    training: { trainingName, createdAt, id,  trainingDescription,
        trainer},
  }) {

    const trainerId = trainer;

    const {loading, data: { getTrainer } = {} } = useQuery(FETCH_TRAINER_QUERY, {
      variables: {
        trainerId,
      },
    });

    let connectedTrainer;
    if(!getTrainer){
      connectedTrainer = <p>No trainer data...</p>;
    } else {
     connectedTrainer = getTrainer.name;
    }

    return (
      <Card fluid >
        <Card.Content>
          <Image
            floated="right"
            size="medium"
            src="https://lh3.googleusercontent.com/NS29BIF6GO4emJ7OA8DwA-v1D9aL_YJey83dApo9QfANPRz6KF7UUJHF_Irkib7ldidm5abvdanrw-M2SPwg4v3o7tQrQevYtckh9_WMQoyWTp6hsJqQZOmhQ_zYcay7d15paKHn2-VGxuIZ-XAHmxx0VnrBguF8bdBGprcx8vSoYg83O8XKikI3DLcByetqlNEFSu5JtFaqt7-0IINaKvaQQSZQ37GWazDUg5YL_0eyb1kkE4Iheu18Ok-QygadzUDGL16jhiui-kMU1Figy4Abh-Q2SwDLeN-UyibPaAUaI83QoDUxL1jkaJgpK4p5Oa6HB35B-aq6gry5b_T2VEmrKCDVd7NltteyHt_8ZKvJ8h6QMFc6ad3qCDinlHC8UAgIWzifkiZokxUACqvtGFtvOS5YWaEqRf2acZalIoeyvPeXxcEn3E1XVERz_eeck_Q-3NikadiofNcZq-0FHCv7I2jPOm4fbzftIULHWer-sjh-3YuxjTSTra3VssIplvTZMKLdN76gZWQ5jEJxOiNM3Uyx6viP_ReDVhOHkGbpBVEcgABL7yTVVBAYpNxs7KXB3xdqmZk3HZ3aZImXq4fA0fqJgCa6vJ9gXPGGYz7_ERQiejDVRbYzaaTFhvP9-ltzJK-FdUIs03i5RuvWj_H62gZ3rV-lL2dqk2vrEKmhRUlVwinO5BFfvRKBysu-PCALWU4CzTN7qwePFiy7yQ=w684-h912-no?authuser=1"
          />
          <Card.Header>{trainingName}</Card.Header>
          <Card.Meta>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{trainingDescription}</Card.Description>
        </Card.Content>
        <Card.Content extra>
        <List>
          <List.Item>
            <List.Icon name="user" />
            <List.Content> Trainer: {connectedTrainer}</List.Content>
          </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
  export default TrainingCard;
  