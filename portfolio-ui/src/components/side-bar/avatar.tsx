'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  className = '',
} : AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs rounded-lg',
    md: 'w-12 h-12 text-sm rounded-xl',
    lg: 'w-16 h-16 text-base rounded-2xl',
    xl: 'w-35 h-30 text-xl rounded-3xl',
  };

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  const showFallback = !src || imgError;
  const initials = fallback || alt.slice(0, 2).toUpperCase();

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} overflow-hidden flex items-center justify-center bg-linear-to-br from-blue-400 to-purple-500 text-white font-semibold`}
      >
        {showFallback ? (
          <span>{initials}</span>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={sizePixels[size]}
            height={sizePixels[size]}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusClasses[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
};

export { Avatar };
export type { AvatarProps };