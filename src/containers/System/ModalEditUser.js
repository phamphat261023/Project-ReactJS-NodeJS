import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //set state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleEditModals();
  };

  handleOnchangInput = (event, id) => {
    //good code
    let coppyState = { ...this.state };
    coppyState[id] = event.target.value;
    this.setState({
      ...coppyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddnewUser = () => {
    let isValidInput = this.checkValidateInput();
    if (isValidInput === true) {
      this.props.createNewUser(this.state);
    }
  };

  handleSaveChangesUser = () => {
    let isValidInput = this.checkValidateInput();
    if (isValidInput === true) {
      //call api edit user modals
      this.props.editUser(this.state);
    }
  };

  render() {
    //properties; nested
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modals-user-container"}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Edit users</ModalHeader>
          <ModalBody>
            <div className="modals-user-body">
              <div className="modals-user-content">
                <div className="input-container">
                  <div>
                    <label>Email</label>
                  </div>
                  <input
                    className="modals-input"
                    type="text"
                    name="email"
                    value={this.state.email}
                    disabled
                    onChange={(event) =>
                      this.handleOnchangInput(event, "email")
                    }
                  />
                </div>

                <div className="input-container">
                  <div>
                    <label>Password</label>
                  </div>
                  <input
                    className="modals-input"
                    type="password"
                    name="password"
                    value={this.state.password}
                    disabled
                    onChange={(event) =>
                      this.handleOnchangInput(event, "password")
                    }
                  />
                </div>
              </div>
              <div className="modals-user-content">
                <div className="input-container">
                  <div>
                    <label>FirstName</label>
                  </div>
                  <input
                    className="modals-input"
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={(event) =>
                      this.handleOnchangInput(event, "firstName")
                    }
                  />
                </div>

                <div className="input-container">
                  <div>
                    <label>LastName</label>
                  </div>
                  <input
                    className="modals-input"
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={(event) =>
                      this.handleOnchangInput(event, "lastName")
                    }
                  />
                </div>
              </div>
              <div className="modals-address">
                <div>
                  <label>Address</label>
                </div>
                <input
                  type="text"
                  className="modals-input"
                  name="address"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangInput(event, "address")
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveChangesUser()}
            >
              Save changes
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
