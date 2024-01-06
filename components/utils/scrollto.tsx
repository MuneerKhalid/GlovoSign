"use client";

export const Scrollto = () => {
  return (
    <button
      className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
      onClick={() => {
        const featuresElement = document.getElementById("features");

        if (featuresElement) {
          featuresElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    >
      Learn more
    </button>
  );
};
