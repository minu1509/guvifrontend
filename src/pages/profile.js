import React, { Component } from 'react';
import { Button, Form, Grid, Input } from 'antd';

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      gender: '',
      age: '',
      telephone: '',
      dob: '',
    }
  }


  componentDidMount() {
    const items = localStorage.getItem('username');
    if (items) {
     this.setState({userName: items})
    }
    fetch(`https://guvibackend.netlify.app/api/read-profile/${localStorage.getItem('username')}`, {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({name: response.userName})
        this.setState({email: response.email})
        this.setState({gender: response.gender})
        this.setState({age: response.age})
        this.setState({telephone: response.phoneNumber})
        this.setState({dob: response.dob})
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    let field = event.target.name;
    this.setState({ [field]: event.target.value });
  }


  handleSubmit = (e) => {
    console.log("submit")
    fetch(`https://signup-backend.netlify.app//api/edit-profile/${this.state.name}`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        "userName": this.state.username,
        "email": this.state.email,
        "gender": this.state.gender,
        "age": this.state.age,
        "phoneNumber": this.state.telephone,
        "dob": this.state.dob
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
        <Form.Item>
          <Input placeholder='username'
            name="username"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Input placeholder='email'
            name="email"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Input placeholder='gender'
            name="gender"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Input placeholder='age'
            name="age"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Input placeholder='dob'
            name="dob"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Input placeholder='phone'
            name="phone"
            onChange={this.handleChange}
            style={{ width: "370px", marginLeft: "50px" }}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary"
            htmlType="submit"
            style={{ marginLeft: "50px" }}> Save </Button>
        </Form.Item>
        <Form.Item>
        <Button 
            href='/'
            htmlType="cancle"
            style={{ marginLeft: "50px" }}> Cancle </Button>
        </Form.Item>
      </Form>
    );
  }

}
