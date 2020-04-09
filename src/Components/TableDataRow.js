import React, { Component } from 'react'

export default class TableDataRow extends Component {

    editClick = () => {       
        
        this.props.editFunClick();
        this.props.changeEditUserStatus()
    }

    deleteButtonClick = (idUser) => {
        this.props.deleteButtonClick(idUser);      
        
    }

    permissionShow = () => {
        if(this.props.permission === 1){
            return 'Admin';
        }
        else if(this.props.permission === 2){
            return 'Moderator';
        }
        else{
            return 'Normal User';
        }
    }

    render() {
        return (
            <tr>
                <td >{this.props.stt+1}</td>
                <td>{this.props.userName}</td>
                <td>{this.props.tel}</td>
                <td>{this.permissionShow()}</td>
                <td>
                    <div className="btn-group">
                        <div className="btn btn-warning sua" onClick={() => this.editClick()}> <i className="fa fa-edit    " /> Sửa </div>
                        <div className="btn btn-danger xoa" onClick={(idUser) => this.deleteButtonClick(this.props.id)}> <i className="fa fa-delete"  /> Xóa </div>
                    </div>
                </td>
            </tr>
        )
    }
}
