import './styles/App.scss';
import {Routes, Route} from "react-router-dom";
import Crypto from "./pages/Crypto";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <Crypto/>
      <Routes>
        <Route path="/" element={<Crypto/>}/>
      </Routes>
    </div>
  );
}

export default App;
