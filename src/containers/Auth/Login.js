import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
// import * as actions from "../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  hadleLogin = (event) => {
    alert("Sign in success!");
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
                      <i class="far fa-eye"></i>
                    ) : (
                      <i class="fas fa-eye-slash"></i>
                    )}
                  </span>
                </div>
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
                    <i class="fab fa-google-plus-g"></i>
                  </div>
                  <div className="icon-tw">
                    <i class="fab fa-twitter"></i>
                  </div>
                  <div className="icon-fb">
                    <i class="fab fa-facebook-f"></i>
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
