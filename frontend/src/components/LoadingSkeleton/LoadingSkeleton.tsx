import React from 'react';
import './LoadingSkeleton.scss';

interface LoadingSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton skeleton--${variant}`}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
      aria-hidden="true"
    />
  ));

  return <>{skeletons}</>;
};

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <div className="recipe-card-skeleton" aria-hidden="true">
      <LoadingSkeleton variant="rectangular" height={231} />
      <div className="recipe-card-skeleton__content">
        <LoadingSkeleton variant="text" height={24} />
        <LoadingSkeleton variant="text" height={20} width="70%" />
        <div className="recipe-card-skeleton__meta">
          <LoadingSkeleton variant="rectangular" width={80} height={24} />
          <LoadingSkeleton variant="rectangular" width={100} height={24} />
        </div>
        <div className="recipe-card-skeleton__tags">
          <LoadingSkeleton variant="rectangular" width={60} height={20} />
          <LoadingSkeleton variant="rectangular" width={70} height={20} />
        </div>
      </div>
    </div>
  );
};
