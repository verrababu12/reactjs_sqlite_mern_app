import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.css";

class Login extends Component {
  // Direct state initialization without a constructor
  state = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    showSubmitError: false,
  };

  onSubmitSuccess = () => {
    this.props.history.push("/home");
  };

  onSubmitFailure = () => {
    this.setState({ showSubmitError: true });
  };

  usernameHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      this.setState({ usernameError: "*Required" });
    } else {
      this.setState({ usernameError: "" });
    }
  };

  passwordHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      this.setState({ passwordError: "*Required" });
    } else {
      this.setState({ passwordError: "" });
    }
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      this.onSubmitSuccess();
    } else {
      this.onSubmitFailure();
    }
  };

  renderPasswordField = () => {
    const { password, passwordError } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-filed"
          value={password}
          onChange={this.handleInputChange}
          onBlur={this.passwordHandleBlur}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}{" "}
      </>
    );
  };

  renderUsernameField = () => {
    const { username, usernameError } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-filed"
          value={username}
          onChange={this.handleInputChange}
          onBlur={this.usernameHandleBlur}
        />
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}{" "}
      </>
    );
  };

  render() {
    const { showSubmitError } = this.state;
    return (
      <div className="login-form-container-2">
        <form className="login-card-2" onSubmit={this.submitForm}>
          <h1 className="main-heading-2">Login Form</h1>
          <div className="input-container-2">{this.renderUsernameField()}</div>
          <br />
          <div className="input-container-2">{this.renderPasswordField()}</div>
          <button type="submit" className="button">
            Login
          </button>
          <p>Don't have an account?</p>
          {showSubmitError && <p className="error-message">*Bad Request</p>}
          <Link to="/">
            <button type="button" className="sign-up-button-2">
              SIGN UP
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
