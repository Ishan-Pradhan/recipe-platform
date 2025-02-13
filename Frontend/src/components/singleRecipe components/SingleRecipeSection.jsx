import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteSavedRecipe, saveRecipe } from "../../redux/user/userSlice";
import api from "../../utils/api";

const SingleRecipeSection = ({ recipe }) => {
  const [comments, setComments] = useState(recipe.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.data?.user?.savedRecipes) {
      setIsSaved(currentUser.data.user.savedRecipes.includes(recipe._id));
    }
  }, [currentUser?.data?.user?.savedRecipes, recipe._id, newComment]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (currentUser?.data?.user?._id) {
        try {
          const response = await api.get(
            `/recipes/savedstatus/${currentUser.data.user._id}/${recipe._id}`
          );
          console.log(currentUser.data.accessToken);

          const { isSaved } = response.data;
          setIsSaved(isSaved);
        } catch (error) {
          console.error("Error checking saved status:", error);
        }
      }
    };

    checkIfSaved();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/recipes/comment/${recipe._id}`, {
        userId: currentUser?.data?.user._id,
        text: newComment,
      });
      setComments([...comments, res.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const handleEditCommentChange = (e) => {
    setEditingCommentText(e.target.value);
  };

  const handleEditCommentSubmit = async (commentId) => {
    if (!editingCommentText.trim()) return;

    try {
      const res = await api.put(`/recipes/comment/${recipe._id}/${commentId}`, {
        userId: currentUser.data.user._id,
        text: editingCommentText,
      });
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? res.data.comment : comment
        )
      );
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (error) {
      console.error("Failed to edit comment", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/recipes/deletecomment/${recipe._id}/${commentId}`, {
        data: { userId: currentUser?.data?.user?._id },
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleAdminDeleteComment = async (commentId) => {
    try {
      await api.delete(`/recipes/admin/comment/${recipe._id}/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await api.delete(`/recipes/unsaverecipe/${recipe._id}`, {
          data: { userId: currentUser?.data?.user._id },
        });
        dispatch(deleteSavedRecipe(recipe._id));
        setIsSaved(false);
      } else {
        await api.post(`/recipes/saverecipe/${recipe._id}`, {
          userId: currentUser?.data?.user._id,
        });
        dispatch(saveRecipe(recipe._id));
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Failed to toggle save recipe", error);
    }
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this recipe: ${recipe.name}!`);

    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <section className="container mx-auto mb-10">
      <div className="mx-4   flex flex-col items-center gap-[40px] border border-dark border-opacity-20 rounded-[24px] py-4 px-4  md:gap-[40px] md:rounded-[32px]">
        <div className="flex flex-col items-center gap-[12px]">
          <span className="uppercase py-1 px-3 rounded-full bg-primaryRed text-light font-semibold">
            explore
          </span>
          <h3 className="uppercase font-[800] text-[38px] text-center md:w-2/3 leading-10">
            {recipe.name}{" "}
          </h3>
          <p className="text-dark text-opacity-80 font-roboto text-center  md:w-2/3">
            {recipe.smallIntro}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex gap-2 items-center ">
            <i className="fa-solid fa-clock"></i>
            <span className="uppercase font-semibold">{recipe.prepTime}</span>
          </div>
          <i className="fa-solid fa-circle text-[4px]"></i>
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-gauge"></i>{" "}
            <span className="uppercase font-semibold">
              {recipe.prepLevel} prep
            </span>
          </div>
          <i className="fa-solid fa-circle text-[4px]"></i>

          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-bell-concierge"></i>{" "}
            <span className="uppercase font-semibold">
              {recipe.serves} serves
            </span>
          </div>
        </div>
        <img
          src={`${recipe.image}`}
          className="w-full h-full rounded-[16px] md:h-[700px] md:object-cover  "
          alt=""
        />

        <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-[56px]">
          {/* TODO: flex this for md screen */}
          <div className="flex flex-col gap-4 w-full md:gap-[40px]">
            <div className="flex flex-col gap-2 w-full ">
              <div
                className="recipe-instruction"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
            <div>
              <div className="flex flex-col gap-7 md:flex-row justify-between border-b border-dark border-opacity-20 pb-10 mb-10">
                <div className="flex gap-[58px] self-start p-4 border-2 border-dark  rounded-[24px] ">
                  <span className="uppercase font-[600] text-[12px]">
                    share{" "}
                  </span>
                  <div className="flex gap-4">
                    <i
                      className="fa-brands fa-facebook  text-[18px]"
                      onClick={() => handleSocialShare("facebook")}
                    ></i>
                    <i
                      className="fa-brands fa-instagram  text-[18px]"
                      onClick={() => handleSocialShare("twitter")}
                    ></i>
                    <i
                      className="fa-brands fa-youtube  text-[18px]"
                      onClick={() => handleSocialShare("whatsapp")}
                    ></i>
                  </div>
                </div>
                {currentUser && (
                  <div className="flex items-center gap-8">
                    <div
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={handleSave}
                    >
                      <span
                        className={`font-semibold ${
                          isSaved ? "text-primaryRed" : ""
                        }`}
                      >
                        {isSaved ? "Saved" : "Save"}
                      </span>
                      <i
                        className={`fa-regular fa-bookmark text-2xl cursor-pointer ${
                          isSaved === true ? "text-primaryRed" : ""
                        }`}
                      ></i>
                    </div>
                  </div>
                )}
              </div>

              {/* author details */}
              <div className="flex flex-col gap-4 md:flex-row border-b border-dark border-opacity-20  pb-10">
                <img
                  src="/images/author.jpg"
                  className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-[12px]"
                  alt=""
                />
                <div className="flex flex-col gap-4 md:gap-7 w-full">
                  <div className="flex flex-col gap-4 md:gap-2 w-full">
                    <span className="text-dark text-opacity-60 font-semibold">
                      Isabella Russo
                    </span>
                    <p className="text-dark text-opacity-80 font-roboto">
                      In the world of pots and pans, I'm on a mission to turn
                      every meal into a masterpiece. Cooks Delight is not just a
                      blog; it's a shared space where the love for food
                      transcends boundaries. Here, we celebrate the art of
                      crafting meals that not only nourish the body but also
                      feed the soul.
                    </p>
                  </div>
                  <Link
                    to="/aboutus"
                    className="px-6 py-3 bg-background uppercase font-semibold border-2 border-dark rounded-[24px] self-start "
                  >
                    learn more
                  </Link>
                </div>
              </div>

              {/* comments */}
              <div className="flex flex-col mt-8">
                <h2 className="text-[24px] uppercase font-bold mb-4">
                  Comments
                </h2>
                {!currentUser && (
                  <div className="italic">Login to give your thougths</div>
                )}
                {currentUser && (
                  <>
                    <form
                      onSubmit={handleCommentSubmit}
                      className="flex flex-col items-end mb-4"
                    >
                      <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        className="w-full p-4 border rounded-[12px] mb-2"
                        placeholder="Write a comment..."
                        rows="4"
                      ></textarea>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primaryRed text-light uppercase font-semibold rounded-[24px]"
                      >
                        Submit
                      </button>
                    </form>

                    <h3 className="font-semibold mb-5">All comments</h3>
                    <div className="flex flex-col gap-4">
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="p-4 border bg-light rounded-[12px]"
                        >
                          {editingCommentId === comment._id ? (
                            <>
                              <textarea
                                value={editingCommentText}
                                onChange={handleEditCommentChange}
                                className="w-full p-4 border rounded-[12px] mb-2"
                                rows="4"
                              ></textarea>
                              <button
                                onClick={() =>
                                  handleEditCommentSubmit(comment._id)
                                }
                                className="px-6 py-3 bg-primaryRed text-light uppercase font-semibold rounded-[24px]"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentText("");
                                }}
                                className="px-6 py-3 bg-gray-500 text-light uppercase font-semibold rounded-[24px] ml-2"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              {!comment && <div>No Comments yet.</div>}
                              <div className="flex flex-col">
                                <span className="font-bold text-dark text-opacity-90">
                                  {comment.username} -{" "}
                                  {new Date(comment.date).toLocaleDateString()}
                                </span>
                                <p className="text-dark text-opacity-80">
                                  {comment.text}
                                </p>
                                {currentUser?.data?.user?._id ===
                                  comment?.user && (
                                  <div className="flex justify-end gap-4">
                                    <button
                                      onClick={() => {
                                        setEditingCommentId(comment._id);
                                        setEditingCommentText(comment.text);
                                      }}
                                      className="  text-sm  font-medium underline "
                                    >
                                      Edit
                                    </button>
                                    {currentUser?.data?.user?.role !==
                                      "admin" && (
                                      <button
                                        onClick={() =>
                                          handleDeleteComment(comment._id)
                                        }
                                        className="  text-sm  font-medium underline "
                                      >
                                        Delete
                                      </button>
                                    )}
                                    {currentUser?.data?.user?.role ===
                                      "admin" && (
                                      <button
                                        onClick={() =>
                                          handleAdminDeleteComment(comment._id)
                                        }
                                        className=" text-sm  font-medium underline  "
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ingredients */}
          <div className="flex flex-col gap-4 md:w-3/6 ">
            <div className="px-6 py-4 rounded-[24px] bg-light border border-dark border-opacity-20 flex flex-col gap-4">
              <span className="uppercase text-primaryRed font-[600]">
                ingredients
              </span>
              <ul className="list-disc px-4 leading-[22.4px] flex flex-col gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-md">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 py-4 rounded-[24px] bg-light border border-dark border-opacity-20 flex flex-col gap-4">
              <span className="uppercase text-primaryRed font-[600]">
                Equipment Needed for Preparation
              </span>
              <ul className="list-disc px-4 leading-[22.4px] flex flex-col gap-2">
                {recipe.equipments.map((equipment, index) => (
                  <li key={index} className="text-md">
                    {equipment}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 py-4 rounded-[24px] bg-light border border-dark border-opacity-20 flex flex-col gap-4">
              <span className="uppercase text-primaryRed font-[600]">
                nutrional value
              </span>
              <ul className="list-disc px-4 leading-[22.4px] flex flex-col gap-2">
                {recipe.nutrients.map((nutrient, index) => (
                  <li key={index} className="text-md">
                    <span className="font-semibold">
                      {nutrient.name.charAt(0).toUpperCase() +
                        nutrient.name.slice(1)}
                      :
                    </span>
                    &nbsp; ~{nutrient.value}
                  </li>
                ))}
              </ul>
            </div>

            <span className="uppercase font-semibold text-dark text-opacity-45 text-[12px]">
              Note: Nutritional values are approximate and may vary based on
              specific ingredients and portion sizes.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleRecipeSection;
