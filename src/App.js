import Header from './components/header.jsx';
import LoggedInHeader from "./components/loggedInHeader";

class MenuItem {
    constructor(value, action) {
        this.value = value;
        this.action = action;
    }
}

const login = () => {
    alert("Login");
}

const signup = () => {
    alert("Signup");
}

function App() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../src/assets/logo.svg'),
        links: [new MenuItem('Log in', login), new MenuItem('Sign up', signup)],
    }
    return (
        <>
            <Header config={config}/>
            <LoggedInHeader/>
        </>
    );
}

export default App;
