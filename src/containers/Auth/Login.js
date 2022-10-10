import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
// import * as actions from "../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
      isShowPassword: false,
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  hadleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log(error.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <p className=" login-title col-12 text-center">Login</p>
              <div className=" login-input col-12 form-group">
                <div>
                  <label>Username: </label>
                </div>
                <div className="login-username">
                  <input
                    onChange={(event) => this.handleOnchangeUsername(event)}
                    value={this.state.username}
                    type="email"
                    className="form-control"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              <div className=" login-input col-12 form-group">
                <div>
                  <label>Password: </label>
                </div>
                <div className="login-password">
                  <input
                    onChange={(event) => this.handleOnchangePassword(event)}
                    value={this.state.password}
                    type={
                      this.state.isShowPassword === true ? "text" : "password"
                    }
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    {this.state.isShowPassword === true ? (
                      <i className="far fa-eye"></i>
                    ) : (
                      <i className="fas fa-eye-slash"></i>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className=" login-btn col-12">
                <button onClick={() => this.hadleLogin()} type="button">
                  Login
                </button>
              </div>

              <div className=" forgot-pass col-12 text-center">
                <span>Forgot your password?</span>
              </div>
              <div className=" sign-with col-12 text-center">
                <span>or sign with: </span>
                <div className="icon">
                  <div className="icon-gg">
                    <i className="fab fa-google-plus-g"></i>
                  </div>
                  <div className="icon-tw">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div className="icon-fb">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
