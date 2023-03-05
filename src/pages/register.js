import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';


// import { Button, TextInputField, Alert } from 'evergreen-ui';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      registration: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //if lambda function is used no need to bind

  handleChange = (event) => {
    let field = event.target.name;
    this.setState({ [field]: event.target.value });
  };


  handleSubmit = (e) => {
    console.log("submit")
    fetch("https://guvibackend.netlify.app/api/signup", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        "userName": this.state.username,
        "email": this.state.email,
        "password": this.state.password
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render = () => {
    return (
      <Form onFinish={this.handleSubmit} className="ui form">
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input placeholder='email'
            name="email"
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
        <Form.Item name="confirm"
          label="Confirm password"
          type="password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}>
          <Input placeholder='confirm Password'
            name="confirmpassword"
            onChange={this.handleChange}
            style={{ width: "370px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary"
            htmlType="submit"
            style={{ marginLeft: "10px" }}> Register </Button>
        </Form.Item>
        <Form.Item>
        <Button 
            href='/'
            htmlType="cancle"
            style={{ marginLeft: "10px" }}> Cancle </Button>
        </Form.Item>
      </Form>
    
    );
  };

}
