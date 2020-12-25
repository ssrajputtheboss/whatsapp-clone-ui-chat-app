import React , {Component} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button,Form} from 'react-bootstrap/'




class App extends Component{

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.state = {
      isLoggedIn:false,
      signupform:false,
      username:'',
      userid:0
    };
  }

  componentDidMount(){
    fetch('/home',{method:'GET'})
    .then(res=>res.json())
    .then((data)=>{
      if(data.status)
        this.logInUser();
    }).catch(err=>console.log('err'));
  }

  handleLoginClick() {
    this.setState({signupform:false});
  }

  handleSignUpClick() {
    this.setState({signupform:true});
  }

  logInUser() {
    this.setState({isLoggedIn: true});
  }

  logOutUser() {
    this.setState({isLoggedIn: false});
  }

  handleRoomChange=(name,id)=>{
    this.setState({username: name,userid:id});
  }

  render(){
    return (this.state.isLoggedIn===true) ?
    (
      <div className="App" >
        <div className="app_body">
          <Sidebar onRoomChange={this.handleRoomChange} onLogOut={()=>{this.logOutUser()}} />
          <Chat roomName={this.state.username} roomId={this.state.userid}/>
        </div>
      </div>
    )
        :this.state.signupform ?
       (
         <Modal.Dialog>
           <Modal.Header closeButton >
             <Modal.Title >SignUp</Modal.Title>
           </Modal.Header>

           <Modal.Body>
             <Form >
             <Form.Group >
               <Form.Label>Name</Form.Label>
               <Form.Control id="signupname" type="name" placeholder="Enter Name" />
             </Form.Group>
               <Form.Group >
                 <Form.Label >Email address</Form.Label>
                 <Form.Control id="signupemail"  type="email" placeholder="Enter email" />
               </Form.Group>

               <Form.Group >
                 <Form.Label>Password</Form.Label>
                 <Form.Control id="signuppassword"  type="password" placeholder="Password" />
               </Form.Group>
               <Button variant="primary" type="submit"
               onClick={(e)=>{
                 var email = document.getElementById('signupemail').value;
                 if(!email.includes('@')||!email.includes('.')){
                   alert('invalid email')
                   return;
                 }
                 if(document.getElementById('signuppassword').value.trim()===''){
                   alert('invalid password')
                   return;
                 }
                 if(document.getElementById('signupname').value.trim()===''){
                   alert('invalid name')
                   return;
                 }
                 fetch('/signup',{method:'POST',
                  body:JSON.stringify({
                    name:document.getElementById('signupname').value,
                    email:document.getElementById('signupemail').value,
                    password:document.getElementById('signuppassword').value
                  }),
                  headers:{
                    'Content-type':'application/json; charset=UTF-8'
                  }
                  })
                 .then(res=>res.json())
                 .then(data=>{
                   if(data.status)
                     this.logInUser()
                     alert('You Are Signed Up!')
                 }).catch(err=>console.log(err))
               }}
               >
                 SignUp
               </Button>
             </Form>
           </Modal.Body>
             <Button variant="secondary"
              onClick={()=>{this.handleLoginClick()}}
             >LogIn</Button>
         </Modal.Dialog>
       ):
       (
         <Modal.Dialog>
           <Modal.Header closeButton >
             <Modal.Title >Login</Modal.Title>
           </Modal.Header>

           <Modal.Body>
             <Form >
               <Form.Group >
                 <Form.Label>Email address</Form.Label>
                 <Form.Control id="loginemail" type="email" placeholder="Enter email" />
               </Form.Group>

               <Form.Group >
                 <Form.Label>Password</Form.Label>
                 <Form.Control id="loginpassword" type="password" placeholder="Password" />
               </Form.Group>
               <Button variant="primary" type="submit"
               onClick={(e)=>{
                  var email = document.getElementById('loginemail').value;
                  if(!email.includes('@')||!email.includes('.')){
                    alert('invalid email')
                    return;
                  }
                  if(document.getElementById('loginpassword').value.trim()===''){
                    alert('invalid password')
                    return;
                  }
                  fetch('/login',{method:'POST',
                  body:JSON.stringify({
                    email:document.getElementById('loginemail').value,
                    password:document.getElementById('loginpassword').value
                  }),
                  headers:{
                    'Content-type':'application/json; charset=UTF-8'
                  }
                  })
                 .then(res=>res.json())
                 .then(data=>{
                   if(data.status){
                     this.logInUser()
                     alert('Logging In')
                   }
                 })
               }}
               >
                 LogIn
               </Button>
             </Form>
           </Modal.Body>
             <Button variant="secondary"
             onClick={()=>{this.handleSignUpClick()}}
             >
             SignUp</Button>
         </Modal.Dialog>
       );
  }
}



export default App;
