import React from 'react';

import { postStateEdit } from '../store/selectors';
import { userState } from '../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Form, Container, Button } from 'react-bootstrap';

import axios from '../api/axios';
import history from '../history';
import { useParams } from 'react-router-dom';

export default function EditPost() {
	const user = useRecoilValue(userState);

	const [ allPosts, setAllPosts ] = useRecoilState(postStateEdit);
	const { id } = useParams();
	const idNumber = parseInt(id);
	const selectedPost = allPosts.find((post) => post.id === idNumber);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {};

		formData.forEach((value, property) => (body[property] = value));
		body.progress = parseInt(body.progress, 10);

		const response = await axios.put(`/posts/${id}`, body);

		setAllPosts(response.data);

		history.push(`/home`);
	};

	return (
		<Container style={{ marginTop: '4rem' }}>
			{user.username === null ? (
				<div>You don't have the admin rights to edit a post</div>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" defaultValue={selectedPost.title} id="title" name="title" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Body</Form.Label>
						<Form.Control
							defaultValue={selectedPost.body}
							as="textarea"
							rows="15"
							size="lg"
							type="text"
							id="body"
							name="body"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Progress</Form.Label>
						<Form.Control type="number" defaultValue={selectedPost.progress} id="progress" name="progress" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Container>
	);
}
