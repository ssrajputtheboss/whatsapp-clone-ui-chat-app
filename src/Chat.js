import React , {Component} from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import RefreshIcon from '@material-ui/icons/Refresh';

class Chat extends Component{
  constructor(props) {
    super(props);
    this.updateChat=this.updateChat.bind(this)
    this.handleTempChange=this.handleTempChange.bind(this)
    this.state = {
      tempid:0,
      my_id:0,
      my_name:'',
      chats:[]
    };
  }
  componentDidMount(){

      fetch('/userdata',{method:'POST'}).then(res=>res.json()).then((data)=>{
        this.setState({my_id:data.user_id,my_name:data.name});
    })

  }

  handleTempChange(tid){
    this.setState({tempid:tid})
  }

  updateChat(){
    if(this.state.tempid == this.props.roomId)
      return;
    fetch('/chats',{method:'POST',
    body:JSON.stringify({to_id:this.props.roomId}),
    headers:{
      'Content-type':'application/json; charset=UTF-8'
    }
  }).then(res=>res.json()).then((data)=>{
        this.setState({chats:data.chats,tempid:this.props.roomId})
    })
  }

  render(){
    this.updateChat();
    const chats = this.state.chats.map((chat)=>{
      return(<p className={chat.to_id===this.state.my_id?"chat_message":"chat_message chat_reciever_message"} >
        <span className="chat_name">{chat.to_id===this.state.my_id?this.props.roomName:this.state.my_name}</span>
        {chat.msg}
        <span className="chat_timestamp">{chat.msgtime}</span>
      </p>)
    })
    return this.props.roomName==='' ?(null):(
      <div className="chat">
        <div className="chat_header">
          <Avatar/>
          <div className="chat_header_info" >
            <font className="room_name">{this.props.roomName}</font><br/>
            <font className="last_seen"></font>
          </div>
          <div className="chat_header_right">
          <IconButton className="">
            <SearchOutlinedIcon/>
          </IconButton>
          <IconButton className="">
            <MoreVertIcon/>
          </IconButton>
          </div>
        </div>
        <div className="chat_body">
          {chats}
        </div>
        <div className="chat_foot">
          <div>
            <IconButton
            onClick={(e)=>{
              this.handleTempChange(0);
              this.updateChat();
            }}>
              <RefreshIcon/>
            </IconButton>
            <IconButton >
              <AttachFileIcon/>
            </IconButton>
          </div>
          <input className="chat_message_send" id="message_input"
            placeholder="Type Message Here"
            type="text"
            onChange={(e)=>{if(e.target.value===''){
              document.getElementById('mic_icon').style.display = "block";
              document.getElementById('send_icon').style.display = "none";
            }else{
              document.getElementById('mic_icon').style.display = "none";
              document.getElementById('send_icon').style.display = "block";
            }
          }}
            />
          <IconButton  id="mic_icon">
            <MicIcon/>
          </IconButton>
          <IconButton id="send_icon"
          onClick={(e)=>{
            fetch('/sendmsg',{
              method:'POST',
              body:JSON.stringify({
                to_id:this.props.roomId,
                to_name:this.props.roomName,
                my_name:this.state.my_name,
                msg:document.getElementById("message_input").value
              }),
              headers:{
                'Content-type':'application/json; charset=UTF-8'
              }
          }).then(res=>res.json()).then((data)=>{
              if(data.msg_status){
                document.getElementById("message_input").value=""
                this.handleTempChange(0);
                this.updateChat();
              }
            })
          }}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Chat;
