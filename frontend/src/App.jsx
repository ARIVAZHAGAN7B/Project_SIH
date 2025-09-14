import AppLayout from './appLayout/AppLayout'

import { KolamEditor } from './components/KolamEditor'

function App() {
  const handleHelpClick = () => {
    alert("Help button clicked!");
  };

  return (
    <>
    {/* <KolamEditor /> */}
     <AppLayout />
    </>
  );
}

export default App;
