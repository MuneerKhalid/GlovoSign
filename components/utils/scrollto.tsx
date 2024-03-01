"use client";

import { Button } from "../ui/button";

export const Scrollto = () => {
  return (
    <Button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
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
    </Button>
  );
};
