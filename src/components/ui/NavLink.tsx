import type { NavLinkProps } from '../../types/UiTypes';

function NavLink ({link, label}: NavLinkProps){
    return(
        <a href={link} className={`border-b-2 border-b-blue-100 hover:border-b-2 px-2 transition-all hover:border-blue-500 ease-in duration-300`}>
            {label}
        </a>
    )
}

export default NavLink;