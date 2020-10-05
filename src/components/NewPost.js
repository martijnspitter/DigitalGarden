import React from 'react';

import { Form, Container, Button } from 'react-bootstrap';

import { postStateAdd } from '../store/selectors';
import { userState } from '../store/atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import axios from '../api/axios';
import history from '../history';

export default function NewPost() {
	const setAddPost = useSetRecoilState(postStateAdd);
	const user = useRecoilValue(userState);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {};

		formData.forEach((value, property) => (body[property] = value));
		body.progress = parseInt(body.progress, 10);

		const response = await axios.post('/newpost', body);

		setAddPost(response.data);

		history.push('/home');
	};

	return (
		<Container style={{ marginTop: '4rem' }}>
			{user.username === null ? (
				<div>You don't have the admin rights to make a new post</div>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" placeholder="Title" id="title" name="title" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Body</Form.Label>
						<Form.Control placeholder="Body" as="textarea" rows="15" size="lg" type="text" id="body" name="body" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Progress</Form.Label>
						<Form.Control type="number" placeholder="Progress" id="progress" name="progress" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Container>
	);
}
