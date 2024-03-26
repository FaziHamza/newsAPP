import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import parse from 'html-react-parser';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNews, fetchArticle } from '../../utilities/fetch';
import { removeBetween } from '../../utilities/common';
// import { addresses } from '../../utilities/config';
import { timeQuery } from '../../utilities/timeQuery';
import { StoryTile } from '../../compositions';
import { useSelector } from 'react-redux';
import {
  AFP_news,
  SPORSpot_News,
  video_play,
  podcast,
  podcast_black,
  Video_black,
  Video_white,
  podcast_white,
  appstore,
  googleplay,
  articlefootericon,
} from '../../assets';
import { RootUrl } from '../../utilities/config';
import DataNotFound from '../../components/dataNotFound';

const topicSettings = {};

export const loader = ({ params }) => {
  return { params };
};

const AsideArticle = ({ tableInfo }) => {
  const addresses = useSelector((state) => state.origin.apiOrigin);

  const [settingsInfo] = useOutletContext();

  const { params } = useLoaderData();
  const { state } = useLocation();
  // console.logtableInfo);
  // // console.logstate)
  return (
    <aside className="aside-right">
      {tableInfo
        ?.filter((item) => item._id !== params.id)
        ?.slice(0, 8)
        ?.map((tileItem) => {
          return (
            <>
              <Link
                className="story-link"
                to={`/${params.type}/${params.topic}/${tileItem._id}`}
                // to={`../${urlPrefix}${tileItem._id}`}
                relative="path"
                key={tileItem._id}
                state={{
                  ...state,
                  articleInfo: state.articleInfo,
                  tableInfo: state.tableInfo,
                  baseUrl: addresses.baseUrl + settingsInfo.Api,
                  imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                }}>
                <StoryTile
                  idforlogo={tileItem._id}
                  description={tileItem._abstract}
                  className={'tile-m'}
                  src={addresses.baseUrl + '/' + tileItem._medias[0].href}
                  alt={tileItem._medias[0].href}
                />
              </Link>
              <div className="divider-container">
                <hr className="divider-solid" />
              </div>
            </>
          );
        })}
    </aside>
  );
};

