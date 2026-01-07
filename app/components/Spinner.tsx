

export const Spinner = () => {
    return (
        <div
            role="status"
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-current border-r-transparent text-gray-600 dark:text-white"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};