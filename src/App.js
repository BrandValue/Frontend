import Header from './components/header.jsx';
import LoggedInHeader from "./components/loggedInHeader";

class MenuItem {
    constructor(value, action) {
        this.value = value;
        this.action = action
    }
}

const login = () => {
    console.log("Login clicked");
}

const signup = () => {
    console.log("Signup clicked");
}

function App() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../src/assets/logo.svg'),
        links: ['log in', 'Sign up']
    }
    return (
        <>
            <Header config={config}/>
            <LoggedInHeader/>
        </>
    );
}

export default App;
