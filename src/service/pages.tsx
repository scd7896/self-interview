import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from "react-router";
import HomePage from "./home/pages";
import InterviewPage from "./interview/pages";
import ReviewPage from "./review/pages";

const pages: Array<PathRouteProps | LayoutRouteProps | IndexRouteProps> = [
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <InterviewPage />,
    path: "/interview",
  },
  {
    element: <ReviewPage />,
    path: "/review",
  },
];

export default pages;
