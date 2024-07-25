import React from 'react';
import { IF } from '../url';

function HomePosts({ post }) {
  
  const imageUrl = post.photo.startsWith('http') ? post.photo : `${IF}${post.photo}`;
  console.log("Post Object:", post);
  console.log("Image URL:", imageUrl);

  return (
    <div className="w-full flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
      {/* Left */}
      <div className="w-full md:w-[35%] h-[200px] flex justify-center items-center transition-transform duration-300 hover:scale-105">
        <img src={imageUrl} alt="Post" className="h-full w-full object-cover rounded-lg shadow-lg" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-full md:w-[65%] bg-slate-500C1CAD6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <h1 className="text-2xl font-bold mb-2 md:mb-4 text-gray-800 hover:text-yellow-500 transition-colors duration-300">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row mb-4 text-sm font-semibold text-gray-500 items-start md:items-center justify-between">
          <p className="mb-1 md:mb-0">{post.username}</p>
          <div className="flex space-x-2 text-sm p-3">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg text-gray-700">
  {post.description ? (
    <>
      {post.description.slice(0, 200)} 
      <span className="text-blue-500 cursor-pointer hover:underline">
        ...Read more
      </span>
    </>
  ) : (
    "Description not available"
  )}
</p>
      </div>
    </div>
  );
  
  
}

export default HomePosts;
