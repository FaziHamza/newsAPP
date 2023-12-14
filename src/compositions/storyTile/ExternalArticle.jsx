import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaContext } from '../../utilities/mediaQuery';

const ExternalArticle = () => {
  const location = useLocation();
  const { state } = location;
  const isDesktop = useMediaContext();

  const Iframelink = state?.articleLink;
  return (
    <>
      {isDesktop === 'desktop' ? (
            <div >
            {/* <h1>Iframe Page</h1> */}
            <iframe
              title="External Content"
              src={Iframelink}
              style={{ height: '90vh', width: '100vw' }}
              // frameBorder="0"
            />
          </div>
      ) : (
          <div style={{paddingTop:'100px'}} >
            {/* <h1>Iframe Page</h1> */}
            <iframe
              title="External Content"
              src={Iframelink}
              style={{ height: '90vh', width: '100vw' }}
              // frameBorder="0"
            />
          </div>
      )}
    </>
  );
};

export default ExternalArticle;
