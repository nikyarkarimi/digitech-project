
import './stylesheets/App.css'
import Header from "./components/layout/Header.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import MainContent from "./components/layout/MainContent.jsx";

function App() {
  return (
    <div id={"app"}>
      <Header/>
        <div id={"content-area"}>
            <Sidebar/>
            <MainContent/>
        </div>
    </div>
  )
}

export default App
