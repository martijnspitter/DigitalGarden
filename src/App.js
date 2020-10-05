import React, { Suspense, useEffect } from 'react';

import DGNavbar from './components/DGNavbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Post from './components/Post';
import Documentation from './components/Documentation';
import NewTag from './components/NewTag';

import { Route, Switch, Router, Redirect } from 'react-router-dom';
import history from './history';
import axios from './api/axios';

import { postState, tagState, postTagState } from './store/atoms';
import { useSetRecoilState } from 'recoil';

export default function App() {
	const setPosts = useSetRecoilState(postState);
	const setTags = useSetRecoilState(tagState);
	const setPostTags = useSetRecoilState(postTagState);

	useEffect(
		() => {
			const fetchPost = async () => {
				const response = await axios.get('/posts');

				setPosts(response.data);
			};

			const fetchTags = async () => {
				const response = await axios.get('/tags');
				setTags(response.data);
			};

			const fetchPostTags = async () => {
				const response = await axios.get('/posttags');
				setPostTags(response.data);
			};

			fetchPost();
			fetchTags();
			fetchPostTags();
		},
		[ setPosts, setTags, setPostTags ]
	);

	return (
		<Router history={history} basename={'/digitalgarden'}>
			<div className="DigitalGarden">
				<DGNavbar />

				<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route path={`${process.env.PUBLIC_URL}/`} exact component={Home}>
								<Redirect to={`${process.env.PUBLIC_URL}/home`} />
							</Route>
							<Route
								path={`${process.env.PUBLIC_URL}/external`}
								exact
								component={() => {
									window.location = 'http://martijnspitter.nl';
									return null;
								}}
							/>
							<Route path={`${process.env.PUBLIC_URL}/documentation`} exact component={Documentation} />
							<Route path={`${process.env.PUBLIC_URL}/home`} exact component={Home} />
							<Route path={`${process.env.PUBLIC_URL}/login`} exact component={Login} />
							<Route path={`${process.env.PUBLIC_URL}/register`} exact component={Register} />
							<Route path={`${process.env.PUBLIC_URL}/newpost`} exact component={NewPost} />
							<Route path={`${process.env.PUBLIC_URL}/editpost/:id`} component={EditPost} />
							<Route path={`${process.env.PUBLIC_URL}/post/:id`} component={Post} />
							<Route path={`${process.env.PUBLIC_URL}/newtag`} component={NewTag} />
						</Switch>
					</Suspense>
				</div>
			</div>
		</Router>
	);
}
