import React, { useState, FormEvent, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { AppDispatch } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { deleteBlog, editBlog } from "../action/blogAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { readBlog } from "../action/blogAction";
import { TextareaAutosize } from "@mui/material";

const MyBlog = () => {

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [currentEdit, setcurrentEdit] = useState({
    title: "",
    content: "",
    _id: "",
  });
  useEffect(() => {
    dispatch(readBlog());
  }, []);

  const del = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    if (window.confirm()) {
      dispatch(deleteBlog(id));
    }
  };

  const onedit = (e: FormEvent) => {
    e.preventDefault();
    if (currentEdit.title != "" && currentEdit.content != "") {
      dispatch(editBlog(currentEdit));
    }
  };
  
  return (
    <>
      <div className=" max-w-5xl m-auto ">
        <div className="w-full  flex justify-center">
          {blogs.map((item, key) => {
            return (
              <>
                {item.user_name == user.name && (
                  <div className=" p-4 mt-4 m-auto overflow-hidden rounded-lg shadow-lg  h-auto w-60 md:w-80 mx-4">
                    <div className="flex justify-start underline"> <i className=" font-bold me-3">Title:</i> {item.title}</div>
                    <div className="flex justify-start mt-2"><i className=" font-medium me-3">Content:</i> {item.content}</div>
                    <div className="flex justify-center mt-5">
                      <EditIcon
                        className="hover:cursor-pointer mx-3"
                        onClick={(e) => setcurrentEdit(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      ></EditIcon>
                      <DeleteIcon
                        className="hover:cursor-pointer mx-3"
                        onClick={(e) => del(e, item._id)}
                      ></DeleteIcon>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {/* Edit Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title modal-title text-3xl  text-gray-800"  id="exampleModalLabel">
                <i className=" font-medium">Edit Your Blog</i> 
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={onedit}>
                <div className="mx-4 mt-6">
                <input
                    className="block w-full mb-4 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="title"
                    placeholder="title"
                    id="outlined-basic"
                    value={currentEdit.title}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })}
                  />
                  <TextareaAutosize
                    className="block w-full mb-4 rounded-md border-0 py-1.5 pl-7 pr-20  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="content"
                    minRows="4"
                    value={currentEdit.content}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></TextareaAutosize>
                  <button
                    type="submit"
                    onClick={onedit}
                    data-bs-dismiss="modal"
                    className="px-6 py-2 mx-auto uppercase align-self-md-center transition duration-200 ease-in border-2 border-gray-900 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none "
                  >
                    Save
                  </button>
                  {/* <Button
                    type="submit"
                    variant="contained"
                    className="ms-32"
                    onClick={onedit}
                    data-bs-dismiss="modal"
                  >
                    Add new blog
                  </Button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyBlog;
