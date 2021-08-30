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
  USER_LIKEDVIDEO_FAIL,
  USER_LIKEDVIDEO_REQ,
  USER_LIKEDVIDEO_SUCCESS,
} from "../types";

import request from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });

    // console.log(res);
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory =
  (searchQuery) => async (dispatch, getState) => {
    try {
      dispatch({
        type: HOME_VIDEOS_REQUEST,
      });

      const reqParams = {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: searchQuery,
        type: "video",
      };

      if (searchQuery === "All") {
        reqParams["regionCode"] = "IN";
      }

      const { data } = await request("/search", {
        params: reqParams,
      });

      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: searchQuery,
        },
      });

      // console.log(res);
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: error.message,
      });
    }
  };

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQ,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });

    // console.log(data.items);

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQ,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosBySearch =
  (searchQuery) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEARCH_VIDEOS_REQ,
      });

      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: searchQuery,
          type: "video,channel",
        },
      });

      dispatch({
        type: SEARCH_VIDEOS_SUCCESS,
        payload: data.items,
      });

      // console.log(res);
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: SEARCH_VIDEOS_FAIL,
        payload: error.message,
      });
    }
  };

export const getUserSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CHANNEL_REQ,
    });

    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet, contentDetails",
        mine: true,
        maxResults: 20,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    // console.log(data);

    dispatch({
      type: SUBSCRIPTION_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByChannelId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEO_REQ,
    });

    // fetches, just the upload id of the channel
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id,
      },
    });

    // console.log(data);

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

    // Get actual videos
    const response = await request("/playlistItems", {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEO_SUCCESS,
      payload: response.data.items,
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: CHANNEL_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getUserLikedVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIKEDVIDEO_REQ,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        myRating: "like",
        maxResults: 20,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    // console.log(data.items);
    dispatch({
      type: USER_LIKEDVIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.error(error.message);

    dispatch({
      type: USER_LIKEDVIDEO_FAIL,
      payload: error.message,
    });
  }
};
