const ErrorMessage = ({ message, show, onHide }) => {
    return (
        <div
            tabIndex="-1"
            aria-hidden="true"
            className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                show ? "block bg-black bg-opacity-50 duration-300 min-h-screen" : "hidden"
            }`}>
            <div className="relative p-5 w-full max-w-xs max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between px-4 md:px-5 pt-4 rounded-t">
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onHide}>
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="py-2 md:py-4 px-2 md:px-7 text-center">
                        <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</p>

                        <button
                            type="submit"
                            className="w-full mx-auto block m-4 text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onHide}>
                            Ok
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
