

// // Action Types
// export const LOGIN_USER = 'user/loginUser';
// export const LOGOUT_USER = 'user/logoutUser';
// export const SET_LOADING = 'user/setLoading';

// // Action Creators
// export const loginUser = (user) => ({
//   type: LOGIN_USER,
//   payload: user,
// });

// export const logoutUser = () => ({
//   type: LOGOUT_USER,
// });

// export const setLoading = (isLoading) => ({
//   type: SET_LOADING,
//   payload: isLoading,
// });

// // Редюсер
// const initialState = {
//   // user: {user: "2222"},
//   user: null,
//   isLoading: true,
// };

// const userReducer = (state = initialState, action) => {
//   const reducers = {
//     [LOGIN_USER]: (state, action) => ({
//       ...state,
//       user: action.payload,
//     }),
//     [LOGOUT_USER]: (state) => ({
//       ...state,
//       user: null,
//     }),
//     [SET_LOADING]: (state, action) => ({
//       ...state,
//       isLoading: action.payload,
//     }),
//   };

//   const reducerFn = reducers[action.type];
//   return reducerFn ? reducerFn(state, action) : state;
// };

// export default userReducer;
