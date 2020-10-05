import React from 'react';

import { Modal, Button } from 'react-bootstrap';

import { postStateRemove } from '../store/selectors';
import { userState } from '../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import axios from '../api/axios';
import history from '../history';

export default function DeletePost(props) {
	const [ posts, setPosts ] = useRecoilState(postStateRemove);
	const user = useRecoilValue(userState);

	const idNumber = props.id;
	const selectedPost = posts.find((post) => post.id === idNumber);

	const handleSubmit = async () => {
		await axios.delete(`/posts/delete/${idNumber}`);
		setPosts(selectedPost);
		history.push('/home');
	};

	return (
		<Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Delete Post</Modal.Title>
			</Modal.Header>
			{user.username === null ? (
				<div>You don't have the admin rights to delete a post</div>
			) : (
				<React.Fragment>
					<Modal.Body style={{ fontSize: '1.6rem' }}>
						<div>Are you sure you want to delete: </div>
						<em>'{selectedPost.title}'</em>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="danger" onClick={() => handleSubmit()}>
							DELETE
						</Button>
						<Button variant="success" onClick={() => props.onHide()}>
							NO
						</Button>
					</Modal.Footer>
				</React.Fragment>
			)}
		</Modal>
	);
}
