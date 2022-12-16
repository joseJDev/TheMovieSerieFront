import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    return (
        <header>
            <div className="contenedor">
                <Link style={{ textDecoration: "none" }} to='/'>
                    <h2 className="logotipo">The-Movie-Series</h2>
                </Link>
                <nav>
                    <a href="#" className="activo" style={{ fontSize: "2rem" }}>
                        Hola, {user.first_name} {user.last_name}
                    </a>
                    <a href="#">
                        <img 
                            src={user.profile || "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"}
                            className="rounded-circle" 
                            style={{ width: '80px' }}
                            alt="Avatar" 
                        />
                    </a>
                    <a style={{ fontSize: "1.5rem" }}>
                        <Button onClick={() => {
                            dispatch( logout() );
                            navigate('/login');
                        }} variant='dark'><AiOutlineLogout/></Button>
                    </a>
                </nav>
            </div>
	    </header>
    );
}
 
export default Header;