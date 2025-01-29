

import React, { useState } from 'react';
import { Heart, User, ChevronDown, ChevronUp } from 'lucide-react';

const BlogLikes = ({ likes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!likes || likes.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-bold">No likes yet</h2>
        </div>
        <p className="text-gray-500">Be the first one to like this post!</p>
      </div>
    );
  }

  // Get first 3 likes for preview
  const previewLikes = likes.slice(0, 2);
  const remainingLikesCount = likes.length - 2;

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Header section */}
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          <h2 className="text-xl font-bold">
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </h2>
        </div>
        {likes.length > 3 && (
          <button className="text-gray-500 hover:text-gray-700">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Preview section (always visible) */}
      <div className="space-y-3">
        {previewLikes.map((like) => (
          <div
            key={like?.user?._id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{like?.name}</p>
              <p className="text-sm text-gray-500">{like?.user?.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Expandable section */}
      {remainingLikesCount > 0 && (
        <div className="mt-3">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              View {remainingLikesCount} more {remainingLikesCount === 1 ? 'like' : 'likes'}
            </button>
          ) : (
            <div className="space-y-3 mt-3 pt-3 border-t">
              {likes.slice(2).map((like) => (
                <div
                  key={like?.user?._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{like?.user?.name}</p>
                    <p className="text-sm text-gray-500">{like?.user?.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogLikes;