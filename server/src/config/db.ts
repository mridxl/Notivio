import mongoose from 'mongoose';

export default async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
	} catch (error) {
		console.error(error);
	}
}
