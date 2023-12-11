import React from 'react';

const Iframe = ({ iframeUrl }) => {
  return (
    <div>
      <h1>Iframe Page</h1>
      <iframe
        title="External Content"
        src={iframeUrl}
        width="800"
        height="600"
        frameBorder="0"
      />
    </div>
  );
};

export default Iframe;
