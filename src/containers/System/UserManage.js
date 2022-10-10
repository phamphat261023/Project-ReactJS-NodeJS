import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
import Modals from "./Modals";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      isOpenModals: false,
      isOpenEdieUserModals: false,
      userEdit: {},
    };
  }

  /*
        Life cycle
        - Run component: 
        1. Run constructor -> init state
        2. ComponentDidMount: Gans gias trij cho bieens state
        3. Render
    **/
  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let respone = await getAllUser("ALL");
    if (respone && respone.errCode === 0) {
      this.setState({
        allUsers: respone.users,
      });
    }
  };

  handleOnClickAddnew = () => {
    this.setState({
      isOpenModals: true,
    });
  };

  toggleModalsUser = () => {
    this.setState({
      isOpenModals: !this.state.isOpenModals,
    });
  };

  createNewUser = async (data) => {
    try {
      let respone = await createNewUserService(data);
      if (respone && respone.createUser.errCode !== 0) {
        alert(respone.createUser.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModals: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let respone = await deleteUserService(user.id);
      if (respone && respone.userDelete.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(respone.userDelete.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEdieUserModals: true,
      userEdit: user,
    });
  };

  toggleEditModals = () => {
    this.setState({
      isOpenEdieUserModals: !this.state.isOpenEdieUserModals,
    });
  };

  editUserInfo = async (user) => {
    try {
      let respone = await updateUserService(user);
      if (respone && respone.dataEdit.errCode === 0) {
        await this.getAllUserFromReact();
        this.setState({
          isOpenEdieUserModals: false,
        });
      } else {
        alert(respone.dataEdit.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let allUsers = this.state.allUsers;
    return (
      <div className="user-container">
        <Modals
          isOpen={this.state.isOpenModals}
          toggleModals={this.toggleModalsUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEdieUserModals && (
          <ModalEditUser
            isOpen={this.state.isOpenEdieUserModals}
            toggleEditModals={this.toggleEditModals}
            currentUser={this.state.userEdit}
            editUser={this.editUserInfo}
          />
        )}
        <div className="title text-center">Manage users with Pham Phat</div>
        <div className="text-center">
          <button
            onClick={() => this.handleOnClickAddnew()}
            className="btn-add-new"
          >
            + Add new users
          </button>
        </div>
        <div className="user-table">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

            {allUsers &&
              allUsers.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td> {item.firstName} </td>
                      <td> {item.lastName} </td>
                      <td> {item.address} </td>
                      <td>
                        <button
                          type="submit"
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          type="submit"
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
