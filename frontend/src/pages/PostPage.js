import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"; 
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null); 
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            if (!response.ok) { 
                console.error('Failed to fetch post:', response.statusText);
                setPostInfo(null); 
                return;
            }
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [id]); 

    async function handleDeletePost() {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return; 
        }

        try {
            const response = await fetch(`http://localhost:4000/post/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
            });

            if (response.ok) {
                alert('Post deleted successfully!');
                navigate('/'); 
            } else {
                const errorData = await response.json(); 
                alert(`Failed to delete post: ${errorData.message || response.statusText}`); 
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An error occurred while deleting the post.');
        }
    }

    if (!postInfo) return 'Loading...'; 

    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo?.id === postInfo.author._id && ( 
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                    <button className="delete-btn" onClick={handleDeletePost}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0-.352-9m1.54-9a.75.75 0 0 0-.75.75V5.25h-3a.75.75 0 0 0 0 1.5h3v9a2.25 2.25 0 0 0 2.25 2.25h5.25a2.25 2.25 0 0 0 2.25-2.25v-9h3a.75.75 0 0 0 0-1.5h-3V5.25a.75.75 0 0 0-.75-.75h-7.5ZM5.25 5.25c0-.414.336-.75.75-.75h12a.75.75 0 0 1 .75.75v1.5h-13.5v-1.5Z" />
                        </svg>
                        Delete this post
                    </button>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}