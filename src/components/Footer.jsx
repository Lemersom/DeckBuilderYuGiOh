import '../App.css';

export default function Footer( props ) {

    return (
        
        <footer id='footer' className={props.errorMsg ? 'footer-fixed' : null} >

            <div className="perfil">
                <ul>
                    <li>
                        <h4>Lémersom Fernandes Filho</h4>
                    </li>
                    <li>Github: <a href="https://github.com/Lemersom">github.com/Lemersom</a></li>
                </ul>
            </div>
            <div className="perfil">
                <ul>
                    <li>
                        <h4>Luís Felipe Mori</h4>
                    </li>
                    <li>Github: <a href="https://github.com/luisfe0604">github.com/luisfe0604</a></li>
                </ul>
            </div>

        </footer>
    )
}