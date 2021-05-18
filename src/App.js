import Header from './components/header.jsx';
import LoggedInHeader from "./components/loggedInHeader";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

const getNumItemsInCart = () => {
    return 1;
}

const onCartClick = () => {
    alert('1 item in cart');
}

function App() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../src/assets/logo.svg'),
        links: [new MenuItem('Log in', login), new MenuItem('Sign up', signup)],
        badges: [{name: ShoppingCartIcon, number: getNumItemsInCart(), onCartClick}],
    }
    return (
        <>
            <Header config={config}/>
            <LoggedInHeader/>
        </>
    );
}

export default App;
