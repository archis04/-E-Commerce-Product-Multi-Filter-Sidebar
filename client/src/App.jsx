import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Catalog</h1>
        <p>Browse products with multi-filter sidebar</p>
      </header>
      <main className="app-main">
        <Home />
      </main>
    </div>
  );
}

export default App;
