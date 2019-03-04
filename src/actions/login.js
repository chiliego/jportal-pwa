export const LOGIN = 'LOGIN';
export const LOGIN_INPUT = 'LOGIN_INPUT';
export const LOGIN_INPUT_ERROR = 'LOGIN_INPUT_ERROR';
export const RESET_LOGIN_INPUT_ERROR = 'RESET_LOGIN_INPUT_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const sendlogin = () => (dispatch, getState) => {
  const state = getState();
  let username = state.login.input.username;
  let password = state.login.input.password;
  let errors = state.login.errors;

  dispatch({
    type: RESET_LOGIN_INPUT_ERROR
  });

  if(username === undefined || username === ""){
    errors = [...errors, "Check username input"]
  }

  if(password === undefined || password === ""){
    errors = [...errors, "Check password input"]
  }

  if(errors.length > 0){
    dispatch({
      type: LOGIN_INPUT_ERROR,
      errors: errors
    })
  } else {
    let userPasswToken = btoa([username, password].join(":"));
    dispatch(fetchlogin(userPasswToken));
    dispatch(loginInput({username: "", password: ""}))
  }
}

const fetchlogin = (userPasswToken) => (dispatch) => {
  let loginurl = "http://localhost:8291/jportal/api/v2/auth/login";
  // let loginurl = "http://localhost:8080/jportal/api/v2/auth/login";
  fetch(loginurl,{
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic " + userPasswToken
    },
  }).then(resp => {
    // resp.headers.forEach(header => {
    //   if(header.startsWith('Bearer')){
    //   dispatch( {
    //     type: LOGIN_SUCCESS,
    //     bearer: header
    //   })
    //
    //   }
    // })
    return resp.json();
  }).then(json => console.log("JSON: " + JSON.stringify(json)))
    .catch(err => console.log(err))
}


export const loginInput = (input) => {
  return {
    type: LOGIN_INPUT,
    input
  }
}