import { Spinner as FlowbiteSpinner } from "flowbite-react";
const theme = {
    color: {
        info: "fill-blue-600",
    },
};
const Spinner = () => {
    return (
        <div className="p-4 text-center">
            <FlowbiteSpinner color="info" size="md" theme={theme} />
        </div>
    );
};

export default Spinner;
