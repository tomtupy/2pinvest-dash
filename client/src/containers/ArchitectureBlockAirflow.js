import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Image, Icon, List } from "semantic-ui-react";
import config from '../config';

class ArchitectureBlockAirflow extends Component {
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
    axios.get(config.endpoint_url + "/api/service/airflow/status").then(res => {
      console.log(res);
      try {
        let res_obj = JSON.parse(res["data"]);
        console.log(res_obj);
        if (res_obj.StatusCode == 0) {
          let dag_list = JSON.parse(res_obj.Response).items.map((item) =>
            <List.Item>{JSON.stringify(item)}</List.Item>
          );
          this.setState({ status: "Up", data: <List>{dag_list}</List>})
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
            src='/airflow.png'
          />
          <Card.Header>Airflow</Card.Header>
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

export default ArchitectureBlockAirflow;
