import React, { Component } from 'react';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { Card, Container, Alert, Button } from 'react-bootstrap';
import avatar from '../images/avatar.jpg';

import axios from '../api/axios';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const vusername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 6 and 40 characters.
			</div>
		);
	}
};

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);

		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			username: '',
			email: '',
			password: '',
			successful: false,
			message: '',
			show: true
		};
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleRegister(e) {
		e.preventDefault();

		this.setState({
			message: '',
			successful: false
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			const username = this.state.username;
			const password = this.state.password;
			axios.post('/signup', { username, password }).then(
				(response) => {
					this.setState({
						message: response.data.message,
						successful: true
					});
				},
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) || error.message || error.toString();

					this.setState({
						successful: false,
						message: resMessage
					});
				}
			);
		}
	}

	render() {
		return (
			<Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Alert variant="danger" show={this.state.show}>
					<Alert.Heading>WARNING!</Alert.Heading>
					<p>
						This is a proof-of-concept application. It does <strong>NOT</strong> have a <strong>SECURE</strong>{' '}
						connection. Use an <strong>UNIQUE</strong> password!
					</p>
					<div className="d-flex justify-content-end">
						<Button onClick={() => this.setState({ show: false })} variant="outline-danger">
							I UNDERSTAND
						</Button>
					</div>
				</Alert>

				<Card style={{ width: '30%' }}>
					<Card.Img src={avatar} alt="profile-img" />
					<Form
						onSubmit={this.handleRegister}
						ref={(c) => {
							this.form = c;
						}}
					>
						{!this.state.successful && (
							<div>
								<div className="form-group">
									<label htmlFor="username">Username</label>
									<Input
										type="text"
										className="form-control"
										name="username"
										value={this.state.username}
										onChange={this.onChangeUsername}
										validations={[ required, vusername ]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password</label>
									<Input
										type="password"
										className="form-control"
										name="password"
										value={this.state.password}
										onChange={this.onChangePassword}
										validations={[ required, vpassword ]}
									/>
								</div>

								<div className="form-group">
									<button className="btn btn-primary btn-block">Sign Up</button>
								</div>
							</div>
						)}

						{this.state.message && (
							<div className="form-group">
								<div className={this.state.successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
									{this.state.message}
								</div>
							</div>
						)}
						<CheckButton
							style={{ display: 'none' }}
							ref={(c) => {
								this.checkBtn = c;
							}}
						/>
					</Form>
				</Card>
			</Container>
		);
	}
}
