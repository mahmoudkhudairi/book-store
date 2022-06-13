import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ContextProvider from './context';
function App() {
  return (
    <ContextProvider>
      <Header />
      <Main />
      <Footer />
    </ContextProvider>
  );
}

export default App;
