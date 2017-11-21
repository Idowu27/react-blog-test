var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class AddPost extends React.Component {
  constructor(props) {
super(props);
this.addPost = this.addPost.bind(this);
this.handleTitleChange = this.handleTitleChange.bind(this);
this.handleSubjectChange = this.handleSubjectChange.bind(this);
this.state = {
  title:'',
  subject:''
};
}

addPost(){
  axios.post('/addPost', {
    title: this.state.title,
    subject: this.state.subject
  })
  .then(function (response) {
    console.log('reponse from add post is ',response);
    hashHistory.push('/')
  })
  .catch(function (error) {
    console.log(error);
  });
}
  handleTitleChange(e){
      this.setState({title:e.target.value})
    }
    handleSubjectChange(e){
      this.setState({subject:e.target.value})
    }
  render() {
       return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
               
                <div className="form-group">
                  <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                  
                <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
      )
    }
}

class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:[]
    };
  }

  

  componentDidMount(){
    var self = this;

    axios.post('/getPost', {
     
    })
    .then(function (response) {
      self.setState({posts:response.data});
      
    })
    .catch(function (error) {
      console.log('error is ',error);
    });

    document.getElementById('homeHyperlink').className = "active";
    document.getElementById('addHyperLink').className = "";
  }
  
  render() {
    return (
      <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Subject</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.posts.map(function(post,index) {
                   return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{post.title}</td>
                            <td>{post.subject}</td>
                            <td>
                              <span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-pencil"></span>
                            </td>
                            <td>
                              <span className="glyphicon glyphicon-remove"></span>
                            </td>
                          </tr>
                }.bind(this))
              }
            </tbody>
</table>
    )
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
      <Route component={ShowPost} path="/"></Route>
      <Route component={AddPost} path="/addPost"></Route>
  </Router>,
document.getElementById('app'));