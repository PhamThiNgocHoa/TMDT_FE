import React from 'react';
import './Shimmer.css';

interface ShimmerProps {
  type?: 'card' | 'list' | 'avatar' | 'text' | 'product-card';
  count?: number;
  style?: React.CSSProperties;
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({ 
  type = 'card', 
  count = 8, 
  style,
  className = ''
}) => {
  const renderShimmer = () => {
    switch (type) {
      case 'avatar':
        return (
          <div className={`shimmer-avatar shimmer-bg ${className}`} style={style} />
        );
      case 'list':
        return (
          <div className={`shimmer-list shimmer-bg ${className}`} style={style} />
        );
      case 'text':
        return (
          <div className={`shimmer-text shimmer-bg ${className}`} style={style} />
        );
      case 'product-card':
        return (
          <div className={`product-card shimmer-card ${className}`}>
            <div className="product-image-container shimmer-bg" style={{height: 180, borderRadius: 8}} />
            <div className="product-info">
              <div className="shimmer-bg" style={{height: 20, width: '80%', margin: '8px 0', borderRadius: 4}} />
              <div className="shimmer-bg" style={{height: 16, width: '60%', borderRadius: 4}} />
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className={`shimmer-card ${className}`}>
            <div className="shimmer-bg" style={{ height: 180, borderRadius: 8 }} />
            <div className="shimmer-bg" style={{ height: 20, width: '80%', margin: '8px 0', borderRadius: 4 }} />
            <div className="shimmer-bg" style={{ height: 16, width: '60%', borderRadius: 4 }} />
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx}>{renderShimmer()}</div>
      ))}
    </>
  );
};

export default Shimmer; 