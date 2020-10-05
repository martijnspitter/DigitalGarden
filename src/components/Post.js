import React, { useState } from 'react';

import DeletePost from './DeletePost';
import ProgressBar from './ProgressBar';
import AddTagToPost from './AddTagToPost';
import RemoveTag from './RemoveTag';

import { userState, tagState, postTagState, postState } from '../store/atoms';
import { useRecoilValue } from 'recoil';

import { useParams } from 'react-router-dom';
import history from '../history';

import { Container, Button, ListGroup } from 'react-bootstrap';

export default function Post() {
	const [ deleteState, setDeleteState ] = useState(false);
	const [ addTagState, setAddTagState ] = useState(false);
	const [ removeTagState, setRemoveTagState ] = useState(false);

	const allPosts = useRecoilValue(postState);
	const user = useRecoilValue(userState);
	const tags = useRecoilValue(tagState);
	const postTag = useRecoilValue(postTagState);

	// get id from params and convert to integer
	const { id } = useParams();
	const idNumber = parseInt(id);

	// find the post we want to display based on idNumber
	const post = allPosts.find((post) => post.id === idNumber);

	// get the tags belonging to this post using crosstable data
	const tagsIdArr = postTag.filter((tag) => tag.post_id === idNumber);
	const tagsArr = tagsIdArr.map((id) => {
		return tags.find((tag) => tag.id === id.tag_id);
	});

	// key counter variable for when data is still loading.
	var number = 1;

	// hide modal delete
	const deleteHide = () => {
		setDeleteState(false);
	};

	// hide modal addTag
	const addTagHide = () => {
		setAddTagState(false);
	};

	// hide modal RemoveTag
	const removeTagHide = () => {
		setRemoveTagState(false);
	};

	// converting timestamp
	const date = new Date(post.updatedAt);
	const dateFormatted = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);

	return (
		<Container style={{ margin: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{user.username !== null && (
				<div style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end', width: '50%' }}>
					<Button
						variant="secondary"
						style={{ width: '15%', margin: '0 1rem' }}
						onClick={() => history.push(`/editpost/${post.id}`)}
					>
						Edit Post
					</Button>
					<Button variant="secondary" style={{ width: '15%', margin: '0 1rem' }} onClick={() => setAddTagState(true)}>
						Add Tag
					</Button>
					<Button
						variant="secondary"
						style={{ width: '15%', margin: '0 1rem' }}
						onClick={() => setRemoveTagState(true)}
					>
						Remove Tag
					</Button>
					<Button variant="secondary" style={{ width: '15%', margin: '0 1rem' }} onClick={() => setDeleteState(true)}>
						Delete Post
					</Button>
				</div>
			)}
			<h1 style={{ fontSize: '8rem', width: '80%' }}>{post.title}</h1>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					width: '60%',
					marginTop: '4rem'
				}}
			>
				<ListGroup.Item
					style={{ height: '4.3rem', width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					Last editted on "{dateFormatted}"
				</ListGroup.Item>
				<ListGroup.Item
					style={{
						height: '4.3rem',
						width: '45%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderTop: '1px solid rgba(0,0,0,.125)'
					}}
				>
					Progress:&nbsp;&nbsp;<ProgressBar percentage={post.progress} />
				</ListGroup.Item>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					width: '60%',
					marginTop: '2rem'
				}}
			>
				<ListGroup horizontal>
					{tagsArr.map((tag) => {
						if (!tag) {
							var key = number++;

							return <div key={key}>Loading Tags...</div>;
						} else return <ListGroup.Item key={tag.id}>{tag.tag}</ListGroup.Item>;
					})}
				</ListGroup>
			</div>
			<div
				className="dg-post"
				style={{ marginTop: '4rem', width: '65%', fontSize: '1.8rem', lineHeight: '4rem' }}
				dangerouslySetInnerHTML={{ __html: post.body }}
			/>
			<DeletePost show={deleteState} onHide={deleteHide} id={post.id} />
			<AddTagToPost show={addTagState} onHide={addTagHide} id={post.id} />
			<RemoveTag show={removeTagState} onHide={removeTagHide} id={post.id} />
		</Container>
	);
}
