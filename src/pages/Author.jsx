import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchAuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(data);
    setFollowers(data.followers);
    setIsLoading(false);
  }

  const updateFollowing = () => {
    if (!isFollowing) {
      setFollowers(followers + 1);
      setIsFollowing(true);
    } else {
      setFollowers(followers - 1);
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    fetchAuthorData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isLoading ? (
                        <>
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={100}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width={120} height={28} />
                              <span className="profile_username">
                                <Skeleton width={100} height={32} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={200} height={32} />
                              </span>
                              <Skeleton width={52} height={22.2} />
                            </h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <img src={authorData.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">
                                @{authorData.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {isLoading ? (
                        <>
                          <div className="profile_follower">
                            <Skeleton width={111} height={26} />
                          </div>
                          <Skeleton width={123} height={42} borderRadius={5} />
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers} Followers
                          </div>
                            <button className="btn-main" onClick={updateFollowing}>
                              {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
