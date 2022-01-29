import React from 'react'
import { Header, Segment, Image, Button } from 'semantic-ui-react'

const HeaderBackend = () => (
  <Segment className={"header-backend" }clearing>
    <Header as='h2' floated='left' className="header-text">
    AdminBackOffice
    </Header>
    <Header as='h2' floated='right'>
    <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> AdminName
    <Button className={"logout-button"} negative>Log out</Button>
  </Header>
  </Segment>
)

export default HeaderBackend;