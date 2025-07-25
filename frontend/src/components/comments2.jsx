import { useState } from "react";
import { makeRequest } from "../axios";// ✅ correct for default export
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";


  // eslint-disable-next-line react/prop-types
  const Comments = ({ postId }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };


    const [desc, setDesc] = useState("");
    const queryClient = useQueryClient();
  
    const { isPending, data } = useQuery({
      queryKey: ["comments", postId], // Include postId in the query key
      queryFn: () => makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
    });
  
    const mutation = useMutation({
      mutationFn: (newComment) => makeRequest.post("/comments", newComment),
      onSuccess: () => {
        // Invalidate and refetch only the affected post's comments
        queryClient.invalidateQueries(["comments", postId]);
      },
    });
  
    const handleClick = async (e) => {
      e.preventDefault();
      mutation.mutate({ desc, postId });
      setDesc("");
    };



  return (
    <div className="collapse-container">
      <button className="collapse-toggle" onClick={handleCollapse}>
        Comments {isCollapsed ? "(0)" : "(x)"}{" "} 
        <i className="fas fa-chevron-down"></i>
      </button>
      <div className={` ${isCollapsed ? "hidden" : ""}`}>
        <div className="comment-list">
          {/* Existing comments would go here */}

          <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    value={desc}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onClick={handleClick}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>

              {/* Comments starts from here:  */}
              {isPending
                ? "Loading"
                : data?.map((comment) => (
                    <div key={comment.id}>
                      <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough"
                              />
                              {comment.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time
                                dateTime="2022-02-08"
                                title="February 8th, 2022"
                              >
                                {moment(comment.createdAt).fromNow()}
                              </time>
                            </p>
                          </div>
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                          </button>

                          <div
                            id="dropdownComment1"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Report
                                </a>
                              </li>
                            </ul>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          {comment.desc}
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                          <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          >
                            <svg
                              className="mr-1.5 w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                      </article>
                      {/* Comments Replies starts from here:  */}
                      <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="Jese Leos"
                              />
                              example User name
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time
                                dateTime="2022-02-12"
                                title="February 12th, 2022"
                              >
                                Feb. 12, 2022
                              </time>
                            </p>
                          </div>
                          <button
                            id="dropdownComment2Button"
                            data-dropdown-toggle="dropdownComment2"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                          </button>

                          <div
                            id="dropdownComment2"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Report
                                </a>
                              </li>
                            </ul>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          an example replies template 
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                          <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          >
                            <svg
                              className="mr-1.5 w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                      </article>
                      {/* Comments Replies ends here  */}
                      {/* Comments ends from here  */}
                    </div>
                  ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Comments;
