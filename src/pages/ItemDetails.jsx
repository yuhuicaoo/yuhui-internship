import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchItemData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItemData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {!isLoading ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {itemData.title} #{itemData.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemData.likes}
                        </div>
                      </div>
                      <p>{itemData.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemData.ownerId}`}>
                                {itemData.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemData.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemData.creatorId}`}>
                                {itemData.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width={600} height={600} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width={350} height={46} />

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <Skeleton width={80} height={30} />
                        </div>
                        <div className="item_info_like">
                          <Skeleton width={80} height={30} />
                        </div>
                      </div>
                      <Skeleton width={620} height={80} />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <>
                                <Skeleton
                                  width={50}
                                  height={50}
                                  borderRadius={100}
                                />
                                <i className="fa fa-check"></i>
                              </>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={85} height={20} />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <>
                                <Skeleton
                                  width={50}
                                  height={50}
                                  borderRadius={100}
                                />
                                <i className="fa fa-check"></i>
                              </>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={85} height={20} />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width={25} height={25} />
                          <span>
                            <Skeleton width={60} height={35} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
