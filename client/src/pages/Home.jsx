import { useEffect, useState } from 'react';
import { unsecureApi } from '../api/api';
import AnimationWrapper from '../common/pageAnimation';
import Loader from '../components/Loader';
import BlogPostCard from '../components/BlogPost';
import InpageNavigation from '../components/InpageNavigation';
import MinimalBlogCard from '../components/NoBannerBlogPost';

export default function Home() {
	const [blogs, setBlogs] = useState(null);
	const [trendingBlogs, setTrendingBlogs] = useState(null);

	const categories = [
		'Tech',
		'Science',
		'Politics',
		'Sports',
		'Entertainment',
		'Food',
		'Bollywood',
	];

	const fetchBlogs = async () => {
		try {
			const res = await unsecureApi('/latest-blogs');
			setBlogs(res.data.blogs);
		} catch (err) {
			console.log(err);
		}
	};
	const fetchTrendingBlogs = async () => {
		try {
			const res = await unsecureApi('/trending-blogs');
			setTrendingBlogs(res.data.blogs);
		} catch (err) {
			console.log(err);
		}
	};
	const loadBlogByCat = async (e) => {
		const category = e.target.innerText.toLowerCase();

		try {
			const res = await unsecureApi(`/category/${category}`);
			setBlogs(res.data.blogs);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchBlogs();
		fetchTrendingBlogs();
	}, []);

	return (
		<AnimationWrapper>
			<section className="h-cover flex justify-center gap-10">
				{/* Latest Blogs */}
				<div className="w-full">
					<InpageNavigation
						routes={['home', 'trending blogs']}
						defaultHidden={['trending blogs']}
					>
						<>
							{blogs === null ? (
								<Loader />
							) : (
								blogs.map((blog, i) => (
									<AnimationWrapper
										transition={{ duration: 1, delay: i * 0.05 }}
										key={i}
									>
										<BlogPostCard
											content={blog}
											author={blog.author.personal_info}
										/>
									</AnimationWrapper>
								))
							)}
						</>

						<>
							{trendingBlogs === null ? (
								<Loader />
							) : (
								trendingBlogs.map((trendingBlog, i) => (
									<AnimationWrapper
										key={i}
										transition={{ duration: 1, delay: i * 0.05 }}
									>
										<MinimalBlogCard blog={trendingBlog} index={i} />
									</AnimationWrapper>
								))
							)}
						</>
					</InpageNavigation>
				</div>

				{/* Filters and trending blogs */}
				<div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
					<div className="flex flex-col gap-10">
						<div>
							<h1 className="text-xl font-medium mb-8">
								Stories from all interests
							</h1>
							<div className="flex gap-3 flex-wrap">
								{categories.map((category, i) => (
									<button key={i} className="tag" onClick={loadBlogByCat}>
										{category}
									</button>
								))}
							</div>
						</div>

						<div>
							<h1 className="font-medium text-xl mb-8">
								Trending <i className="fi fi-rr-arrow-trend-up"></i>
							</h1>

							<>
								{trendingBlogs === null ? (
									<Loader />
								) : (
									trendingBlogs.map((trendingBlog, i) => (
										<AnimationWrapper
											key={i}
											transition={{ duration: 1, delay: i * 0.05 }}
										>
											<MinimalBlogCard blog={trendingBlog} index={i} />
										</AnimationWrapper>
									))
								)}
							</>
						</div>
					</div>
				</div>
			</section>
		</AnimationWrapper>
	);
}
