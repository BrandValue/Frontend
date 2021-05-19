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

export default function Header() {
    const config = {
        title: `Let's eat`,
        imageSource: require('../assets/logo.svg'),
        links: [new MenuItem('Log in', login), new MenuItem('Sign up', signup)],
        badges: [],
    }
    return (
        <Navbar config={config}/>
    )
}
