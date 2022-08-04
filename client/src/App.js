import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ContextProvider from './context';
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <ContextProvider>
        <Header />
        <Main />
        <Footer />
      </ContextProvider>
    </div>
  );
}

export default App;
