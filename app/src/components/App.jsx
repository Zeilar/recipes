import Main from "./Main";
import Provider from './Provider';
import { GlobalStyles } from '../globalStyles';

export default function App() {
	// gör i useFetch att url blir - process.env.REACT_APP_URL ?? "/" osv, och ha ingen .env i production
	return (
		<Provider>
			<GlobalStyles />
			<Main />
		</Provider>
	);
}
