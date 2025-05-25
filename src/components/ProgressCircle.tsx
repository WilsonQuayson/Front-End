const ProgressCircle = ({ percentage }: { percentage: number }) => {
    const getColor = (percent: number) => {
        if (percent > 70) return "text-green-500";
        if (percent > 40) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="relative w-20 h-20">
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                className="text-gray-300"
                strokeWidth="3"
                fill="none"
                r="16"
                cx="18"
                cy="18"
                stroke="currentColor"
                />
                <circle
                className={`${getColor(percentage)}`}
                strokeWidth="3"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                fill="none"
                r="16"
                cx="18"
                cy="18"
                stroke="currentColor"
                style={{ strokeDasharray: `${percentage} 100` }}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {percentage}%
            </span>
        </div>
    );
};
  
export default ProgressCircle;
  