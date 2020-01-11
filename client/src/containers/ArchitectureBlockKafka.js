import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Image, Icon, List } from "semantic-ui-react";
import config from '../config';

class ArchitectureBlockKafka extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: "unknown",
      port: "",
      status: "checking",
      data: "",
      connectors: []
    };
  }

  componentDidMount() {
    axios.get(config.endpoint_url + "/api/service/kafka/status").then(res => {
      console.log(res);
      try {
        let res_obj = JSON.parse(res["data"]);
        console.log(res_obj);
        if (res_obj.StatusCode == 0) {
          let kafka_status_obj = JSON.parse(res_obj.Response)
          console.log(kafka_status_obj);
          let topics_list = kafka_status_obj.topics.map((item) =>
            <List.Item>{JSON.stringify(item)}</List.Item>
          );
          let connector_list = kafka_status_obj.connectors.map((item) =>
            <Card>
              <Card.Content>
                <Card.Header>Connector {item.Name}</Card.Header>
                <Card.Meta>Status: {item.Connector.State}</Card.Meta>
                <Card.Description>{item.Connector.Worker_Id}</Card.Description>
              </Card.Content>
            </Card>
          );

          this.setState({ status: "Up", data: <List>{topics_list}</List>, connectors: connector_list})
        } else {
          this.setState({ status: "Down", data: res_obj.Response})
        }
        this.setState({ host: res_obj.Host,
                        port: res_obj.Port})
      } catch (err) {
        this.setState({ status: "Status Check Failed",
                        data: err.message})
      }
    })
  }

  render() {
    return (
      <Card fluid >
        <Card.Content>
          <Image
                floated='right'
                size='mini'
                src='/kafka.svg'
              />
          <Card.Header>Kafka</Card.Header>
          <Card.Meta>Status: {this.state.status}</Card.Meta>
          <Card.Description>{this.state.data}</Card.Description>
        </Card.Content>
        <Card.Content extra >
          <Card.Group centered>
            {this.state.connectors}
          </Card.Group>
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

export default ArchitectureBlockKafka;
