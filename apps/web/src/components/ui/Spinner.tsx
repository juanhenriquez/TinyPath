interface SpinnerProps {
  size?: number;
  width?: number;
  height?: number;
}

export function Spinner({ width, height, size = 16 }: SpinnerProps) {
  return (
    <div className="animate-spin ease linear text-gray11">
      <svg
        width={width || size}
        height={height || size}
        fill="none"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          strokeWidth="2"
          stroke="currentColor"
          strokeOpacity="0.25"
        ></circle>
        <path
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15"
        ></path>
      </svg>
    </div>
  );
}