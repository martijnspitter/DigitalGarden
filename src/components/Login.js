import React, { useState } from 'react';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { useRecoilState } from 'recoil';
import { userState } from '../store/atoms';

import { Card, Container } from 'react-bootstrap';
import avatar from '../images/avatar.jpg';

import axios from '../api/axios';
import history from '../history';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const Login = () => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ message, setMessage ] = useState('');

	const [ user, setUser ] = useRecoilState(userState);

	const onChangeUsername = (e) => {
		setUsername(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		setLoading(true);

		Form.form.validateAll();

		if (CheckButton.checkBtn.context._errors.length === 0) {
			const response = await axios.post('/signin', { username, password });

			setUser({ id: response.data.id, username: response.data.username, token: response.data.token });
			setMessage(user.username);
		} else {
			setLoading(false);
		}
		history.push('/home');
	};

	return (
		<Container style={{ display: 'flex', justifyContent: 'center' }}>
			<Card style={{ width: '30%' }}>
				<Card.Img src={avatar} alt="profile-img" />

				<Form
					onSubmit={handleLogin}
					ref={(c) => {
						Form.form = c;
					}}
				>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<Input
							type="text"
							className="form-control"
							name="username"
							value={username}
							onChange={onChangeUsername}
							validations={[ required ]}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Input
							type="password"
							className="form-control"
							name="password"
							value={password}
							onChange={onChangePassword}
							validations={[ required ]}
						/>
					</div>

					<div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
						<button className="btn btn-primary" disabled={loading}>
							{loading && <span className="spinner-border spinner-border-sm" />}
							<span>Login</span>
						</button>
					</div>

					{message && (
						<div className="form-group">
							<div className="alert alert-danger" role="alert">
								{message}
							</div>
						</div>
					)}
					<CheckButton
						style={{ display: 'none' }}
						ref={(c) => {
							CheckButton.checkBtn = c;
						}}
					/>
				</Form>
			</Card>
		</Container>
	);
};

export default Login;
