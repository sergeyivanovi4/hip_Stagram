import { GraphQLClient } from "graphql-request";

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
      console.log("auth!!!!", getState().auth);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getHipstagramFind: builder.query({
      query: () => ({
        document: `query HipstagramFind {
                        UserFind(query: "[{}, {\"sort\": [{\"_id\":-1}]}]"){
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
        variables: { query: JSON.stringify() },
      }),
    }),

    getHipstagramFindOne: builder.query({
      query: ({ _id }) => ({
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
        variables: { _id },
      }),
    }),

    CreateHipstagramFindOne: builder.mutation({
      query: ({ _id, user }) => ({
        document: `
            mutation CreateUser ($userInput: UserInput!) {
                createUser(user: $userInput) {
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
        variables: { _id, user },
      }),
    }),

    getHipstagramPost: builder.query({
      query: ({ post, _id }) => ({
        document: `    
            query GetPost{
                            PostFind(query:"[{}, {\"sort\":[{\"_id\": -1}]}]"){
                                _id 
                                createdAt
                                text
                                images { _id url }
                                comments { _id text }
                                directs { _id }
                                collections { _id }
                                likes { _id }
                                likesCount
                                owner {
                                    _id login
                                }
                            }
    } `,
        variables: { post, _id },
      }),
    }),

    createHipstagramPost: builder.mutation({
      query: ({ post, _id }) => ({
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
        variables: { post, _id },
      }),
    }),

    getHipstagramAllLikes: builder.query({
      query: ({ _id }) => ({
        document: `query GetAllLikes($query: String!){
                            LikeFind (query: $query){
                                _id 
                                post { _id }
                                comment { _id text }
                                direct { _id  }
                                owner { _id login }
                        }
                    }`,
        variables: { _id },
      }),
    }),

    createHipstagramLikes: builder.mutation({
      query: ({ _id, user }) => ({
        document: `
                mutation CreateLike($likeInput: LikeInput!) {
                    LikeUpsert(likeInput: $likeInput) {
                        _id 
                        post { _id }
                        comments { _id text }
                        directs { _id  }
                        owner { _id login }
                    }
                }
            `,
        variables: { _id, user },
      }),
    }),

    getHipstagramImage: builder.query({
        query: ({ _id }) => ({
          document: `query GetImage($query: String!){
                            ImageFind (query: $query){
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
          variables: { _id },
        }),
      }),
  
    createHipstagramImage: builder.mutation({
        query: ({ _id }) => ({
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
          variables: { _id },
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
      query: ({ _id }) => ({
        document: `query oneUser($query: String){
                UserFindOne(query: $query){
                    _id login nick avatar{ url } 
                }
            }`,
        variables: { query: JSON.stringify([{ _id }]) },
      }),
      providesTags: (result, error, { _id }) => {
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

console.log("api", api);

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
      console.log("LOGIN", state, token);
      const payload = jwtDecode(token);
      if (payload) {
        state.payload = payload;
        state.token = token;
        state.userInfo = null;
      }
      // return {payload, token}
    },
    logout(state) {
      // console.log('LOGOUT', state)
      state.payload = null;
      state.token = null;
      state.userInfo = null;
    },
    // setLoading(state) {
    //    state.isLoading = action.payload
    // }
    aboutMe(state, { payload }) {
      state.userInfo = payload;
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

console.log("authSlice", authSlice);

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
store.subscribe(() => console.log(store.getState()));
console.log("store", store);
console.log("store.getState", store.getState());
// export const store = createStore(rootReducers);

export const actionFullRegister = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.fullRegister.initiate({ login, password })
  );
  console.log("actionFullRegister token", token);

  if (token?.createUser) {
    await dispatch(actionFullLogin(login, password));
  } else {
    console.log("actionFullRegister token", token);
    alert("Ввели не вірний логін чи пароль, спробуйте щє раз");
  }
};

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.login.initiate({ login, password })
  ); //найцікавіше - як отримати з api звичайний thunk
  console.log("tokentoken", token);
  if (token?.data?.login) {
    dispatch(authSlice.actions.login(token.data.login));
    await dispatch(actionAboutMe()); //запит на інформацію о поточном користувачі
  } else {
    alert("Ввели не вірний логін чи пароль, спробуйте щє раз");
  }
};

// const actionAuthLogin = payload => ({type: "auth/login", payload})

const actionAboutMe = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (auth.payload) {
    const { id } = auth.payload.sub;
    const user = await dispatch(
      api.endpoints.getUserById.initiate({ _id: id })
    );
    console.log("userActionAboutMe", user);

    dispatch(authSlice.actions.aboutMe(user.data.UserFindOne));
  }
};

export const { setUserData } = authSlice.actions;
export const {
  getHipstagramFind,
  getHipstagramFindOne,
  useGetRootCatsQuery,
  useLoginMutation,
  useGetUserByIdQuery,
  useFullRegisterMutation,
} = api;
