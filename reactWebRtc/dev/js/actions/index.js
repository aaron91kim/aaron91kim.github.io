
export const enterUser = ( user ) => {
	return {
		type: 'USER_ENTER',
		payload: user
	}
};
export const updateLocalUser = ( user ) => {
	return{
		type: 'USER_UPDATE_LOCAL',
		payload: user
	}
}

export const updateUsersList = ( users ) => {
	return {
		type: 'USER_UPDATE_LIST',
		payload: users
	}
} 

export const disconnectUser = ( user ) => { 
	return{
		type: 'USER_DISCONNECTED',
		payload: user
	}
}

// chatting
export const sendMessage = ( message ) => {
	return{
		type: 'USER_MESSAGE_SENT',
		payload: message
	}
}

// room events
export const updateRoomsList = ( rooms )=> {
	return{
		type: 'ROOM_UPDATE_LIST',
		payload: rooms
	}
}

export const readyToCreateRoom = ( room ) => {
	return{
		type: 'READY_TO_CREATE_ROOM',
		payload: room
	}
}

export const setMasterPeer = ( peer ) => {
	return{
		type: 'SET_MASTER_PEER',
		payload: peer
	}
}

export const createRoom = ( room ) => {
	return{
		type: 'CREATE_ROOM',
		payload: room
	}
}

export const removeRoom = ( room ) => {
	return{
		type: 'REMOVE_ROOM',
		payload: room
	}
}

export const enterRoom = ( user ) => {
	return{
		type: 'USER_ENTER_ROOM',
		payload: user
	}
}
