// import { csrfFetch } from "./csrf";

const ADD_CHANNEL = "channel/ADD_CHANNEL"
const GET_CHANNEL = "channel/GET_CHANNEL"
const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS"
const GET_ALL_CHANNELS_BY_SERVER = "channel/GET_ALL_CHANNELS_BY_SERVER"
const EDIT_CHANNEL = "channel/EDIT_CHANNEL"
const DELETE_CHANNEL = "channel/DELETE_CHANNEL"

//-------------------------action creator-------------------------
const addChannel = (addedChannel) => {
    return {
        type: ADD_CHANNEL,
        addedChannel
    }
}

const getChannel = (channel) => {
    return {
        type: GET_CHANNEL,
        channel
    }
}

const getAllChannels = (allChannels) => {
    return {
        type: GET_ALL_CHANNELS,
        allChannels
    }
}
const getAllChannelsByServer = (allChannels) => {
    return {
        type: GET_ALL_CHANNELS_BY_SERVER,
        allChannels
    }
}

const editChannel = (editedChannel) => {
    return {
        type: EDIT_CHANNEL,
        editedChannel
    }
}

const deleteChannel = (deletedChannelId) => {
    return {
        type: DELETE_CHANNEL,
        deletedChannelId
    }
}

//-------------------------THUNK----------------------------------
export const getAllChannelsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/channels`);
    if (response.ok) {
        const channels = await response.json();
        // console.log("GETALLCHANNELSTHUNK",channels)
        dispatch(getAllChannels(channels));
    }
}

export const getAllChannelsByServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/channels/server/${serverId}`);
    if (response.ok) {
        const channels = await response.json();
        // console.log("GETALLCHANNELSBYSERVER THUNK",channels)
        dispatch(getAllChannelsByServer(channels));
    }
}

export const addChannelThunk = (channel) => async (dispatch) => {
    // const { user_id, name, description, category_id, address, city, state, zip_code, phone, website, price_range, channel_hours, latitude, longitude } = channel;
    const response = await fetch(`/api/channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(channel),
    });

    if (response.ok) {
        const newChannel = await response.json();
        // console.log("ADDCHANNELTHUNK",newChannel)

        dispatch(addChannel(newChannel));
        return newChannel;
    }
}




export const getChannelThunk = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`);

    if (response.ok) {
        const channel = await response.json();
        // console.log("GETCHANNELTHUNK",channel)

        dispatch(getChannel(channel));
    }
}


export const editChannelThunk = (channel) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channel)
    })
    if (response.ok) {
        const newChannel = await response.json();
        // console.log("EDITEDCHANNELTHUNK",newChannel)
        dispatch(editChannel(newChannel));
        return newChannel;
    }
}


export const deleteChannelThunk = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteChannel(channelId));
    }
}
//-------------------------reducer--------------------------------

const initialState = {serverChannels:{}};

const channelReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_CHANNEL:
            newState = { ...state };
            newState[action.channel.id] = action.channel;
            return newState;
        case GET_ALL_CHANNELS:
            newState = {...state};
            action.allChannels.Channel.forEach(ser => {
                newState[ser.id] = ser;
            });
            return newState;
        case GET_ALL_CHANNELS_BY_SERVER:
                newState = {...state, serverChannels:{}};
                action.allChannels.ServerChannels.forEach(ser => {
                    newState.serverChannels[ser.id] = ser;
                });
                return newState;
        case ADD_CHANNEL:
            return {
                ...state, serverChannels:{...state.serverChannels, [action.addedChannel.id]: action.addedChannel}
                
            };
        case EDIT_CHANNEL:
            return {
                ...state,
                serverChannels:{...state.serverChannels, [action.editedChannel.id]: action.editedChannel}
            };
        case DELETE_CHANNEL:
            let deletedState = { ...state }
            delete deletedState[action.deletedChannelId];
            return deletedState;
        default:
            return state;
    }
}

export default channelReducer;