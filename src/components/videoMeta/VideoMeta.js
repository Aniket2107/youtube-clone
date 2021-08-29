import React, { useEffect } from "react";

import numeral from "numeral";
import moment from "moment";

import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";

import { useDispatch, useSelector } from "react-redux";

import "./_videoMeta.scss";
import {
  checkSubscription,
  getChannelDetails,
} from "../../redux/actions/channelActions";

const VideoMeta = ({ video, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } =
    video?.snippet;
  const { viewCount, likeCount, dislikeCount } = video?.statistics;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscription(channelId));
  }, [dispatch, channelId]);

  const data = useSelector((state) => state.channelDetails);

  if (!data || !data.channel || !data.channel.snippet) {
    return <h3>Loading.....</h3>;
  }

  const { snippet: channelSnippet, statistics: channelStatistics } =
    data.channel;

  const isSubscribed = data.subscriptionStatus;

  return (
    <div className="videoMetaData pb-3">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{"  "}
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="m-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>

            <span className="mr-3">
              <MdThumbDown size={26} />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt="channel-thumbnail"
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column px-2">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button
          className={`btn border-0 p-2 m-2 ${isSubscribed ? "btn-gray" : ""}`}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMeta;
