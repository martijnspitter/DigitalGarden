import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

import { removeTagFromPost } from '../store/selectors';
import { userState, tagState, postTagState } from '../store/atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import axios from '../api/axios';

import Select from 'react-select';

export default function RemoveTag(props) {
	const [ selectedOption, setSelectedOption ] = useState(null);

	const tags = useRecoilValue(tagState);
	const postTag = useRecoilValue(postTagState);
	const user = useRecoilValue(userState);
	const setRemoveTag = useSetRecoilState(removeTagFromPost);

	const idNumber = props.id;

	// get the tags belonging to this post using crosstable data
	const tagsIdArr = postTag.filter((tag) => tag.post_id === idNumber);
	const tagsArr = tagsIdArr.map((id) => {
		return tags.find((tag) => tag.id === id.tag_id);
	});

	const options = () => {
		var arr = tagsArr.map((tag) => tag);

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
		const twoIds = { post_id: idNumber, tag_id: formData.id };

		setRemoveTag(twoIds);
		await axios.delete(`/posttags/delete/${idNumber}/${formData.id}`);

		props.onHide();
	};

	return (
		<Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Delete Post</Modal.Title>
			</Modal.Header>
			{user.username === null ? (
				<div>You don't have the admin rights to remove a tag</div>
			) : (
				<React.Fragment>
					<Form onSubmit={handleSubmit} style={{ width: '95%', margin: '2rem auto' }}>
						<Form.Group>
							<Form.Label>Remove Tag</Form.Label>
							<Select onChange={handleChange} options={options()} className="ownform_control" />
						</Form.Group>
						<Button type="submit" variant="danger">
							Remove Tag
						</Button>
					</Form>
				</React.Fragment>
			)}
		</Modal>
	);
}
