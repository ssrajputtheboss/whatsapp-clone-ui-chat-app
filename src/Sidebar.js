import React,{Component} from 'react';
import './Sidebar.css';
import {Avatar,IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

class Sidebar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chatlist:[],
      searchlist:[]
    };
  }

  componentDidMount(){
    fetch('/searchlist',{method:'POST'}).then(res=>res.json()).then((data)=>{
        this.setState({searchlist:data.searchlist})
    });
    fetch('/chatlist',{method:'POST'}).then(res=>res.json()).then((data)=>{
        this.setState({chatlist:data.chatlist})
    });
  }
  handleLogOut =()=>{
    this.props.onLogOut()
  }

  handleChange = (name,id)=>{
    this.props.onRoomChange(name,id)
  }
  render(){
    const chatlist = this.state.chatlist.map((chat)=>{
      return(
      <SidebarChat
      onSelect={this.handleChange}
      roomId={chat.uid}
      roomName={chat.name}
      lastMessage=""
      profileSrc="https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg"
      />)
    });
    const searchlist = (
      <datalist id="userlist">
      {this.state.searchlist.map((user)=>{
      return(<option value={user.user_id}>{user.name}</option>)
    })}
      </datalist>
    )
    return (
      <div className="sidebar">
        <div className="sidebar_header">
          <IconButton onClick={(e)=>{this.handleLogOut()}}>
            <Avatar
            src="https://www.wallpapertip.com/wmimgs/51-517054_whatsapp-background-images-hd.jpg"
            />
          </IconButton>
          <div className="header_right">
            <IconButton >
              <DonutLargeIcon/>
            </IconButton>
            <IconButton >
              <ChatIcon/>
            </IconButton>
            <IconButton >
              <MoreVertIcon/>
            </IconButton>
          </div>
        </div>
        <div className="sidebar_search">
          <IconButton className="" onClick={(e)=>{
            const uid = document.getElementById("searchuser").value;
            for(var user of this.state.searchlist)
              if(user.user_id==uid){
                this.handleChange(user.name,uid)
                break;
              }
          }}>
            <SearchOutlinedIcon/>
          </IconButton>
          <div className="search_container">
            <input id="searchuser" placeholder="search" list="userlist" type="text"/>
            {searchlist}
          </div>
        </div>
        <div className="sidebar_chats">
          {chatlist}
        </div>
      </div>
    );
  }
}


export default Sidebar;
