import { RouterProvider } from 'react-router';
import { router } from './utils/router/router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './store/query/queryClient';
import theme from "./utils/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
