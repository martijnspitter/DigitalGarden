import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

import { userState, tagState } from '../store/atoms';
import { addTagToPost } from '../store/selectors';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import axios from '../api/axios';

import Select from 'react-select';

export default function AddTagToPost(props) {
	const user = useRecoilValue(userState);
	const tags = useRecoilValue(tagState);
	const addTag = useSetRecoilState(addTagToPost);

	const idNumber = props.id;
	const [ selectedOption, setSelectedOption ] = useState(null);

	const options = () => {
		var arr = tags.map((tag) => tag);

		return arr.map((obj) => ({
			...obj,
			value: obj.id,
			label: obj.tag
		}));
	};

	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = selectedOption;
		const twoIds = { post_id: idNumber, tag_id: formData[0].id };

		await axios.post(`/posttags/${idNumber}`, formData);
		addTag(twoIds);
		props.onHide();
	};

	return (
		<Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add Tags</Modal.Title>
			</Modal.Header>
			{user.username === null ? (
				<div>You don't have the admin rights to delete a post</div>
			) : (
				<React.Fragment>
					<Modal.Body style={{ fontSize: '1.6rem' }}>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Select Tags</Form.Label>
								<Select onChange={handleChange} options={options()} isMulti className="ownform_control" />
							</Form.Group>
							<Button type="submit">Add</Button>
						</Form>
					</Modal.Body>
				</React.Fragment>
			)}
		</Modal>
	);
}
