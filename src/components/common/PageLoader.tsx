import React from 'react';

interface PageLoaderProps {
  isVisible?: boolean;
}

/**
 * PageLoader Component
 * Disabled as per user request ("remove loading") for instant, friction-free page rendering.
 */
export const PageLoader: React.FC<PageLoaderProps> = () => {
  return null;
};
