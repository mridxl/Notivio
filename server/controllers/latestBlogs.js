import Blog from '../models/Blog.js';
export default async function LatestBlogs(req, res) {
	const maxLimit = 5;
	try {
		const blogs = await Blog.find({ draft: false })
			.populate(
				'author',
				'personal_info.profile_img personal_info.fullname personal_info.username -_id'
			)
			.sort({ publishedAt: -1 })
			.limit(5)
			.select('blog_id title des banner activity tags publishedAt -_id')
			.limit(maxLimit);
		return res.json({ blogs });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
}
