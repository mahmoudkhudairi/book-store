import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
