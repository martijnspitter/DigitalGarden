import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { mutableState, postTagState, tagState } from '../store/atoms';
import { postFilterProgress, postFilterTag } from '../store/selectors';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function Home() {
	const posts = useRecoilValue(mutableState);
	const tags = useRecoilValue(tagState);
	const postTags = useRecoilValue(postTagState);

	const setProgress = useSetRecoilState(postFilterProgress);
	const setTagFilter = useSetRecoilState(postFilterTag);

	const [ progressFilter, setProgressFilter ] = useState('DESC');
	const [ percentage, setPercentage ] = useState(50);
	const [ styling, setStyling ] = useState('YES');
	var [ delay, setDelay ] = useState(1);

	// trim long titles on posts
	const titleLength = (title) => {
		if (title.length >= 85) {
			const trimmedTitle = title.substring(0, 85) + '...';
			return trimmedTitle;
		} else {
			return title;
		}
	};

	// key counter variable for when data is still loading.
	var number = 1;

	// toggle for progress state. Depending on the state the recoil state gets a different argument for the switch statement in the postFilterProgress selector
	const progressFilterToggle = () => {
		if (progressFilter === 'DESC') {
			setProgressFilter('ASC');
			setPercentage(100);
		}
		if (progressFilter === 'ASC') {
			setProgressFilter('DEFAULT');
			setPercentage(0);
		}
		if (progressFilter === 'DEFAULT') {
			setProgressFilter('DESC');
			setPercentage(50);
		}
		setStyling('NO');
		setProgress(progressFilter);
		resetClass();
	};

	// filtering on tags. Progress filter reset to 50%
	const tagFilter = (id) => {
		const tagIds = postTags.filter((tag) => tag.tag_id === id);

		const idAr = [];
		tagIds.map((id) => idAr.push(id.post_id));

		setStyling('NO');
		setPercentage(50);
		setTagFilter(idAr);

		resetClass();
		toggleClass('tag' + id);
	};

	// resetting class on tags.
	const resetClass = () => {
		const elements = document.getElementsByClassName('dg-listItem list-group-item');

		Array.prototype.map.call(elements, (ele) => {
			if (ele.className === 'dg-listItem tag-clicked list-group-item') {
				ele.className = 'dg-listItem list-group-item';
			}
		});
	};

	// setting class on tag to apply styling when filtering
	const toggleClass = (tag) => {
		document.getElementById(tag).className = 'dg-listItem tag-clicked list-group-item';
	};

	// toggle allPosts with animation starting at zero instead of 1
	const allPosts = () => {
		setDelay(0);
		setStyling('YES');
		setTagFilter('all');
		resetClass();
		toggleClass('tagAll');
		setPercentage(50);
	};

	// only apply animation when first loading or on allPosts. All other filters no annimation
	const style = (styling) => {
		var time = (delay += 0.2);
		if (styling === 'YES') return { animation: `moveInPost 1s ease-out ${time}s backwards` };
		if (styling === 'NO') return {};
	};

	const postRender = () => {
		return posts.map((post) => {
			return (
				<Link to={`/post/${post.id}`} style={style(styling)} key={post.id} className="post-link">
					<Card
						className="post-card"
						style={{
							width: '25rem',
							height: '20rem',
							flex: '0 0 auto',

							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							backgroundColor: '#264653',
							borderRadius: '5px',
							color: '#E76F51'
						}}
					>
						<div className="dg-title">{titleLength(post.title)}</div>

						<div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
							<ProgressBar percentage={post.progress} />
						</div>
					</Card>
				</Link>
			);
		});
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				flexWrap: 'wrap',
				width: '80%',
				marginTop: '6rem'
			}}
		>
			<div className="dg-text">
				<h1 style={{ fontSize: '8rem', alignSelf: 'flex-start', fontWeight: 400 }}>My Digital Garden</h1>
				<p style={{ fontSize: '2rem', width: '60%', alignSelf: 'flex-start', marginTop: '2rem' }}>
					A digital garden is an open collection of notes, resources and thoughts on various topics. This digital garden
					is mainly focussed on Frontend Development using ReactJS. These notes are intended to aid me as I learn new
					technologies. For each note the progress bar shows how much knowledge I have about that topic.
				</p>
			</div>
			<div
				className="dg-tags"
				style={{
					width: '80%',
					display: 'flex',
					alignSelf: 'flex-start',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '2rem'
				}}
			>
				<ListGroup horizontal style={{ display: 'flex', width: '80%', flexWrap: 'wrap' }}>
					<ListGroup.Item key={-1} id="tagAll" className="dg-listItem tag-clicked" onClick={() => allPosts()}>
						All Posts
					</ListGroup.Item>
					{tags.map((tag) => {
						if (!tag) {
							var key = number++;
							return <div key={key}>Loading Tags...</div>;
						} else
							return (
								<ListGroup.Item
									className="dg-listItem"
									id={'tag' + tag.id}
									onClick={() => tagFilter(tag.id)}
									key={tag.id}
								>
									{tag.tag}
								</ListGroup.Item>
							);
					})}
				</ListGroup>
				<div style={{ width: '20rem', cursor: 'pointer', marginLeft: '8rem' }} onClick={() => progressFilterToggle()}>
					<ProgressBar percentage={percentage} />
				</div>
			</div>
			<div
				className="dg-posts"
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					width: '100%',
					margin: '4rem 0',
					height: '100rem'
				}}
			>
				{postRender()}
			</div>
		</div>
	);
}
