import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { scrollToTop } from "../../utils/scrollToTop";

const AdminRecipes = ({ recipe }) => {
  async function handleDelete() {
    const id = recipe._id;
    await api.delete(`/recipes/deleteRecipe/${id}`);
    toast.success("Recipe Deleted");
  }

  return (
    <div className="flex flex-col md:w-full h-full" key={recipe.id}>
      <img
        src={recipe.image}
        className="object-cover h-full  md:h-64 w-full rounded-t-[16px]"
        alt=""
      />
      <div className="flex flex-col justify-between gap-[40px] bg-light p-[24px] rounded-b-[16px] relative h-full">
        <div className="flex flex-col justify-between  gap-[12px] h-full">
          <h3 className="text-[21px]  2xl:text-[21px] leading-[25.2px] tracking-[-1%] uppercase font-bold ">
            {recipe.name}
          </h3>
          <p className="font-[300] text-[14px] leading-[19.6px] text-dark text-opacity-90 tracking-[-1%] line-clamp-3">
            {recipe.smallIntro}
          </p>
        </div>
        <div className="flex  gap-[16px] md:flex-row justify-between  items-center ">
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 transition-all ease-in-out duration-100"
          >
            Delete
          </button>

          <Link
            to={`/dashboard/admin/updaterecipe/${recipe._id}`}
            onClick={scrollToTop}
            className="bg-none border border-dark px-6 py-3 md:text-[10px] 2xl:text-[16px] rounded-full uppercase font-semibold text-center"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRecipes;
