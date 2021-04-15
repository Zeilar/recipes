import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { UserContextProvider } from './contexts/UserContext';

export default function Provider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <UserContextProvider>
                {children}
            </UserContextProvider>
        </ThemeProvider>
    );
}
