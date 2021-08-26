import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";

function TemplateCard({ day: { time, date, id, dayTrainings, createdAt } }) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{date}</Card.Header>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}
          {moment(time).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {dayTrainings &&
            dayTrainings.map((dt) => (
              <>
                <p>{dt.time}</p>
                <p>{dt.training}</p>
                <p>{dt.trainer}</p>
              </>
            ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
}
export default TemplateCard;
