import React,{Component} from 'react';
import './SidebarChat.css';
import {Avatar} from '@material-ui/core';

class SidebarChat extends Component{
  render(){
    return (
      <div className="sidebar_chat" onClick={(e)=>{this.props.onSelect(this.props.roomName,this.props.roomId)}}>
        <Avatar
        src={this.props.profileSrc}/>
        <div className="chat_info">
          <font >{this.props.roomName}</font><br/>
          <font>{this.props.lastMessage}</font>
        </div>
      </div>
    );
  }
}



export default SidebarChat;
