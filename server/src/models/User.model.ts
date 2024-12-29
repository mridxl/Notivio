import mongoose, { Schema, Document } from 'mongoose';
import generateProfilePicture from '../utils/generateProfilePicture';

// Define interfaces for User Schema
export interface IUser extends Document {
  personalInfo: {
    fullname: string;
    email: string;
    passwordHash: string;
    username: string;
    bio?: string;
    profileImg?: string;
  };
  socialLinks?: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  accountInfo?: {
    totalPosts?: number;
    totalReads?: number;
  };
  blogs?: mongoose.Types.ObjectId[];
  joinedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    personalInfo: {
      fullname: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'fullname must be 3 letters long'],
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        // Custom email validation
        validate: {
          validator: function (v: string) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      passwordHash: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        minlength: [3, 'Username must be 3 letters long'],
        unique: true,
      },
      bio: {
        type: String,
        maxlength: [200, 'Bio should not be more than 200'],
        default: '',
      },
      profileImg: {
        type: String,
        default: generateProfilePicture,
      },
    },
    socialLinks: {
      youtube: {
        type: String,
        default: '',
      },
      instagram: {
        type: String,
        default: '',
      },
      facebook: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      github: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
    },
    accountInfo: {
      totalPosts: {
        type: Number,
        default: 0,
      },
      totalReads: {
        type: Number,
        default: 0,
      },
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: 'Blog',
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'joinedAt',
    },
  }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
