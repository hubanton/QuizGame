import {BrowserRouter, Route, Routes} from "react-router-dom"
import GameContextProvider from "./Context/GameContextProvider";
import MainGame from "./Pages/MainGame";
import StartPage from "./Pages/StartPage";

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/QuizGame" element={<StartPage/>}/>
            <Route path="QuizGame/game" element={<MainGame/>}/>
          </Routes>
        </BrowserRouter>
      </GameContextProvider>
    </div>
  );
}

export default App;
