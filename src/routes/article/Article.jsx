import { useEffect } from 'react';
import { Link, useLoaderData, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import parse from 'html-react-parser';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNews, fetchArticle } from '../../utilities/fetch';
import { removeBetween } from '../../utilities/common';
import { addresses } from '../../utilities/config';

import { StoryTile } from '../../compositions';
import { useSelector } from 'react-redux';

const topicSettings = {};

export const loader = ({ params }) => {
  return { params };
};

const AsideArticle = ({ tableInfo }) => {
  const origin  = useSelector(state=> state?.origin?.selectedOrigin)
  const [settingsInfo] = useOutletContext();
  const { params } = useLoaderData();
  const { state } = useLocation();
  // console.log(params);

  return (
    <aside className="aside-right">
      {tableInfo?.filter(item => item._id !== params.id)?.slice(0, 8)?.map((tileItem) => {
        return (
          <>
            <Link
              className="story-link"
              to={`/${params.type}/${params.topic}/${tileItem._id}`}
              // to={`../${urlPrefix}${tileItem._id}`}
              relative="path"
              key={tileItem._id}
              state={{ ...state,
                articleInfo: state.articleInfo,
                tableInfo: state.tableInfo,
                baseUrl: origin.baseUrl + settingsInfo.Api,
                imgUrl: origin.baseUrl + tileItem._medias[0].href,
              }}
              >
            <StoryTile
              description={tileItem._abstract}
              className={'tile-m'}
              src={origin.baseUrl + '/' + tileItem._medias[0].href}
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
  const isDesktop = useMediaContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const ContentParsed = ({ content = 'Text Missing' }) => {
    const parsedContent = parse(removeBetween(content, 'style="', '"'));

    return <>{parsedContent}</>;
  };

  const { articleInfo, tableInfo } = state;
  return (
    <>
      {isDesktop === 'desktop' ? (
        <>
          <div className='main-body dark'>
            <div className='row'>
              <div className='col-lg-8'>
                <main className={`article ${className}`.trim()}>
                  <div className='row'>
                    <div className='col-11'>
                      <h2 dangerouslySetInnerHTML={{ __html: articleInfo?._title }}></h2>
                    </div>
                    <div className='col-1'>
                      <button type="button" class="btn text-light close-btn rounded-circle " style={{ float: 'right', backgroundColor: '#333333' }} onClick={() => navigate(-1)}>
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                  <figure>
                    <img src={state.imgUrl} alt={state.imgUrl} />
                  </figure>
                  <p>
                    <ContentParsed content={articleInfo._content} />
                  </p>
                </main>
              </div>
              <div className='col-lg-4'>
                <AsideArticle tableInfo={tableInfo} />
              </div>
            </div>

          </div>
          {/* <AsideArticle /> */}
        </>
      ) : (
        <main className={`article ${className}`.trim()}>
          <div className='row'>
            <div className='col-11'>
              <h2 dangerouslySetInnerHTML={{ __html: articleInfo?._title }}></h2>
            </div>
            <div className='col-1'>
              <button type="button" class="btn text-light close-btn rounded-circle " style={{ float: 'right' }} onClick={() => navigate(-1)}>
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <figure className='artical-detail'>
            <img src={state.imgUrl} alt={state.imgUrl} />
          </figure>
          <p className='artical-detail-box'>
            <ContentParsed content={articleInfo._content} />
          </p>
        </main>
      )}
    </>
  );
};

export default Article;
