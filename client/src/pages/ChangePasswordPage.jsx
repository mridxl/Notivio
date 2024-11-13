import { useRef } from 'react';
import AnimationWrapper from '../common/pageAnimation';
import InputBox from '../components/InputBox';
import { Toaster, toast } from 'react-hot-toast';
import api from '../api/api';

export default function ChangePasswordPage() {
	const changePwdForm = useRef(null);
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(changePwdForm.current);

		let formData = {};
		form.forEach((value, key) => {
			formData[key] = value;
		});

		const { currentPassword, newPassword, confirmPassword } = formData;

		if (!currentPassword || !newPassword || !confirmPassword) {
			toast.error('All fields are required');
			return;
		}

		if (
			passwordRegex.test(newPassword) === false ||
			passwordRegex.test(currentPassword) === false
		) {
			toast.error(
				'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
			);
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		e.target.setAttribute('disabled', true);
		let loading = toast.loading('Changing password...');
		try {
			await api.put('/change-password', {
				currentPassword,
				newPassword,
			});
			toast.dismiss(loading);
			toast.success('Password changed successfully');
		} catch (error) {
			toast.dismiss(loading);
			toast.error(error.response.data.error);
		} finally {
			e.target.removeAttribute('disabled');
		}
	};

	return (
		<AnimationWrapper>
			<Toaster />
			<form ref={changePwdForm}>
				<h1 className="max-md:hidden text-xl font-medium">Change Password</h1>
				<div className="py-10 w-full max-w-[400px]">
					<InputBox
						name="currentPassword"
						type="password"
						className="profile-edit-input"
						icon="fi fi-rr-unlock"
						placeholder="Current Password"
					/>
					<InputBox
						name="newPassword"
						type="password"
						className="profile-edit-input"
						icon="fi fi-rr-unlock"
						placeholder="New Password"
					/>
					<InputBox
						name="confirmPassword"
						type="password"
						className="profile-edit-input"
						icon="fi fi-rr-unlock"
						placeholder="Confirm Password"
					/>
					<button
						className="btn-dark px-10"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Change Password
					</button>
				</div>
			</form>
		</AnimationWrapper>
	);
}
