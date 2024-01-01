import { useEffect,useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate, useOutletContext ,useParams} from 'react-router-dom';
import parse from 'html-react-parser';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNews, fetchArticle } from '../../utilities/fetch';
import { removeBetween } from '../../utilities/common';
// import { addresses } from '../../utilities/config';
import { timeQuery } from '../../utilities/timeQuery';
import { StoryTile } from '../../compositions';
import { useSelector } from 'react-redux';
import { AFP_news, SPORSpot_News, video_play ,podcast, podcast_black, Video_black,Video_white,podcast_white} from '../../assets';
import { RootUrl } from '../../utilities/config';
import DataNotFound from '../../components/dataNotFound';

const topicSettings = {};

export const loader = ({ params }) => {
  return { params };
};

const AsideArticle = ({ tableInfo }) => {
  const addresses = useSelector(state => state.origin.apiOrigin)

  const [settingsInfo] = useOutletContext();


  const { params } = useLoaderData();
  const { state } = useLocation();
  // console.log(settingsInfo)
  // console.log(state)
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
                }}
              >
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
  const addresses = useSelector(state => state.origin.apiOrigin)
  const [status, setStatus] = useState('idle');
  const [articleInfo,setArticelInfo]=useState([]);
  const [isShowPodcastIcon, setisshowPodcaseIcon] = useState(null);
  const [isShowVideoIcon, setisShowVideoIcon] = useState(null);
  const { state } = useLocation();
  const articlevideo = useSelector((state) => state.origin.articlevideo);
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const { id } = useParams();
  // Now you can access the passed state values
  // const teamName = state?.topicName || null;
  // const topicKey = state?.topicKey || null;
  // const topictype =state?.topictype|| null;
  // const teamLogoPath = state?.LogoTeam ||  null;
  // const SubTopicId =state?.SubTopicId || null;
  // var IsSubtopicVideo =null ;

  // const linkPropsforhighlight = {
  //   to: IsSubtopicVideo ? '/videohighlights' : '/highlights',
  //   state: {
  //     topicKey,
  //     topictype,
  //     topicName: teamName,
  //     LogoTeam: teamLogoPath,
  //     SubTopicId: SubTopicId,
  //   },
  // };
  // const linkPropsforpodcast = {
  //   to: '/podcast',
  //   state: {
  //     topicKey,
  //     topictype,
  //     topicName: teamName,
  //     LogoTeam: teamLogoPath,
  //     SubTopicId: SubTopicId,
  //   },
  // };
  useEffect(() => {
    setStatus('pending');
    const fetchArticle = async () => {
      const articleUrl = `${addresses.baseUrl}/api/news/getNewsByTeamById?newsId=${id}&lang=sv`;
      try {
        const response = await fetch(articleUrl);
        if (response.status === 200) {
          const res = await response.json();

          if (res && res.length > 0) {
            console.log(res)
            setArticelInfo(res)
            console.log(articleInfo)

            // setVideoHighlightsData(sortedData);
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

  let imageUrl;
  console.log(articleInfo)
  console.log(articleInfo[0]?._id)

  if (articleInfo[0]>0 && articleInfo[0]?._id.length === 7) {
    imageUrl = AFP_news;
  } else {
    imageUrl = SPORSpot_News;
  }
  const days = () => {
    const timeDifference = timeQuery(articleInfo[0]._published); // Assuming timeQuery returns the difference in hours
    const day = Math.floor(timeDifference / 24);
    const hours = timeDifference % 24;

    if (timeDifference < 24) {
      return `${hours.toFixed(2)} Tim `; // Swedish for hours
    } else {
      return `${day} Dag  `; // Swedish for days
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
          {isDesktop === 'desktop' ? (
            <>
              <div className="main-body dark">
                <div className="row">
                  <div className="col-lg-8">
                    <main className={`article ${className}`.trim()}>
                      <div className="row">
                        <div className="col-11">
                          <h2 dangerouslySetInnerHTML={{ __html: articleInfo?._title }}></h2>
                        </div>
                        <div className="col-1">
                          <button
                            type="button"
                            class="btn text-light close-btn rounded-circle "
                            style={{ float: 'right', backgroundColor: '#333333' }}
                            onClick={() => navigate(-1)}>
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      </div>
                      <figure>
                        <img src={state.imgUrl} alt={state.imgUrl} />
                        <div class="main-article">
                          <div class="left-article">
                            <h6>
                              {days()}
                              <img src={imageUrl} alt="logo" />
                            </h6>
                          </div>
                          {/* <div class="right-article">
                            <Link {...linkPropsforhighlight}>
                              <div className="highlights">
                                <img src={video_play} style={{ height: '20px' }} />
                              </div>
                            </Link>
                          </div> */}
                        </div>
                        <hr />
                      </figure>
                      <p>
                        <ContentParsed content={articleInfo._content} />
                      </p>
                    </main>
                  </div>
                  <div className="col-lg-4">
                    <AsideArticle tableInfo={tableInfo} />
                  </div>
                </div>
              </div>
              {/* <AsideArticle /> */}
            </>
          ) : (
            <main className='article'>
              <div className="row">
                <div className="col-12">
                  <h2 dangerouslySetInnerHTML={{ __html: articleInfo[0]?._title }}></h2>
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
                <img src={addresses.baseUrl+articleInfo[0]?._medias[0]?.href} alt={addresses.baseUrl+articleInfo[0]?._medias[0]?.href} />
                <div class="main-article">
                  <div class="left-article">
                    <h6>
                      {days()}
                      <img src={imageUrl} alt="logo" />
                    </h6>
                  </div>
                  {/* <div class="right-article d-flex">
                  {isShowPodcastIcon && (
                    <Link {...linkPropsforpodcast} className="underline-hide">
                      <div className="highlights podcast-video">
                        <img src={podcast_black} style={{height:'20px',margin:'0'}}/>
                      </div>
                    </Link>
                  )}
                  {isShowVideoIcon && IsSubtopicVideo && (
                    <Link {...linkPropsforhighlight} className="underline-hide">
                      <div className="highlights podcast-video">
                        <img src={Video_black} style={{height:'20px',margin:'0'}} />
                      </div>
                    </Link>
                  )}
                  {!IsSubtopicVideo && (
                    <Link {...linkPropsforhighlight} className="underline-hide">
                      <div className="highlights podcast-video">
                        <img src={Video_black} style={{height:'20px',margin:'0'}}/>
                      </div>
                    </Link>
                  )}
                  </div> */}
                </div>
                <hr />
              </figure>
              <p className="artical-detail-box">
                <ContentParsed content={articleInfo[0]._content} />
              </p>
            </main>
          )}
        </>
      );
    case 'noDataFound':
      return <DataNotFound customMessage={"Article"} />;
    case 'error':
      return <div>Error occurred while fetching data</div>;
    default:
      return null;
  }

};

export default Article;
