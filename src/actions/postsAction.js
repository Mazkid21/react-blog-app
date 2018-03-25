import {GET_POSTS, POSTS_STATUS} from '../actionTypes';
import {database} from '../firebase';

export function getPosts(){
	return dispatch => {
		//as soon as this function fires show loading to true
		dispatch({
			type: POSTS_STATUS,
			payload: true
		});
		database.on('value', snapshot => {
			dispatch({
				type: GET_POSTS,
				payload: snapshot.val()
			});
			// once notes are recived show loading to false
			dispatch({
				type: POSTS_STATUS,
				payload: false
			});
			// wait until something changes and try again
		}, 
		() => {
				dispatch({
					type: POSTS_STATUS,
					payload: -1
				});
			}
		);
	};
}

export function savePosts(post) {
    return disptch => database.push(post);
}

export function deletePost(id) {
    return dispatch => database.child(id).remove();
}

export function saveComment(postId, comment){
	return dispatch => {
		database.child(postId).child('comments').push(comment);
	}
}