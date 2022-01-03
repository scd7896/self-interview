import { Routes, Route } from 'react-router-dom';
import pages from './service/pages';

export default function Routers() {
	console.log("Test")
	return (
		<Routes>
			{pages.map((page, index) => <Route {...page} key={index} />)}
		</Routes>
	)
}