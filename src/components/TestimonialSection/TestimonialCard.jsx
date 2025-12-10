import { FiUser } from "react-icons/fi";

const TestimonialCard = ({ quote, name, role, Icon }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/20 rounded-full mb-4">
                {Icon}
            </div>

            <p className="text-gray-700 italic mb-4">"{quote}"</p>

            <div>
                <h4 className="font-semibold text-lg">{name}</h4>
                <p className="text-gray-500 text-sm">{role}</p>
            </div>
        </div>
    );
};

export default TestimonialCard;
