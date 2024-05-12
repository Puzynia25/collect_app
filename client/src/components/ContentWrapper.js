const ContentWrapper = ({ children }) => {
    return (
        <main className="md:w-2/3 lg:w-3/4 w-full min-h-screen">
            <div className="p-4 md:p-9 md:rounded-3xl md:shadow-lg border w-full">{children}</div>
        </main>
    );
};

export default ContentWrapper;
