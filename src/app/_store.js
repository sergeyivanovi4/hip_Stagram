import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"; //рушій localStorage для персіста
import {
  persistReducer,
  persistStore,
  FLUSH, //localStoredReducer, екшони та таке інше
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "http://hipstagram.node.ed.asmer.org.ua/graphql",
    prepareHeaders(headers, { getState }) {
      const { token } = getState().auth; //отримуємо токен
      if (token) {
        //якщо ми залогінени
        headers.set("Authorization", "Bearer " + token); //додаємо токен до заголовків
      }
      console.log("auth!!!!", getState().auth, token);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getFind: builder.query({
      query: () => ({
        document: `query HipstagramFind {
							UserFind(query: "[ {}, { \"sort\": [{\"_id\:"-1}] } ]") {
								_id 
								createdAt
								login
									nick 
									avatar { url }
									likes { _id }
									incomings { _id }
										followers { _id }
										following { _id }
							}
						}`,
        variables: {},
      }),
    }),

    getFindOne: builder.query({
      query: (id) => ({
        document: `query GetUser($query: String!) {
						UserFindOne(query: $query){
								_id 
								createdAt
								login
								nick 
								avatar { url }
								likes { _id }
								likesCount
								incomings { _id }
								followers { _id }
								following { _id }
						}
						}`,
        variables: { query: JSON.stringify([{ _id: id }]) },
      }),
      providesTags: (result, error, _id) => {
        //функція, яка створює тег, який ідентіфікує користувача
        return [{ type: "User", id: _id }];
      },
    }),

    createFindOne: builder.mutation({
      query: ({ user: _id }) => ({
        document: `
				mutation CreateUser ($user: UserInput!) {
					UserUpsert(user: $user) {
						_id
						login
						nick
						avatar { url }
						following {
							_id
							login
							nick
							avatar { url }
						}
					}
				}
				`,
        variables: { user: { _id } },
      }),
    }),

    getHipstagramPost: builder.query({
      query: () => ({
        document: `    
				query GetPost{
								PostFind(query:"[{}, {}]"){
									_id 
									createdAt
									text
									images { _id url }
									comments { _id text }
									directs { _id }
									collections { _id }
									likes { _id 
									owner {
										_id login
										}}
									likesCount
									owner {
										_id login
									}
								}
		} `,
        variables: {},
      }),
    }),

    getPostOne: builder.query({
      query: (_id) => ({
        document: `    
				query GetPostOne($query: String!){
								PostFind(query: $query ){
									_id 
									createdAt
									text
									images { _id url }
									comments { _id text post{_id}}
									directs { _id }
									collections { _id }
									likes { _id 
											owner {
												_id login
											}}
									likesCount
									owner {
										_id login
									}
								}
		} `,
        variables: { query: JSON.stringify([{ _id }, {sort: [{_id: 1}]}]) },
      }),
      providesTags: (result, error, _id) => [{ type: "Post", _id: _id }],
    }),

    getPostFinds: builder.query({
      query: (_id) => ({
        document: `    
        query GetPostFinds($query: String!){
          PostFind(query:$query){     
                    images { _id url }
                    text
                    comments { _id text post{_id}}
                    owner{_id login avatar{url}}
                    _id likesCount 
                    likes{
                        _id
                        owner{				
                            login avatar {url} _id
                          }
                    }
              }
            } `,
        variables: { query: JSON.stringify([{ ___owner: _id } , {sort: [{_id: -1}]}])  },
      }),
      providesTags: (result, error, _id) => [{ type: "Post", _id}],
    }),

    createHipstagramPost: builder.mutation({
      query: ({ post }) => ({
        document: `
					mutation createPost($post: PostInput!) {
						PostUpsert(post: $post) {
							_id
							title
							text
							images { url }
							comments { text }
							directs  { _id }
							collections { _id }
						}
					}
				`,
        variables: { post },
      }),
    }),

    getAllLikes: builder.query({
      query: (_id) => ({
        document: `query getAllLikes($query: String!) {
								LikeFind (query: $query){
									_id 
									post { _id }
									comment { _id text }
									direct { _id  }
									owner { _id login }
							}
						}`,
        variables: { query: JSON.stringify({ _id }) },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Like", _id: arg._id }],
    }),

    createLikes: builder.mutation({
      query: (_id) => ({
        document: `
					mutation CreateLikes($like: LikeInput!) {
						LikeUpsert(like: $like) {
							_id 
							post { _id }
							owner { _id login }
						}
					}
				`,
        variables: { like: { post: { _id } } },
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Post", _id: _id }],
    }),

    likeDelete: builder.mutation({
      query: (_id) => ({
        document: `
					mutation DeleteLike($like: LikeInput!) {
					LikeDelete(like: $like) {
							_id 
							post { _id }
							owner { _id login }
						}
					}
				`,
        variables: { like: { _id } },
      }),
      invalidatesTags: (result, error, _id) => [{ type: "Post", _id}],
    }),

    createComment: builder.mutation({
      query: ({ comment, _id }) => ({
        document: `
                    mutation CreateComment($comment: CommentInput!) {
                      CommentUpsert(comment: $comment) {
                        _id
                        text
                        post {
                          _id
                        }
                      }
                    } 
                    `,
        variables: { comment: { post: { _id }, text: comment } },
      }),
    
      invalidatesTags: (result, error,  _id ) => [{ type: "Post", _id}],
    }),

    getImage: builder.query({
      query: ({}) => ({
        document: `query GetImage{
								ImageFind (query: "{}"){
									_id 
									text
									url
									originalFileName
									userAvatar { _id login }
									posts { _id  }
									directs { _id }
									owner { _id login }
							}
						}`,
        variables: {},
      }),
    }),

    createImage: builder.mutation({
      query: ({}) => ({
        document: `
						mutation CreateImage ($image: ImageInput!) {
							ImageUpsert(image: $image) {
								_id
								login
								nick
								avatar { url }
								following {
									_id
									login
									nick
									avatar { url }
								}
							}
						}
				`,
        variables: {},
      }),
    }),

    login: builder.mutation({
      query: ({ login, password }) => ({
        document: `
				query login($login: String!, $password: String!) {
					login(login: $login, password: $password) 
				}
				`,
        variables: { login, password },
      }),
    }),

    fullRegister: builder.mutation({
      query: ({ login, password }) => ({
        document: `
			mutation fullRegister($login: String!, $password: String!) {
				createUser(login: $login, password: $password) {
				_id
				login
				}
			}
			`,
        variables: { login, password },
      }),
    }),

    getUserById: builder.query({
      query: (_id) => ({
        document: `query oneUser($query: String!){
							UserFindOne(query: $query){
								_id login nick avatar{ url } 
							}
						}`,
        variables: { query: JSON.stringify([{}]) },
      }),
      providesTags: (result, error, _id) => {
        //функція, яка створює тег, який ідентіфікує користувача
        return [{ type: "User", id: _id }];
      },
    }),

    setUserNick: builder.mutation({
      query: ({ _id, nick }) => ({
        document: `
				mutation setNick($_id:String, $nick:String) {
					UserUpsert(user: {_id: $_id, nick: $nick}){
						_id nick
					}
				}
				`,
        variables: { _id, nick },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }], //функція, яка розповідає, яких саме користувачів перетворити на інвалідів
    }),
  }),
});

function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

//
// slice для автентифікації
//
export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, payload: null, userInfo: null }, // as AuthState
  reducers: {
    // setUserData(state, action) {
    //   state.userData = action.payload;
    // },
    login(state, { payload: token }) {
      const payload = jwtDecode(token);
      if (payload) {
        state.payload = payload;
        state.token = token;
        state.userInfo = null;
      }
      // return {payload, token}
    },
    logout(state) {
      state.payload = null;
      state.token = null;
      state.userInfo = null;
    },
    // setLoading(state) {
    //    state.isLoading = action.payload
    // }
    aboutMe(state, { payload }) {
      state.userInfo = payload;
      console.log("aboutMeaboutMe", state, state.userInfo);
    },

  },

  extraReducers: (builder) => {
    //це додаткові редьюсери
    builder.addMatcher(
      //редьюсер, який спрацьовує коли завантажиться токен
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

//
// Створюємо reducer для api та authSlice
//
export const store = configureStore({
  reducer: {
    [authSlice.name]: persistReducer(
      { key: "auth", storage },
      authSlice.reducer
    ),
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    api.middleware,
  ],
});

const persistor = persistStore(store);

// Підписуємось на зміни у сторі та виводимо їх у консоль
store.subscribe(() => console.log("subscribesubscribe", store.getState()));

// export const store = createStore(rootReducers);

export const actionFullRegister = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.fullRegister.initiate({ login, password })
  );

  if (token?.createUser) {
    await dispatch(actionFullLogin(login, password));
  } else {
    alert("Ввели не вірний логін чи пароль, спробуйте щє раз");
  }
};

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.login.initiate({ login, password })
  ); //найцікавіше - як отримати з api звичайний thunk

  if (token?.data?.login) {
    dispatch(authSlice.actions.login(token.data.login));
    await dispatch(actionAboutMe()); //запит на інформацію о поточном користувачі
  } else {
    alert("Ввели не вірний логін чи пароль, спробуйте щє раз");
  }
};

