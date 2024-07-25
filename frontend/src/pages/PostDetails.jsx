import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";

import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    console.log('Posting comment:', comment);
    try {
      const res = await axios.post(
        `${URL}/api/comments/create`,
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      console.log('Comment posted:', res.data);
      fetchPostComments(); // Fetch the comments again
      setComment(''); // Clear the comment input field
    } catch (err) {
      console.error('Error posting comment:', err.response ? err.response.data : err.message);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      setComments(comments.filter(c => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
  <Navbar />
  {loader ? (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <Loader />
    </div>
  ) : (
    <div className="px-4 lg:px-0 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 leading-tight md:text-3xl">
          {post.title}
        </h1>
        {user?._id === post?.userId && (
          <div className="flex items-center space-x-2">
            <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)}>
              <BiEdit className="h-6 w-6"/>
            </p>
            <p className="cursor-pointer" onClick={handleDeletePost}>
              <MdDelete  className="h-6 w-6"/>
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>{post.username}</p>
        <div className="flex space-x-2">
          <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
        </div>
      </div>
      <img 
  src={IF + post.photo} 
  className="max-w-full h-64 object-contain rounded-lg shadow-lg mt-8 mx-auto border border-gray-300" 
  alt="" 
/>



      <p className="mt-8 text-gray-700 text-lg leading-relaxed">{post.description}</p>
      <div className="flex items-center mt-8 space-x-4 font-semibold">
        <p>Categories:</p>
        <div className="flex space-x-2">
          {post.categories?.map((c, i) => (
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-4 md:flex-row">
        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Write a comment"
          value={comment}
          className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
        />
       <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 hover:bg-green-400 hover:text-black transition-colors duration-300">Add Comment</button>

      </div>
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        {comments?.map((c) => (
          <Comment key={c._id} c={c} deleteComment={deleteComment} />
        ))}
      </div>
    </div>
  )}
</div>
  );
}

export default PostDetails;
