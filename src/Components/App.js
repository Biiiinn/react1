import React, { Component } from 'react'
import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';

import DataUser from './Data.json';
const uuidv1 = require('uuid/v1');
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hienThiForm:false ,
      data :[],
      searchText:'',
      editUserStatus:false , 
      userEditObject:{}
    }
  }

  componentWillMount() {
    // Kiem tra xem co LocoStorage chua
    if(localStorage.getItem('userData') === null){
      localStorage.getItem('userData',JSON.stringify(DataUser));
    }
    else{
      var temp = JSON.parse(localStorage.getItem('userData'));
      this.setState({
        data:temp
      })
    }
    
    
  }
  

  deldeteUser = (idUser) => {       
    var tempData = this.state.data.filter(item => item.id !== idUser);
    this.setState({
      data:tempData
    });
    localStorage.setItem('userData',JSON.stringify(tempData));
  }

  getUserEditInfoApp = (info) => {
    this.state.data.forEach((value,key) => {
      if(value.id === info.id){
        value.name = info.name;
        value.tel = info.tel;
        value.permission = info.permission;
      }
    })
    localStorage.setItem('userData',JSON.stringify(this.state.data));
  }

  changeEditUserStatus = () => {
    this.setState({
      editUserStatus : !this.state.editUserStatus 
    });
  }

  editUser = (user) => {
    this.setState({
      userEditObject:user
    });
    
  }

  getNewUserData = (name,tel,permission) => {

    var item = {};
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.permission = permission;

    var items = this.state.data;
    items.push(item);
    this.setState({
      data:items 
    });
    localStorage.setItem('userData',JSON.stringify(items));
  }

  getTextSearch = (dl) => {
    this.setState({
      searchText:dl
    });
  }
  
  doiTrangThai = () => {
    this.setState({
      hienThiForm: !this.state.hienThiForm
    });
  }

  //thongBao = () => {alert("Kết nối thành công");}
  render() {
    // localStorage.setItem('userData',JSON.stringify(DataUser));
    var ketqua = [];

    this.state.data.forEach((item) => {
      if(item.name.indexOf(this.state.searchText) !== -1){
        ketqua.push(item);
      }
    })
    //console.log(ketqua);
    
    return (
      <div>
        <Header/>
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search 
              getUserEditInfoApp={(info) => this.getUserEditInfoApp(info)}
              userEditObject={this.state.userEditObject}
              checkConnectProps={(dl) => this.getTextSearch(dl)} ketNoi={() => this.doiTrangThai()} hienThiForm={this.state.hienThiForm} 
              editUserStatus={this.state.editUserStatus}
              changeEditUserStatus = {() => this.changeEditUserStatus()}
              />
              <TableData 
              deleteUser = {(idUser) => this.deldeteUser(idUser)}
              changeEditUserStatus = {() => this.changeEditUserStatus()} editFun={(user) => this.editUser(user)} dataUserProps={ketqua}/>
              <AddUser add={(name,tel,permission) => this.getNewUserData(name,tel,permission)} hienThiForm={this.state.hienThiForm}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
