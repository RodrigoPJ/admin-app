import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './store/query/queryClient';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
