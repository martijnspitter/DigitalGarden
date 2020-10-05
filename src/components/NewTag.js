import React from 'react';

import { Form, Container, Button } from 'react-bootstrap';

import { userState } from '../store/atoms';
import { tagStateAdd } from '../store/selectors';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import axios from '../api/axios';
import history from '../history';

export default function NewTag() {
	const user = useRecoilValue(userState);
	const setAddTag = useSetRecoilState(tagStateAdd);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {};

		formData.forEach((value, property) => (body[property] = value));

		console.log(body);

		const response = await axios.post('/newtag', body);

		console.log(response);

		setAddTag(response.data);

		history.push('/home');
	};

	return (
		<Container style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
			{user.username === null ? (
				<div>You don't have the admin rights to make a new post</div>
			) : (
				<Form onSubmit={handleSubmit} style={{ width: '50%' }}>
					<Form.Group>
						<Form.Label>New Tag</Form.Label>
						<Form.Control type="text" placeholder="Tag" id="tag" name="tag" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Container>
	);
}
