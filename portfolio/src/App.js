import './App.css';

function App() {
  return (
    <div className="App">
      {/* BrowserRouter component wraps everywhere where routes will be used */}
      <BrowserRouter>
        <SideNav />
        <div className="pages">
          {/* Routes component wraps indivual routes*/}
          <Routes>
            {/* Route component to create route - requires two props (path and element to render*/}
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
