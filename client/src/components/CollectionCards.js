import { useState } from "react";
import { COLLECTION_ROUTE, USER_ROUTE } from "../utils/consts";
import Badge from "./Badge";
import CollectionList from "./CollectionList";
import { useNavigate } from "react-router-dom";
import { renderMarkdown } from "../utils/renderMarkdown";

const CollectionCards = ({ collections }) => {
    const [toggleTable, setToggleTable] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between mt-24 mb-2 md:mb-9">
                <h2 className="font-bold text-xl md:text-2xl ">The biggest collections</h2>
                <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setToggleTable(!toggleTable)}>
                    Table view
                </button>
            </div>
            {toggleTable ? (
                <CollectionList />
            ) : (
                <div className="flex flex-row gap-3 flex-nowrap w-full overflow-auto">
                    {collections.length > 0
                        ? collections.map((col) => {
                              return (
                                  <div className="w-full" key={col.id}>
                                      <div className="flex flex-col justify-between w-72 bg-white border border-gray-200 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
                                          <button onClick={() => navigate(COLLECTION_ROUTE + "/" + col.id)}>
                                              <img
                                                  className="cursor-pointer rounded-t-3xl p-10 h-80 object-cover object-center mx-auto"
                                                  src={col.img}
                                                  alt={col.name}
                                              />
                                          </button>
                                          <div className="pb-5 px-5">
                                              <h5 className="mb-3 font-semibold text-gray-900 dark:text-gray-400">
                                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                                      <Badge category={col.category.name} />
                                                  </span>
                                              </h5>
                                              <h5
                                                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer hover:underline"
                                                  onClick={() => navigate(COLLECTION_ROUTE + "/" + col.id)}>
                                                  {col.name.length > 60 ? col.name.slice(0, 20) + "..." : col.name}
                                              </h5>
                                              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                  Creator:{" "}
                                                  <button onClick={() => navigate(USER_ROUTE + "/" + col.user.id)}>
                                                      <span className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                                          {col.user.name}
                                                      </span>
                                                  </button>
                                              </p>
                                              <div className="h-12 mt-7 mb-3 font-normal text-gray-700 dark:text-gray-400 markdownContent">
                                                  {col.description ? (
                                                      <p
                                                          dangerouslySetInnerHTML={renderMarkdown(
                                                              col.description.length > 55
                                                                  ? col.description.slice(0, 55) + "..."
                                                                  : col.description
                                                          )}
                                                      />
                                                  ) : (
                                                      "There is no description about this collection..."
                                                  )}
                                              </div>
                                          </div>

                                          <div className="pb-5 px-5">
                                              <button
                                                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                  onClick={() => navigate(COLLECTION_ROUTE + "/" + col.id)}>
                                                  {" "}
                                                  Read more
                                                  <svg
                                                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                      aria-hidden="true"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 14 10">
                                                      <path
                                                          stroke="currentColor"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M1 5h12m0 0L9 1m4 4L9 9"
                                                      />
                                                  </svg>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            )}
        </>
    );
};

export default CollectionCards;
