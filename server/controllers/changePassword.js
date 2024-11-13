import User from '../models/User.js';
import bcrypt from 'bcrypt';

export default async function changePassword(req, res) {
	try {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		const { currentPassword, newPassword } = req.body;
		const userId = req.user;

		// Validate password format
		if (
			!passwordRegex.test(newPassword) ||
			!passwordRegex.test(currentPassword)
		) {
			return res.status(403).json({
				error:
					'Password should be 6 to 20 characters long and contain at least one uppercase letter, one lowercase letter, and one digit',
			});
		}

		// Find user
		const user = await User.findOne({ _id: userId });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Verify current password
		const isMatch = await bcrypt.compare(
			currentPassword,
			user.personal_info.password
		);
		if (!isMatch) {
			return res.status(403).json({ error: 'Incorrect current password' });
		}

		// Hash new password
		const hash = await bcrypt.hash(newPassword, 10);

		// Update password in database
		await User.updateOne({ _id: userId }, { 'personal_info.password': hash });

		return res.status(200).json({ message: 'Password changed successfully' });
	} catch (error) {
		console.error('Password change error:', error);
		return res.status(500).json({
			error:
				'Some error occurred while changing the password. Try again later.',
		});
	}
}