export const actionAboutMe = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (auth.payload) {
    const { id } = auth.payload.sub;
    const user = await dispatch(api.endpoints.getFindOne.initiate(id));
    console.log("userActionAboutMe", user);

    dispatch(authSlice.actions.aboutMe(user.data.UserFindOne));
  }
};

export const addLikeToPost = (_id) => async (dispatch) => {
  try {
    // Відправляємо запит на додавання лайка до поста
    const data = await dispatch(api.endpoints.createLikes.initiate(_id));
    console.log("лайкаєєєєєєєєєєєєєє", data);
  } catch (error) {
    console.error("Помилка при додаванні лайка до поста:", error);
  }
};

export const removeLikeFromPost = (_id) => async (dispatch) => {
  try {
    // Відправляємо запит на видалення лайка з поста
    const data = await dispatch(api.endpoints.likeDelete.initiate(_id));
    console.log("забираєєєєє лайкаєєєєєєєєєєєєєє", data);

  } catch (error) {
    console.error("Помилка при видаленні лайка з поста:", error);
  }
};




export const sendComment = ( comment, _id) => async (dispatch) => {
  try {
    const data = await dispatch(api.endpoints.createComment.initiate( {  comment, _id }));
    console.log("datasendComment", data);
  } catch (error) {
    console.error("Помилка при відправці коментаря:", error);
  }
};



export const { setUserData } = authSlice.actions;
export const {
  useGetFindQuery,
  useGetFindOneQuery,
  useGetHipstagramPostQuery,
  useGetAllLikesQuery,
  useGetImageQuery,
  useGetUserByIdQuery,
  useGetPostOneQuery,
  useGetPostFindsQuery,


  useCreateFindOneMutation,
  useCreateLikesMutation,
  useCreateImageMutation,
  useLoginMutation,
  useFullRegisterMutation,
  useSetUserNickMutation,
} = api;
