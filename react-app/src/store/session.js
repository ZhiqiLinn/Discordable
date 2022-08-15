// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPLOAD_PROFILE_PIC = 'session/UPLOAD_PROFILE_PIC';
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const uploadProfilePic = (user) => ({
  type: UPLOAD_PROFILE_PIC,
  user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // console.log("AUTHENTICATE RESPONSE!!", response)
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  // console.log("RESPONSE!!", response)
  if (response.ok) {
    // console.log("!!response.ok")
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    // console.log("!!response<500")
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    // console.log("!!response==500")

    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, repeatPassword) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      repeatPassword
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      // console.log('thunk',data.errors)
      return data.errors;
    
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const uploadProfilePicThunk = (payload) => async (dispatch) => {
  const {profile_pic} = payload;
  const formData = new FormData();
  formData.append('profile_pic', profile_pic)
  const response = await fetch('/api/auth/update',{
    method: "PUT",
    body: formData
  })

  if(response.ok){
    const updateUser = await response.json()
    dispatch(uploadProfilePic(updateUser))
    return updateUser
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null } 
    case UPLOAD_PROFILE_PIC:
      return {['user']:action.user}
    default:
      return state;
  }
}
