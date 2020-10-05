import { selector } from 'recoil';

import _ from 'lodash';

import { postState, tagState, mutableState, postTagState } from './atoms';

// return updated state when post is edited
export const postStateEdit = selector({
	key: 'updatePosts',
	get: ({ get }) => {
		return get(postState);
	},
	set: ({ set }, updatedPost) => {
		set(postState, (prevPosts) => {
			const postData = _.clone(prevPosts);
			return postData.map((post) => {
				if (post.id === updatedPost.id) {
					return {
						...post,
						title: updatedPost.title,
						body: updatedPost.body,
						progress: updatedPost.progress
					};
				} else return post;
			});
		});
	}
});

// add a post to state
export const postStateAdd = selector({
	key: 'addPosts',
	get: ({ get }) => {
		return get(postState);
	},
	set: ({ set }, newPost) => {
		set(postState, (prevPosts) => {
			const postData = _.clone(prevPosts);

			return postData.concat(newPost);
		});
	}
});

// remove a post from state
export const postStateRemove = selector({
	key: 'removePosts',
	get: ({ get }) => {
		return get(postState);
	},
	set: ({ set }, deletePost) => {
		set(postState, (prevPosts) => {
			const postData = prevPosts;
			const indexToRemove = postData.findIndex((val) => val === deletePost);

			return [ ...postData.slice(0, indexToRemove), ...postData.slice(indexToRemove + 1) ];
		});
	}
});

// add a tag to state
export const tagStateAdd = selector({
	key: 'addTag',
	get: ({ get }) => {
		return get(tagState);
	},
	set: ({ set }, newTag) => {
		set(tagState, (prevTags) => {
			const tagData = _.clone(prevTags);
			return tagData.concat(newTag);
		});
	}
});

// filtering on progress with switch statement. set mutable-state but get postState to ensure default state
export const postFilterProgress = selector({
	key: 'progressFilter',
	get: ({ get }) => {
		return get(postState);
	},
	set: ({ set, get }, descAsc) => {
		set(mutableState, () => {
			const mutable = get(postState);
			const postData = _.clone(mutable);

			switch (descAsc) {
				case 'DESC':
					return postData.sort((a, b) => {
						if (a.progress < b.progress) return 1;
						if (a.progress > b.progress) return -1;
						else return 0;
					});
				case 'ASC':
					return postData.sort((a, b) => {
						if (a.progress > b.progress) return 1;
						if (a.progress < b.progress) return -1;
						else return 0;
					});
				case 'DEFAULT':
					return postData;
				default:
					return postData;
			}
		});
	}
});

// filter on tags. Set mutableState but get postState to ensure filtering on all posts
export const postFilterTag = selector({
	key: 'tagFilter',
	get: ({ get }) => {
		return get(postState);
	},
	set: ({ set, get }, tagIds) => {
		set(mutableState, () => {
			const postData = get(postState);

			if (tagIds === 'all') return postData;
			const arr = postData.filter((post) => {
				return tagIds.some((postId) => post.id === postId);
			});

			return arr;
		});
	}
});

// removing tag from post
export const removeTagFromPost = selector({
	key: 'removeTagFromPost',
	get: ({ get }) => {
		return get(postTagState);
	},
	set: ({ set }, twoIds) => {
		set(postTagState, (prevState) => {
			const postTagData = _.clone(prevState);
			const postTagFilter = postTagData.filter((tag) => {
				if (tag.post_id === twoIds.post_id && tag.tag_id === twoIds.tag_id) return false;
				else return true;
			});

			return postTagFilter;
		});
	}
});

// adding tag to post.
export const addTagToPost = selector({
	key: 'addTagFromPost',
	get: ({ get }) => {
		return get(postTagState);
	},
	set: ({ set }, twoIds) => {
		set(postTagState, (prevState) => {
			const postTagData = _.clone(prevState);
			//const newPostTag = { post_id: twoIds.post_id, tag_id: twoIds.tag_id };
			postTagData.push(twoIds);
			console.log(postTagData);

			return postTagData;
		});
	}
});
