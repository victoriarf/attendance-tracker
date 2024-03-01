import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from './AuthContext.jsx';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import theme from './config/theme.config';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
rootElement &&
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthContextProvider>
            <StyledEngineProvider injectFirst>
              <StyledThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App />
                </ThemeProvider>
              </StyledThemeProvider>
            </StyledEngineProvider>
          </AuthContextProvider>
          {/*<ReactQueryDevtoolsPanel setIsOpen={true} />*/}
        </LocalizationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
