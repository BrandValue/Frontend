import Header from './components/header.jsx';
import LoggedInHeader from "./components/loggedInHeader";

function App() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../src/assets/logo.svg')
    }
    return (
        <>
            <Header config={config}/>
            <LoggedInHeader/>
        </>
    );
}

export default App;
