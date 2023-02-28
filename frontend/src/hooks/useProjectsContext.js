import { ProjectsContext } from "../context/ProjectsContext";
import { useContext } from "react";

// Define custom hook to use ProjectsContext (based on useContext builtin hook)
export const useProjectsContext = () => {
  const context = useContext(ProjectsContext) 

  // Check if function call is within scope of ProjectsContextProvider
  if (!context) {
    throw Error("useProjectContext must be used inside a ProjectsContextProvider")
  }

  // Return ProjectsContext
  return context
}