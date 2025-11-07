import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary, ToastProvider } from './components';
import { SearchPage } from './features/search';
import { RecipeDetailPage } from './features/recipe-detail';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

