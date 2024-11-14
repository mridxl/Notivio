import User from '../models/User.js';

export default async function updateProfileImg(req, res) {
	const userId = req.user;
	const { url } = req.body;

	try {
		const foundUser = await User.findById(userId);
		foundUser.personal_info.profile_img = url;
		await foundUser.save();
		res.status(200).json({ profile_img: url });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update profile image' });
	}
}
