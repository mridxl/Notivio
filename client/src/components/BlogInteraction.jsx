import { useRecoilState, useRecoilValue } from 'recoil';
import blogPageAtom from '../common/states/blogPageAtom';
import userAtom from '../common/states/userAtom';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { likedByUserAtom } from '../pages/BlogPage';

export default function BlogInteraction() {
	const [blog, setBlog] = useRecoilState(blogPageAtom);
	const currentUser = useRecoilValue(userAtom);

	const {
		title,
		blog_id,
		author: {
			personal_info: { username },
		},
	} = blog;
	let { total_likes, total_comments } = blog.activity;
	const [isLiked, setIsLiked] = useRecoilState(likedByUserAtom);

	// const postLike = async () => {
	// 	console.log(blog.activity, !isLiked);

	// 	// const response = await api.post('/like-blog', {
	// 	// 	blog_id,
	// 	// 	likedByUser: !isLiked,
	// 	// });
	// 	return;
	// };

	const handleLike = async () => {
		if (!currentUser.isAuth || !currentUser.user?.username) {
			return toast.error('Please login to like the blog');
		}

		setIsLiked((prev) => !prev);
		!isLiked ? total_likes++ : total_likes--;

		// try {
		// 	await postLike();
		// } catch (error) {
		// 	toast.error('Failed to like the blog');
		// 	setIsLiked((prev) => !prev);
		// 	!isLiked ? total_likes-- : total_likes++;
		// }
		setBlog((prevBlog) => ({
			...prevBlog,
			activity: {
				...prevBlog.activity,
				total_likes,
			},
		}));
	};

	return (
		<>
			<Toaster />
			<hr className="border-grey my-2" />
			<div className="flex gap-6 justify-between">
				<div className="flex gap-3 items-center">
					<button
						className={
							'h-10 w-10 rounded-full flex items-center justify-center ' +
							(isLiked ? 'bg-red/20 text-red' : 'bg-grey/80')
						}
						onClick={handleLike}
					>
						<i className={`fi fi-${isLiked ? 'sr' : 'rr'}-heart pt-1`}></i>
					</button>
					<p className="text-xl text-dark-grey">{total_likes}</p>
					<button className="h-10 w-10 rounded-full flex items-center justify-center bg-grey/80">
						<i className="fi fi-rr-comment-dots pt-1"></i>
					</button>
					<p className="text-xl text-dark-grey">{total_comments}</p>
				</div>
				<div className="flex gap-6 items-center">
					{
						// If the current user is the author of the blog, show the edit button
						currentUser.isAuth && currentUser.user.username === username && (
							<Link to={`/editor/${blog_id}`}>
								<button className="h-10 w-20 rounded-full flex items-center justify-center bg-grey/80">
									<p className="underline hover:text-purple">Edit</p>
									<i className="fi fi-rr-edit pt-1 pl-2"></i>
								</button>
							</Link>
						)
					}
					{/* The space between Read and title is intential, it changes the tweet text. */}
					<Link
						to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
						target="_blank"
					>
						<button className="h-10 w-10 rounded-full flex items-center justify-center bg-grey/80  hover:text-twitter">
							<i className="fi fi-brands-twitter pt-1 text-xl"></i>
						</button>
					</Link>
				</div>
			</div>
			<hr className="border-grey my-2" />
		</>
	);
}
