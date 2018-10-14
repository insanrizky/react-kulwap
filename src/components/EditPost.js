import React, { Component } from 'react';
import {
  Grid, Row, Col, Panel,
  Button
} from 'react-bootstrap';
import Redirect from 'react-router-dom';
import Rest from 'fetch-on-rest';
var serialize = require ('form-serialize');

class EditPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            updated: false,
            post: {}
        }
        this.api = new Rest('http://localhost:3004');

        this.getPostById(this.props.route.match.params.id);

        this.handleTitle = this.handleTitle.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleContent = this.handleContent.bind(this);
    }

    getPostById(id){
        var self = this;
        this.api.get('posts/'+this.props.route.match.params.id).then(
            (res)=>{
                self.setState({
                    post: res
                })
            }
        )
    }

    handleTitle(event){
        this.setState({
            post: {
                title: event.target.value
            }
        })
    }

    handleAuthor(event){
        this.setState({
            post: {
                author: event.target.value
            }
        })
    }

    handleContent(event){
        this.setState({
            post: {
                content: event.target.value
            }
        })
    }

    handleSubmitPost(event){
        event.preventDefault();
        var self = this;
        var input =  serialize(event.target,{hash:true});
        this.api.put('posts/'+this.props.route.match.params.id,input).then(
            (res)=>{
                self.setState({
                    updated: true
                })
            }
        )
    }

  render() {
    if(this.state.updated){
        return (
            <Redirect to={"/"}/>
        );
    }
    return (
        <Grid>
            <Row className="show-grid" style={{marginTop: '20px'}}>
                <Col mdOffset={2} md={8}>
                    <Panel header={"Form Posts"} bsStyle="primary">
                        <form id="formPost" onSubmit={this.handleSubmitPost.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={this.state.post.title} onChange={this.handleTitle} name="title" className="form-control" id="title" placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile">Author</label>
                                <input type="text" value={this.state.post.author} onChange={this.handleAuthor} name="author" className="form-control" id="profile" placeholder="Author"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea value={this.state.post.content} onChange={this.handleContent} name="content" className="form-control" id="content" placeholder="Content"></textarea>
                            </div>
                            <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                        </form>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    );
  }
}

export default EditPost;
