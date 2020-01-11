import React, { Component } from "react";
import axios from "axios";
import { Container, Card, Header, Image, Icon, List } from "semantic-ui-react";

class ArchitectureBlockMarketDataService extends Component {
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
      <Container>
        <Card.Group centered>
          <Card fluid >
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='/influxdb.jpg'
              />
              <Card.Header>Market Data Service</Card.Header>
              <Card.Meta>Status: {this.state.status}</Card.Meta>
              <Card.Description>{this.state.data}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        </Card.Group>
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='/sqs.png'
              />
              <Card.Header>SQS</Card.Header>
              <Card.Meta>Status: {this.state.status}</Card.Meta>
              <Card.Description>Message Count: {this.state.data}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        </Card.Group>
        <Card.Group centered itemsPerRow={3}>
          <Card>
            <Card.Content>
              <Card.Header>Market Data Worker</Card.Header>
              <Card.Meta>Status: {this.state.status}</Card.Meta>
              <Card.Description>{this.state.data}</Card.Description>
            </Card.Content>
            <Card.Content extra>IP</Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>Market Data Worker</Card.Header>
              <Card.Meta>Status: {this.state.status}</Card.Meta>
              <Card.Description>{this.state.data}</Card.Description>
            </Card.Content>
            <Card.Content extra>IP</Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>Market Data Worker</Card.Header>
              <Card.Meta>Status: {this.state.status}</Card.Meta>
              <Card.Description>{this.state.data}</Card.Description>
            </Card.Content>
            <Card.Content extra>IP</Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

export default ArchitectureBlockMarketDataService;
