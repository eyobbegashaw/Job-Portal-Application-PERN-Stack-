import React, { useRef } from 'react';
import { FaCamera, FaUser } from 'react-icons/fa';

const ProfileImage = ({ imageUrl, name, onImageChange, editable = false, size = 'lg' }) => {
  const fileInputRef = useRef(null);

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
    xl: 'h-40 w-40'
  };

  const handleClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden ${
          editable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
        onClick={handleClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name || 'Profile'}
            className="h-full w-full object-cover"
          />
        ) : (
          <FaUser className={`${size === 'sm' ? 'h-8 w-8' : 'h-16 w-16'} text-gray-400`} />
        )}
      </div>

      {editable && (
        <>
          <button
            type="button"
            onClick={handleClick}
            className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-2 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <FaCamera className="h-4 w-4 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}

      {/* Initials fallback (if no image and name provided) */}
      {!imageUrl && name && (
        <div
          className={`${sizeClasses[size]} rounded-full bg-primary-600 flex items-center justify-center absolute inset-0 ${
            editable ? 'cursor-pointer' : ''
          }`}
          onClick={handleClick}
        >
          <span className={`${size === 'sm' ? 'text-xl' : 'text-3xl'} font-semibold text-white`}>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;