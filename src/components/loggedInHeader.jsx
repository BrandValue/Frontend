import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Navbar from "./navbar";

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
export default function LoggedInHeader() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../assets/logo.svg'),
        links: [new MenuItem('Profile', login), new MenuItem('Transaction history', signup)],
        badges: [{name: ShoppingCartIcon, number: getNumItemsInCart(), onCartClick}],
    }
    return (
        <Navbar config={config}/>
    )
}
