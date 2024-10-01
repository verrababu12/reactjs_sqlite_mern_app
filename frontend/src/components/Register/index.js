import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.css";

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    showSubmitError: false,
  };

  // Username blur handler
  handleUsernameBlur = () => {
    const { username } = this.state;
    if (username.trim() === "") {
      this.setState({ usernameError: "*Required" });
    } else {
      this.setState({ usernameError: "" });
    }
  };

  // Name blur handler
  handleNameBlur = () => {
    const { name } = this.state;
    if (name.trim() === "") {
      this.setState({ nameError: "*Required" });
    } else {
      this.setState({ nameError: "" });
    }
  };

  // Email blur handler
  handleEmailBlur = () => {
    const { email } = this.state;
    if (email.trim() === "") {
      this.setState({ emailError: "*Required" });
    } else {
      this.setState({ emailError: "" });
    }
  };

  // Password blur handler
  handlePasswordBlur = () => {
    const { password } = this.state;
    if (password.trim() === "") {
      this.setState({ passwordError: "*Required" });
    } else {
      this.setState({ passwordError: "" });
    }
  };

  onSubmitSuccess = () => {
    this.props.history.push("/login"); // Navigates to login page
  };

  onSubmitFailure = () => {
    this.setState({ showSubmitError: true });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, name, email, password } = this.state;
    const userDetails = { username, name, email, password };
    const url = "/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      this.onSubmitSuccess();
    } else {
      this.onSubmitFailure();
    }
  };

  renderField = (label, fieldType, fieldName, blurHandler) => (
    <>
      <label className="input-label" htmlFor={fieldName}>
        {label.toUpperCase()}
      </label>
      <input
        type={fieldType}
        id={fieldName}
        className="input-filed"
        value={this.state[fieldName]}
        onChange={(e) => this.setState({ [fieldName]: e.target.value })}
        onBlur={blurHandler}
      />
      {this.state[`${fieldName}Error`] && (
        <p style={{ color: "red" }}>{this.state[`${fieldName}Error`]}</p>
      )}
    </>
  );

  render() {
    const { showSubmitError } = this.state;

    return (
      <div className="login-form-container">
        <form className="login-card" onSubmit={this.submitForm}>
          <h1 className="main-heading">SignUp Form</h1>
          <div className="input-container">
            {this.renderField(
              "Username",
              "text",
              "username",
              this.handleUsernameBlur
            )}
          </div>
          <br />
          <div className="input-container">
            {this.renderField("Name", "text", "name", this.handleNameBlur)}
          </div>
          <br />
          <div className="input-container">
            {this.renderField("Email", "text", "email", this.handleEmailBlur)}
          </div>
          <br />
          <div className="input-container">
            {this.renderField(
              "Password",
              "password",
              "password",
              this.handlePasswordBlur
            )}
          </div>
          <br />
          <button type="submit" className="form-button">
            SIGN UP
          </button>
          {showSubmitError && <p className="error-message">*Bad Request</p>}
          <p className="paragraph">Already have an account?</p>
          <Link to="/login">
            <button type="button" className="sign-in-button">
              SIGN IN
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
