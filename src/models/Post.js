import mongoose from 'mongoose';

const postScheme = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postScheme);

export default Post;
