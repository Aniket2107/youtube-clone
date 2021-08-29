import {
  CHANNEL_VIDEO_FAIL,
  CHANNEL_VIDEO_REQ,
  CHANNEL_VIDEO_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQ,
  RELATED_VIDEO_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQ,
  SEARCH_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQ,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAIL,
  SUBSCRIPTION_CHANNEL_REQ,
  SUBSCRIPTION_CHANNEL_SUCCESS,
} from "../types";

const homeVideoInitialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  error: null,
  activeCategory: "All",
};

export const homeVideoReducers = (state = homeVideoInitialState, action) => {
  switch (action.type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };

    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

const selectedVideoInitialState = {
  video: null,
  loading: false,
  error: null,
};

export const selectedVideoReduver = (
  state = selectedVideoInitialState,
  action
) => {
  switch (action.type) {
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.payload,
      };

    case SELECTED_VIDEO_REQ:
      return {
        ...state,
        loading: true,
      };

    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const relatedVideoState = {
  videos: null,
  loading: false,
  error: null,
};

export const relatedVideoReducer = (state = relatedVideoState, action) => {
  switch (action.type) {
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };

    case RELATED_VIDEO_REQ:
      return {
        ...state,
        loading: true,
      };

    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const searchedVideosReducer = (state = relatedVideoState, action) => {
  switch (action.type) {
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };

    case SEARCH_VIDEOS_REQ:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const userSubInitialState = {
  channels: [],
  loading: false,
  error: null,
};

export const userSubscriptionReducer = (
  state = userSubInitialState,
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        channels: action.payload,
      };

    case SUBSCRIPTION_CHANNEL_REQ:
      return {
        ...state,
        loading: true,
      };

    case SUBSCRIPTION_CHANNEL_FAIL:
      return {
        ...state,
        channels: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const channelVideosReducer = (state = relatedVideoState, action) => {
  switch (action.type) {
    case CHANNEL_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };

    case CHANNEL_VIDEO_REQ:
      return {
        ...state,
        loading: true,
      };

    case CHANNEL_VIDEO_FAIL:
      return {
        ...state,
        videos: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
