import {
  ADD_POST,
  LOADING_POSTS,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
} from "../constants";

const initialState = {
  list: null,
  loading: false,
  post: null,
  update: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case DELETE_POST: {
      return {
        ...state,
        posts: state.list.filter(({ _id }) => _id !== action.id),
      };
    }

    case UPDATE_POST:
      return {
        ...state,
        posts: state.list.filter((post) => post.postData !== action.postData),
      };

    /*state.list.map((post) => post.postData !== action.postData);
      state.list.concat(action.payload);
      return {
        ...state,
      };*/
    /*return state.list.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            text: action.postData,
          };
        } else return post;
      });*/

    default:
      return state;
  }
}

//PRIMJERI

/*state.project.map(item=> 
           (item._id===action.payload._id) ? action.payload.data:item ) */

/*case EDIT_POST: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.id) {
            return {
              ...post,
              text: action.text,
              author: action.author
            };
          }
          return post;
        })
      };
    } */
