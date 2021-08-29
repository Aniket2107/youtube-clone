import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import {
  homeVideoReducers,
  selectedVideoReduver,
  relatedVideoReducer,
  searchedVideosReducer,
  userSubscriptionReducer,
  channelVideosReducer,
} from "./reducers/videosReducer";

import { channelDetailsReducer } from "./reducers/channelReducer";

import { commentListReducer } from "./reducers/commentReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducers,
  selectedVideo: selectedVideoReduver,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  userSubscriptions: userSubscriptionReducer,
  channelVideos: channelVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
