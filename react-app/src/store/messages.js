// import { csrfFetch } from "./csrf";

const ADD_MESSAGE = "message/ADD_MESSAGE"
const GET_MESSAGE = "message/GET_MESSAGE"
const GET_ALL_MESSAGES = "message/GET_ALL_MESSAGES"
const EDIT_MESSAGE = "message/EDIT_MESSAGE"
const DELETE_MESSAGE = "message/DELETE_MESSAGE"

//-------------------------action creator-------------------------
const addMessage = (addedMessage) => {
    return {
        type: ADD_MESSAGE,
        addedMessage
    }
}

const getMessage = (message) => {
    return {
        type: GET_MESSAGE,
        message
    }
}

const getAllMessages = (allMessages) => {
    return {
        type: GET_ALL_MESSAGES,
        allMessages
    }
}

const editMessage = (editedMessage) => {
    return {
        type: EDIT_MESSAGE,
        editedMessage
    }
}

const deleteMessage = (deletedMessageId) => {
    return {
        type: DELETE_MESSAGE,
        deletedMessageId
    }
}

//-------------------------THUNK----------------------------------
export const getAllMessagesForChannelThunk = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/messages/chan/${channelId}`);
    if (response.ok) {
        const messages = await response.json();
        // console.log("GETALLMESSAGESTHUNK",messages)
        dispatch(getAllMessages(messages));
    }
}

export const addMessageThunk = (message) => async (dispatch) => {
    // const { user_id, name, description, category_id, address, city, state, zip_code, phone, website, price_range, message_hours, latitude, longitude } = message;
    const response = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
    });

    if (response.ok) {
        const newMessage = await response.json();
        // console.log("ADDMESSAGETHUNK",newMessage)

        dispatch(addMessage(newMessage));
        return newMessage;
    }
}




export const getMessageThunk = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`);

    if (response.ok) {
        const message = await response.json();
        // console.log("GETMESSAGETHUNK",message)

        dispatch(getMessage(message));
    }
}


export const editMessageThunk = (message) => async (dispatch) => {
    const response = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    })
    if (response.ok) {
        const newMessage = await response.json();
        // console.log("EDITEDMESSAGETHUNK",newMessage)
        dispatch(editMessage(newMessage));
        return newMessage;
    }
}


export const deleteMessageThunk = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteMessage(messageId));
    }
}
//-------------------------reducer--------------------------------

const initialState = {};

const messageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_MESSAGE:
            newState = { ...state };
            newState[action.message.id] = action.message;
            return newState;
        case GET_ALL_MESSAGES:
            newState = {};
            action.allMessages.ChannelMessage.forEach(ser => {
                newState[ser.id] = ser;
            });
            return newState;
        case ADD_MESSAGE:
            return {
                ...state,
                [action.addedMessage.id]: action.addedMessage
            };
        case EDIT_MESSAGE:
            return {
                ...state,
                [action.editedMessage.id]: action.editedMessage
            };
        case DELETE_MESSAGE:
            newState = { ...state }
            delete newState[action.deletedMessageId];
            return newState;
        default:
            return state;
    }
}

export default messageReducer;