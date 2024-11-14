import { useEffect, useRef, useState } from 'react';
import api from '../api/api';
import { profileInitialState } from './Profile';
import Loader from '../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import userAtom from '../common/states/userAtom';
import AnimationWrapper from '../common/pageAnimation';
import InputBox from '../components/InputBox';
import uploadCloudinaryImage from '../common/config/cloudinary';

export default function EditProfile() {
	const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
	const [loading, setLoading] = useState(true);
	const profileImgRef = useRef(null);
	const [updatedImg, setUpdatedImg] = useState(null);
	const [profile, setProfile] = useState(profileInitialState);
	const editFormRef = useRef(null);

	const { user } = loggedInUser;
	const {
		personal_info: {
			fullname,
			username: profile_username,
			profile_img,
			email,
			bio,
		},
		social_links,
	} = profile;

	const bioLimit = 200;
	const [characterLeft, setCharacterLeft] = useState(bioLimit - bio.length);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await api.get(`/get-profile?q=${user.username}`);
				setProfile(res.data.user);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		getUser();
	}, [user]);

	const handleCharacterChange = (e) => {
		setCharacterLeft(bioLimit - e.target.value.length);
	};

	const handleImagePreview = (e) => {
		profileImgRef.current.src = URL.createObjectURL(e.target.files[0]);
		setUpdatedImg(e.target.files[0]);
	};

	const handleImageUpload = async (e) => {
		e.preventDefault();
		if (!updatedImg) return;

		const loading = toast.loading('Uploading image...');
		e.target.setAttribute('disabled', true);

		const newImg = await uploadCloudinaryImage(updatedImg);
		if (!newImg) {
			toast.dismiss(loading);
			toast.error('Failed to upload image');
			return;
		}

		try {
			const { data } = await api.put('/update-profile-img', { url: newImg });
			const updatedUser = { ...user, profile_img: data.profile_img };
			setLoggedInUser({ ...loggedInUser, user: updatedUser });
			toast.dismiss(loading);
			toast.success('Image uploaded successfully');
			setUpdatedImg(null);
		} catch (error) {
			console.error(error);
			toast.dismiss(loading);
			toast.error('Failed to upload image');
		} finally {
			e.target.removeAttribute('disabled');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData(editFormRef.current);
		let formData = {};
		form.forEach((value, key) => {
			formData[key] = value;
		});
		// {
		//     "username": "ayush",
		//     "bio": "",
		//     "youtube": "",
		//     "instagram": "",
		//     "facebook": "",
		//     "twitter": "",
		//     "github": "",
		//     "website": ""
		// }
		const {
			username,
			bio,
			youtube,
			instagram,
			facebook,
			twitter,
			github,
			website,
		} = formData;

		if (!username.trim().length || username.length < 3) {
			toast.error('Username must be at least 3 characters long');
			return;
		}
		if (bio.length > bioLimit) {
			toast.error(`Bio must be less than ${bioLimit} characters`);
			return;
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<AnimationWrapper>
					<form ref={editFormRef}>
						<Toaster />
						<h1 className="text-xl font-medium max-md:hidden">Edit Profile</h1>
						<div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
							{/* Image Upload */}
							<div className="max-lg:center mb-5">
								<label
									htmlFor="uploadImg"
									id="profileImgLabel"
									className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
								>
									<div className="h-full w-full absolute top-0 left-0 flex items-center justify-center bg-black/60 text-white opacity-0 hover:opacity-100 cursor-pointer">
										Upload Image
									</div>
									<img
										src={profile_img}
										alt="profile image"
										ref={profileImgRef}
									/>
								</label>
								<input
									type="file"
									id="uploadImg"
									accept=".jpg, .png, .jpeg"
									hidden
									onChange={handleImagePreview}
								/>
								<button
									className="btn-light mt-5 max-lg:center lg:w-full px-10"
									onClick={handleImageUpload}
								>
									Upload
								</button>
							</div>

							{/* Form */}
							<div className="w-full">
								<div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
									<InputBox
										name="fullname"
										type="text"
										value={fullname}
										placeholder="Full Name"
										disable={true}
										icon="fi-rr-user"
									/>
									<InputBox
										name="email"
										type="email"
										value={email}
										placeholder="Email"
										disable={true}
										icon="fi-rr-envelope"
									/>
								</div>
								<InputBox
									name="username"
									type="text"
									value={profile_username}
									placeholder="Username"
									icon="fi-rr-at"
								/>
								<p className="-mt-3 text-dark-grey">
									Username will be used to search your profile and is visible to
									everyone.
								</p>
								<textarea
									name="bio"
									maxLength={bioLimit}
									defaultValue={bio}
									className="h-64 lg:h-40 resize-none input-box leading-7 pl-5 mt-5"
									onChange={handleCharacterChange}
								/>
								<p
									className={
										'text-dark-grey mt-1 ' +
										(characterLeft === 0 ? 'text-error' : '')
									}
								>
									{characterLeft} characters left
								</p>

								{/* Social Links */}
								<p className="my-6 text-dark-grey">
									Add your social links to make it easier for people to connect
								</p>
								<div className="md:grid md:grid-cols-2 gap-x-6">
									{Object.keys(social_links).map((key, i) => (
										<InputBox
											key={i}
											name={key}
											type="text"
											value={social_links[key]}
											placeholder="https://"
											icon={
												'fi ' +
												(key !== 'website' ? `fi-brands-${key}` : 'fi-rr-globe')
											}
										/>
									))}
								</div>
								<button
									className="btn-dark w-auto px-10"
									type="submit"
									onClick={handleSubmit}
								>
									Update
								</button>
							</div>
						</div>
					</form>
				</AnimationWrapper>
			)}
		</>
	);
}
