export default function Logout(props) {

    localStorage.clear();
    window.location.href="/";
    
    return null;
}