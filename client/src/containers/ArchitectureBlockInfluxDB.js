import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Image, Icon, List } from "semantic-ui-react";

class ArchitectureBlockInfluxDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: "unknown",
      port: "",
      status: "checking",
      data: ""
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/influxdb.jpg'
          />
          <Card.Header>InfluxDB</Card.Header>
          <Card.Meta>Status: {this.state.status}</Card.Meta>
          <Card.Description>{this.state.data}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='server' />
            {this.state.host}:{this.state.port}
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default ArchitectureBlockInfluxDB;