const Article = ({ className = '' }) => {
  const addresses = useSelector((state) => state.origin.apiOrigin);
  const [status, setStatus] = useState('idle');
  const [articleInfo, setArticelInfo] = useState([]);
  const [allarticleInfo, setAllArticelInfo] = useState([]);
  const [isShowPodcastIcon, setisshowPodcaseIcon] = useState(null);
  const [isShowVideoIcon, setisShowVideoIcon] = useState(null);
  const [imageUrl, setimageUrl] = useState('');
  const { state } = useLocation();
  // console.logstate);
  const articlevideo = useSelector((state) => state.origin.articlevideo);
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const { id } = useParams();
  const teamName = state?.topicName || articlevideo[0]?.name;
  const topicKey = state?.topicKey || articlevideo[0]?.highlights;
  const topictype = state?.topictype || articlevideo[0]?.highlightType;
  const teamLogoPath = state?.LogoTeam || articlevideo[0]?.logo;
  const SubTopicId = state?.SubTopicId || articlevideo[0]?.subTopicID;
  var IsSubtopicVideo = articlevideo[0]?.isSubtopicVideo;
  const linkPropsforhighlight = {
    to: IsSubtopicVideo ? '/videohighlights' : '/highlights',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      SubTopicId: SubTopicId,
    },
  };
  const linkPropsforpodcast = {
    to: '/podcast',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      SubTopicId: SubTopicId,
    },
  };
  // console.loglinkPropsforhighlight);
  // var imageUrl ="logo";
  useEffect(() => {
    document.body.className = 'light-theme';
    setStatus('pending');
    const fetchArticle = async () => {
      const articleUrl = `${addresses.baseUrl}/api/news/getNewsByTeamById?newsId=${id}&lang=sv`;
      try {
        const response = await fetch(articleUrl);
        if (response.status === 200) {
          const res = await response.json();

          if (res && res.length > 0) {
            const apiUrl = `${RootUrl.Baseurl}api/Subtopic/GetVideoStatusBySubtopicId?id=${SubTopicId}`;
            fetch(apiUrl)
              .then((res) => res.json())
              .then((response) => {
                setisshowPodcaseIcon(response.data.videoPodcast);
                setisShowVideoIcon(response.data.videoHighlight);
              })
              .catch((err) => {
                // console.log'Error', err);
              });
            setArticelInfo(res);
            if (res[0]?._id.length === 7) {
              setimageUrl(AFP_news);
            } else {
              setimageUrl(SPORSpot_News);

            }
            setStatus('resolved');
          } else {
            setArticelInfo([]); // Set an empty array or handle it as needed
            setStatus('noDataFound');
          }
        } else {
          console.error(`HTTP Error: ${response.status}`);
          setStatus('error');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };
    const fetchAllArticle = async () => {
      const allarticleUrl = `${addresses.baseUrl}/api/news/getNewsByTeam?keyword=${addresses.siteKeyword}&lang=${addresses.siteLang}&sport=football&limit=${addresses.siteLimit}`;
      try {
        const response = await fetch(allarticleUrl);
        if (response.status === 200) {
          const res = await response.json();

          if (res && res.length > 0) {
            setAllArticelInfo(res);
            // setStatus('resolved');
          } else {
            setAllArticelInfo([]); // Set an empty array or handle it as needed
            // setStatus('noDataFound');
          }
        } else {
          console.error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllArticle();
    fetchArticle();
  }, []);
  const isDesktop = useMediaContext();
  // const { state } = useLocation();
  const navigate = useNavigate();
  const ContentParsed = ({ content = 'Text Missing' }) => {
    const parsedContent = parse(removeBetween(content, 'style="', '"'));

    return <>{parsedContent}</>;
  };

  // const { articleInfo, tableInfo } = state;



  const days = () => {
    // const timeDifference = timeQuery(articleInfo[0]._published); // Assuming timeQuery returns the difference in hours
    // const day = Math.floor(timeDifference / 24);
    // const hours = timeDifference % 24;

    // if (timeDifference < 24) {
    //   return `${hours.toFixed(2)} Tim `; // Swedish for hours
    // } else {
    //   return `${day} Dag  `; // Swedish for days
    // }
    const timeDifference = timeQuery(articleInfo[0]._published); // Assuming timeQuery returns the difference in hours
    const days = Math.floor(timeDifference / 24);
    const hours = Math.floor(timeDifference % 24);
    const minutes = Math.floor((timeDifference % 1) * 60);

    if (timeDifference < 1) {
      return `${minutes} Min`; // Swedish for minutes
    } else if (timeDifference < 24) {
      return `${hours} Tim`; // Swedish for hours
    } else {
      return `${days} Dag`; // Swedish for days
    }
  };
  const onShareApi = async () => {
    try {
      await navigator.share({
        title: 'Atricle',
        text: articleInfo[0]._title,
        url: window.location.href,
      });
    } catch (e) {
      // console.log'e: ', e);
    }
  };

  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return (
        <main>
          <div className="pending">loading</div>
        </main>
      );
    case 'resolved':
      return (
        <>
          <Helmet>
            <title>{articleInfo[0]?._title}</title>
            <meta data-react-helmet="true" property="og:image:width" content="1200" />
            <meta data-react-helmet="true" property="og:image:height" content="628" />

            <meta data-react-helmet="true" property="og:title" content={articleInfo[0]?._title} />
            <meta
              data-react-helmet="true"
              property="og:image"
              content={articleInfo[0]?._medias[1]?.href}
            />
            <meta data-react-helmet="true" property="og:image:width" content="1200" />
            <meta data-react-helmet="true" property="og:image:height" content="628" />

            <meta property="og:image:alt" content={articleInfo[0]?._medias[1]?.href} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:description" content={articleInfo[0]?._abstract} />
            {/* Add more OG tags as needed */}
          </Helmet>
          {isDesktop === 'desktop' ? (
            <>
              <main className="article">
                <div className="row">
                  <div className="col-12">
                    <h2
                      id="article-headline"
                      dangerouslySetInnerHTML={{ __html: articleInfo[0]?._title }}></h2>
                  </div>
                  {/* <div className="col-1">
                  <button
                    type="button"
                    class="btn text-light close-btn rounded-circle "
                    style={{ float: 'right' }}
                    onClick={() => navigate(-1)}>
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div> */}
                </div>
                <figure className="artical-detail">
                  <img
                    id="articalImageMobileView"
                    src={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                    alt={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                  />
                  {/* <img id="myImg" style={{display:'none'}}
                  src={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                  alt={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                /> */}
                  <div className="main-article">
                    <div className="left-article">
                      <h6>
                        {days()}
                        {/* <img src={imageUrl} alt="logo" /> */}
                      </h6>
                    </div>
                    <div className="right-article d-flex">
                      {isShowPodcastIcon && (
                        <Link {...linkPropsforpodcast} className="underline-hide">
                          <div className="highlights podcast-video">
                            <img src={podcast_black} style={{ height: '20px', margin: '0' }} />
                          </div>
                        </Link>
                      )}
                      {isShowVideoIcon && IsSubtopicVideo && (
                        <Link {...linkPropsforhighlight} className="underline-hide">
                          <div className="highlights podcast-video">
                            <img src={Video_black} style={{ height: '20px', margin: '0' }} />
                          </div>
                        </Link>
                      )}
                      {!IsSubtopicVideo && (
                        <Link {...linkPropsforhighlight} className="underline-hide">
                          <div className="highlights podcast-video">
                            <img src={Video_black} style={{ height: '20px', margin: '0' }} />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                  <hr />
                </figure>
                <p className="artical-detail-box">
                  <ContentParsed content={articleInfo[0]._content} />
                </p>
              </main>
              {/* <AsideArticle /> */}
            </>
          ) : (
            <main className="article">
              <div className="row">
                <div className="col-12">
                  <h2
                    id="article-headline"
                    dangerouslySetInnerHTML={{ __html: articleInfo[0]?._title }}></h2>
                </div>
                {/* <div className="col-1">
                  <button
                    type="button"
                    class="btn text-light close-btn rounded-circle "
                    style={{ float: 'right' }}
                    onClick={() => navigate(-1)}>
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div> */}
              </div>
              <figure className="artical-detail">
                <img
                  id="articalImageMobileView"
                  src={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                  alt={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                />
                <p className='text-end mb-0' id="article-photographyBy" style={{ fontSize: "10px" }}>
                  {articleInfo[0]?._Type}
                  {articleInfo[0]?._Creator ? `: ${articleInfo[0]?._Creator}` : ''}
                </p>
                {/* <img id="myImg" style={{display:'none'}}
                  src={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                  alt={addresses.baseUrl + articleInfo[0]?._medias[0]?.href}
                /> */}
                <div className="main-article">
                  <div className="left-article">
                    <h6>
                      {days()}
                      <img src={imageUrl} alt={imageUrl} />
                    </h6>
                  </div>
                  <div className="right-article d-flex">
                    {isShowPodcastIcon && (
                      <Link {...linkPropsforpodcast} className="underline-hide">
                        <div className="highlights podcast-video">
                          <img src={podcast_black} style={{ height: '20px', margin: '0' }} />
                        </div>
                      </Link>
                    )}
                    {isShowVideoIcon && IsSubtopicVideo && (
                      <Link {...linkPropsforhighlight} className="underline-hide">
                        <div className="highlights podcast-video">
                          <img src={Video_black} style={{ height: '20px', margin: '0' }} />
                        </div>
                      </Link>
                    )}
                    {!IsSubtopicVideo && (
                      <Link {...linkPropsforhighlight} className="underline-hide">
                        <div className="highlights podcast-video">
                          <img src={Video_black} style={{ height: '20px', margin: '0' }} />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
                <hr />
              </figure>
              <p className="artical-detail-box">
                <ContentParsed content={articleInfo[0]._content} />
              </p>
              <div className="article-footer">
                <div className="article-footer-right">
                  <div className='row'>
                    <div className='col-6'>
                      <a target='_blank' href="https://apps.apple.com/se/app/sportblitz/id6475697031?itsct=apps_box_link&itscg=30200">
                        <div className="app-store">
                          <img src={appstore} />
                        </div>
                      </a>
                    </div>
                    <div className='col-6'>
                      <a target='_blank' href="https://play.google.com/store/apps/details?id=com.sportblitz">
                        <div className="google-play">
                          <img src={googleplay} />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="artile-footer-left">
                 
                  <div className='row'>
                    <div className="col-12">
                      <div className='artile-footer-left-div' >
                        <p className='mini-text' >Ansvarig utgivare</p>
                        <p>Camilla Larsson</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className='artile-footer-left-div-II' >
                        <p className='mini-text' >  E-post</p>
                        <div className="email">
                          <p className='emailText' >camilla.larsson@sportblitznews.com</p>
                          <i class="fa-sharp fa-light fa-envelope"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className='artile-footer-left-div-III'>
                      <p className='copuRight' >&#169;</p>
                      <p>ItzyBiltz Media AB</p>
                    </div>
                  </div>
                  {/* <p>FÅ SENASTE NYHETERNA, VIDEOR OCH PODCASTS DIREKT I MOBILEN UTAN KOSTNAD</p> */}
                </div>
              </div>
            </main>
          )}
        </>
      );
    case 'noDataFound':
      return <DataNotFound customMessage={'Article'} />;
    case 'error':
      return <DataNotFound customMessage={'Error occurred while fetching data'} />;
    default:
      return null;
  }
};

export default Article;
