import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from "react-router";
import HomePage from "./home/pages";
import InterviewPage from "./interview/pages";

const pages: Array<PathRouteProps | LayoutRouteProps | IndexRouteProps> = [
{
	element: <HomePage />,
	path: "/",
}, 
{
	element: <InterviewPage />,
	path: "/interview"
}]

export default pages;