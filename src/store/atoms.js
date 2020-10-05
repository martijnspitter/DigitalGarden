import { atom } from 'recoil';

// user is needed to see the walled off sections of the site
export const userState = atom({
	key: 'user',
	default: {
		id: null,
		username: null,
		token: null
	}
});

// all post. This state is used to start fresh when filtering
export const postState = atom({
	key: 'allPosts',
	default: []
});

// all tags
export const tagState = atom({
	key: 'allTags',
	default: []
});

// cross table tags and posts
export const postTagState = atom({
	key: 'allPostTags',
	default: []
});

// all posts. This state used in rendering
export const mutableState = atom({
	key: 'mutableState',
	default: postState
});
