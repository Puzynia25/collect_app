const ContentWrapper = ({ children }) => {
    return (
        <main className="md:w-2/3 lg:w-3/4 w-full min-h-screen ">
            <div className="mx-4 md:mx-0 p-4 md:p-7 rounded-3xl shadow-lg border md:w-full bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                {children}
            </div>
        </main>
    );
};

export default ContentWrapper;
