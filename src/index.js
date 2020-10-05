import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { RecoilRoot } from 'recoil';
import { userState } from './store/atoms';
import { postState } from './store/atoms';

import App from './App';
import PersistenceObserver from './PersistenceObserver';

const root = document.getElementById('root');

// recoil state persist for user and posts.
const initializeState = ({ set }) => {
	if (localStorage.user) {
		const user = localStorage.user;
		set(userState, JSON.parse(user));
	}
	if (localStorage.allPosts) {
		const allPosts = localStorage.allPosts;
		set(postState, JSON.parse(allPosts));
	}
};

ReactDOM.render(
	<RecoilRoot initializeState={initializeState}>
		<PersistenceObserver />
		<App />
	</RecoilRoot>,
	root
);
