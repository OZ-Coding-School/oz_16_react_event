export function Button({ children, variant = "default", className, onClick }) {
  const variantClasses = {
    default: "bg-green-600",
    danger: "bg-red-700",
    cancel: "bg-white/20"
  };

  return (
    <button
      onClick={onClick}
      className={`text-white flex justify-center items-center rounded-lg text-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
