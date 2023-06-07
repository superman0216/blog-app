import React, { useState, FormEvent, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TextField, Button } from "@mui/material";
import { AppDispatch } from "../app/store";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import {
  addBlog,
  readBlog,
  addlike,
  watchblog,
  sortBlogs,
} from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { TypeBlog } from "../action/actionType";
const Blog = () => {
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const user = useSelector((state: RootState) => state.auth.user);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  let tmp = blogs;
  const [currentblog, setcurrentblog] = useState<TypeBlog>({
    title: "",
    _id: "",
    like: 0,
    watch: 0,
    user_name: "",
    content: "",
  });

  useEffect(() => {
    if (!isauth) navigate("/login");
    dispatch(readBlog());
  }, []);

  const addlikee = (id: string) => {
    dispatch(addlike(id));
  };

  const onadd = (e: FormEvent) => {
    e.preventDefault();
    if (title != "" && content != "") {
      const newblog = {
        title: title,
        content: content,
        user_name: user.name,
        image: imageData,
      };
      dispatch(addBlog(newblog));
      settitle("");
      setcontent("");
      setImageData("");
    }
  };
  const onwatch = (item: TypeBlog, id: string) => {
    dispatch(watchblog(id));
    setcurrentblog(item);
  };
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
  };
  const sortBlog = (e: any) => {
    if (e.target.value === 1) {
      tmp.sort((a, b) => (a.create_at > b.create_at ? 1 : -1));
    } else if (e.target.value === 2) {
      tmp.sort((a, b) => (a.like > b.like ? 1 : -1));
    } else {
      tmp.sort((a, b) => (a.watch > b.watch ? 1 : -1));
    }
    console.log(tmp);
  };
  return (
    <>
      <div className=" max-w-5xl m-auto flex flex-column">
      <button
          type="button"
          className="inline-block mt-1 mb-2 align-self-lg-center w-56 h-14 rounded bg-gray-800 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add NEW
        </button>
        <div className="flex justify-center">
          {tmp.map((item, key) => {
            return (
              <div key={key} className="m-auto overflow-hidden rounded-lg shadow-lg  h-auto w-60 md:w-80 mx-4">
                      <div  className="block w-full h-full hover:cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      onClick={(e) => onwatch(item, item._id)}
                      >
                          {item.image !== "" && (
                            <img
                              src={`http://localhost:8000/${item.image}`}
                              className="object-cover w-full max-h-40"
                              alt={`localhost:8000/${item.image}`}
                            />
                          )}
                          <div className="w-full p-4 dark:bg-gray-800">
                              
                              <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white border-b">
                                {item.user_name}'article
                              </p>
                              <p className="font-light text-gray-400 dark:text-gray-300 text-md mb-2">
                                Title: {item.title}
                              </p>
                              <p className="text-white flex justify-around ">
                                <span className="flex">
                                  <button className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                                    </svg> 
                                    {item.watch}
                                  </button>
                                </span>
                                <span className="flex">
                                  <button className="flex" onClick={(e) => addlikee(item._id)}>
                                    {/* {user.name !== item.user_name && ( */}
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                      </svg>{item.like}
                                    {/* )} */}
                                  </button>
                                </span>
                              </p>
                          </div>
                      </div>
                  </div>
            );
          })}
        </div>
        
        {/* <select onChange={(e)=>sortBlog(e)} className="form-select h-10 m-4 w-24" aria-label="Default select example">
          <option value="1">date</option>
          <option value="2">watch</option>
          <option value="3">like</option>
        </select> */}
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {" "}
                <div className=" font-bold ">{currentblog.title}</div>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
             <i className=" font-medium font">Content:</i><div className="ms-5">{currentblog.content}</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="px-6 py-2 mx-auto uppercase align-self-md-center transition duration-200 ease-in border-2 border-gray-900 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none "
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-4xl  text-gray-800" id="exampleModalLabel">
                <i>New Blog</i>
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={onadd}>
                <div className="mx-4 mt-6">
                  <input
                    className="block w-full mb-4 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="title"
                    placeholder="title"
                    id="outlined-basic"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  <TextareaAutosize
                    className="block w-full mb-4 rounded-md border-0 py-1.5 pl-7 pr-20  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    minRows="2"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></TextareaAutosize>
                  <div>
                    <input type="file" onChange={handleFileUpload} className=" mb-4"/>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 mx-auto uppercase align-self-md-center transition duration-200 ease-in border-2 border-gray-900 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none "
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
