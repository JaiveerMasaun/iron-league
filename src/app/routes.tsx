import { createBrowserRouter } from "react-router";
import { AthleteProfileInput } from "./components/AthleteProfileInput";
import { NutritionResults } from "./components/NutritionResults";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AthleteProfileInput,
  },
  {
    path: "/results",
    Component: NutritionResults,
  },
]);
