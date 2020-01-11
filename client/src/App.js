import React from "react";
import "./App.css";
import { Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment, Card, Icon} from "semantic-ui-react";
import ArchitectureBlockAirflow from "./containers/ArchitectureBlockAirflow"
import ArchitectureBlockKafka from "./containers/ArchitectureBlockKafka"
import ArchitectureBlockPostgres from "./containers/ArchitectureBlockPostgres"
import ArchitectureBlockInfluxDB from "./containers/ArchitectureBlockInfluxDB"
import ArchitectureBlockVault from "./containers/ArchitectureBlockVault"
import ArchitectureBlockMarketDataService from "./containers/ArchitectureBlockMarketDataService"

function App() {
  return (
    <div>
   <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          2pInvest
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>
    <Container fluid style={{ marginTop: '7em' }}>
      <Header size='huge'>
        <Icon name='sitemap' />
      <Header.Content>System Architecture Block Diagram</Header.Content>
      </Header>
      <Grid columns={1}>
        <Grid.Row>
          <Container fluid id='architecture_block'>
            <Header>Data Pipeline</Header>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Container id='architecture_block'>
                    <Card.Group centered>
                      <ArchitectureBlockAirflow />
                    </Card.Group>
                  </Container>
                </Grid.Column>
                <Grid.Column>
                  <Container id='architecture_block'>
                    <ArchitectureBlockMarketDataService />
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Container fluid id='architecture_block'>
                    <Card.Group centered>
                      <ArchitectureBlockKafka />
                    </Card.Group>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>  
        </Grid.Row>

        <Grid.Row>
          <Container fluid id='architecture_block'>
            <Header>Datastores</Header>
            <Card.Group centered >
              <ArchitectureBlockInfluxDB />
              <ArchitectureBlockPostgres />
              <ArchitectureBlockVault />
            </Card.Group>
          </Container>
        </Grid.Row>
      </Grid>

  </Container>
  </div>
  );
}

export default App;
