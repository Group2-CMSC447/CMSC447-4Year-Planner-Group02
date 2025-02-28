import './App.css';
import Year from './components/Year'

function App() {
  return (
    <div className="App" data-testid="callYear">
        <Year/>   
        <a
          className="Github-Link"
          href="https://github.com/Group2-CMSC447/CMSC447-4Year-Planner-Group02"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Our Github
        </a>
    </div>
    
  );
}

export default App;
