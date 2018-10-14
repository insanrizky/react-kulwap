import React, {Component} from 'react';
import {
  Grid, Row, Col, Panel
} from 'react-bootstrap';

class Profiles extends Component{

    titlePost = (
        <h3>Profiles</h3>
    );
  
    render(){
        return (
            <Grid>
                <Row className="show-grid" style={{marginTop: '20px'}}>
                    <Col mdOffset={2} md={8}>
                    <Panel header={this.titlePost} bsStyle="primary">
                        Basic panel example
                    </Panel>
                    </Col>
                </Row>
            </Grid>
        );  
    }
}

export default Profiles;