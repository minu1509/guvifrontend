import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Profile } from './profile';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loginSuccessfull: false,
      message: '',
    }
  }


  handleChange = (event) => {
    let field = event.target.name;
    this.setState({ [field]: event.target.value });
  }


  handleSubmit = (e) => {
    // const navigate = useNavigate();
    let { history } = this.props
    console.log("submit")
    fetch(`https://https://guvibackend.netlify.app/api/login/${this.state.username}/${this.state.password}`, {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response)
        setTimeout(() => {
          // navigate("/profile", {
          //   state: response
          // });
          window.location.href = `/profile`
          // window.location.name = this.state.username
          localStorage.setItem('username', this.state.username);

        }, 2000);

        // history.push({
        //   pathname: '/profile',
        //   state: response
        // });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render = () => {
    return (
      <Form onFinish={this.handleSubmit}
        name="normal_login"
        className="login-form">
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input placeholder='username'
            name="username"
            onChange={this.handleChange}
            style={{ width: "370px" }}>
          </Input>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input placeholder='password' type="password"
            name="password"
            onChange={this.handleChange}
            style={{ width: "370px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}
