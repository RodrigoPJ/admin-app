import { RouterProvider } from 'react-router';
import { router } from './utils/router/router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './store/query/queryClient';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
