import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    smallIntro: {
      type: String,
      required: true,
    },
    prepTime: {
      type: String,
      required: true,
    },
    prepLevel: {
      type: String,
      required: true,
    },
    serves: {
      type: String,
      required: true,
    },
    vegan: {
      type: Boolean,
      required: true,
      default: false,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    equipments: {
      type: [String],
      required: true,
    },
    nutrients: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL to the uploaded image
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },

  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
