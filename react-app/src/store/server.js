// import { csrfFetch } from "./csrf";

const ADD_SERVER = "server/ADD_SERVER"
const GET_SERVER = "server/GET_SERVER"
const GET_ALL_SERVERS = "server/GET_ALL_SERVERS"
const EDIT_SERVER = "server/EDIT_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"
const UPLOAD_SERVER_PIC = 'session/UPLOAD_SERVER_PIC';


//-------------------------action creator-------------------------
const addServer = (addedServer) => {
    return {
        type: ADD_SERVER,
        addedServer
    }
}


const getServer = (server) => {
    return {
        type: GET_SERVER,
        server
    }
}

const getAllServers = (allServers) => {
    return {
        type: GET_ALL_SERVERS,
        allServers
    }
}

const editServer = (editedServer) => {
    return {
        type: EDIT_SERVER,
        editedServer
    }
}

const deleteServer = (deletedServerId) => {
    return {
        type: DELETE_SERVER,
        deletedServerId
    }
}


const uploadServerPic = (server) => ({
    type: UPLOAD_SERVER_PIC,
    server
  })
//-------------------------THUNK----------------------------------
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/servers`);
    if (response.ok) {
        const servers = await response.json();
        // console.log("GETALLSERVERSTHUNK",servers)
        dispatch(getAllServers(servers));
    }
}

export const addServerThunk = (server) => async (dispatch) => {
    // const { user_id, name, description, category_id, address, city, state, zip_code, phone, website, price_range, server_hours, latitude, longitude } = server;
    const response = await fetch(`/api/servers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server),
    });

    if (response.ok) {
        const newServer = await response.json();
        // console.log("ADDSERVERTHUNK",newServer)

        dispatch(addServer(newServer));
        return newServer;
    }
}




export const getServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`);

    if (response.ok) {
        const server = await response.json();
        // console.log("GETSERVERTHUNK",server)

        dispatch(getServer(server));
    }
}


export const editServerThunk = (server) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(server)
    })
    if (response.ok) {
        const newServer = await response.json();
        // console.log("EDITEDSERVERTHUNK",newServer)
        dispatch(editServer(newServer));
        return newServer;
    }
}


export const deleteServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteServer(serverId));
    }
}


// export const uploadServerPicThunk = (payload) => async (dispatch) => {
//     // console.log("in thunk????")
//     const formData = new FormData();
//     formData.append('name', payload.name)
//     formData.append('description', payload.description)
//     formData.append('user_id', payload.user_id)
//     formData.append('server_pic', payload.server_pic)
//     formData.append('explore_pic', payload.explore_pic)
//     formData.append('default_role', payload.default_role)
//     formData.append('category', payload.category)

    
//     // console.log("this is id", id)
//     const response = await fetch(`/api/servers/${payload.id}/update`,{
//       method: "PUT",
//       headers:{"Content-Type":"multipart/form-data"},
//       body: formData
//     })
//     console.log("response", response.json())
//     if(response.ok){
//       const updatedServer = await response.json()
//       dispatch(uploadServerPic(updatedServer))
//       return updatedServer
//     }
//   }
//-------------------------reducer--------------------------------

const initialState = {};

const serverReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){

        case GET_SERVER:
            newState = { ...state,};
            newState[action.server.id] = action.server;
            return newState;
        case GET_ALL_SERVERS:
            newState = {...state};
            action.allServers.Server.forEach(ser => {
                newState[ser.id] = ser;
            });
            return newState;
        case ADD_SERVER:
            return {
                ...state,
                [action.addedServer.id]: action.addedServer
            };
        case EDIT_SERVER:
            return {
                ...state,
                [action.editedServer.id]: action.editedServer
            };
        case DELETE_SERVER:
            newState = { ...state }
            delete newState[action.deletedServerId];
            return newState;
        case UPLOAD_SERVER_PIC:
            return {['server']:action.server}
        default:
            return state;
    }
}

export default serverReducer;