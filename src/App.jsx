/* App.jsx */
import { useSnapshot } from 'valtio';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import state from './store';

function App() {
  const snap = useSnapshot(state);

  return (
    <main className="app transition-all ease-in">
      {snap.intro ? <Home /> : <Customizer />}
      <Canvas />
    </main>
  );
}

export default App;
