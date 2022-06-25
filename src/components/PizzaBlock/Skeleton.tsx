import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={260}
      height={450}
      viewBox="0 0 260 450"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="128" cy="139" r="118" />
      <rect x="0" y="273" rx="10" ry="10" width="260" height="17" />
      <rect x="0" y="415" rx="10" ry="10" width="90" height="27" />
      <rect x="124" y="407" rx="10" ry="10" width="131" height="40" />
      <rect x="0" y="308" rx="10" ry="10" width="260" height="85" />
    </ContentLoader>
  );
};

export default Skeleton;
