import React, {Component} from 'react';
import {
  Grid, Row, Col, Panel,
  Button, Glyphicon
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rest from 'fetch-on-rest';
var serialize = require ('form-serialize');

class Posts extends Component{

    constructor(){
        super();
        this.state = {
            posts: []
        };
        this.api = new Rest('http://localhost:3004');
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts(){
        var self = this;
        this.api.get('posts').then(
            (res) => {
                self.setState({
                    posts: res
                });
            }
        );
    }

    handleSubmitPost(event){
        event.preventDefault();
        var self = this;
        var input =  serialize(event.target,{hash:true});
        this.api.post('posts',input).then(
            (res)=>{
                self.getPosts();
                document.getElementById("formPost").reset();
            }
        )
    }

    deletePost(id){
        var self = this;
        this.api.del('posts/'+id).then(
            (res)=>{
                self.getPosts();
            }
        )
    }

    renderPost(){
        var self = this;
        var posts = this.state.posts.map((data, index) => 
            <Col key={index} md={12}>
                <Panel header={(<h3>{data.title}</h3>)} bsStyle="primary">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h5><b>Author: {data.author}</b></h5>
                        </div>
                        <div className="pull-right">
                            <Link to={"post/"+data.id} className="btn-sm btn btn-warning" style={{marginRight: "5px"}}><Glyphicon glyph="pencil" /></Link>
                            <button onClick={self.deletePost.bind(self, data.id)} className="btn-sm btn btn-danger"><Glyphicon glyph="trash" /></button> 
                        </div>
                    </div>
                    <div>
                        <hr style={{margin: "0 0 10px 0", padding: 0}}/>
                        <p>{data.content}</p>
                    </div>
                </Panel>
            </Col>
        );
        return (
            <div>
                {posts}
            </div>
        )
    }
  
    render(){
        return (
            <Grid>
                <Row className="show-grid" style={{marginTop: '20px'}}>
                    <Col md={4}>
                        <Panel header={"Form Posts"} bsStyle="primary">
                            <form id="formPost" onSubmit={this.handleSubmitPost.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" className="form-control" id="title" placeholder="Title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profile">Author</label>
                                    <input type="text" name="author" className="form-control" id="profile" placeholder="Author"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content</label>
                                    <textarea name="content" className="form-control" id="content" placeholder="Content"></textarea>
                                </div>
                                <Button type="submit" name="content" className="btn btn-primary btn-block">Submit</Button>
                            </form>
                        </Panel>
                    </Col>
                    <Col md={8}>
                        {this.renderPost()}
                    </Col>
                </Row>
            </Grid>
        );  
    }
}

export default Posts;