"use client"

import sidebarStyle from './sidebar.module.css';
import {useRouter, usePathname } from "next/navigation";
import {Logo} from "@/Components/Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faCog , faLeaf, faSitemap, faUsers, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

type menuItem = {
    title: string,
    help: string,
    icon: string,
    uri: string,
    active: boolean
}

type Props = {
    menu: Array<menuItem>
    width: number,
    size: string
}

function IconMatch(iconName) {
    const icons = {
        "faGauge": faGauge,
        "faCog": faCog,
        "faLeaf": faLeaf,
        "faSitemap": faSitemap,
        "faUsers": faUsers
    };

    return icons[iconName];
}

const Sidebar = ({width, size, menu}:Props) => {

    const router = useRouter();
    const path = usePathname();

    const isActive = (uri: string): boolean => {
        return path  === uri;
    };

    const iconSize = size === 'small' ? "xl" : "md";

    const getMenuItems = () => {
        return menu.map((menuItem) => {
            if(menuItem.active){
                const isActiveItem = isActive(menuItem.uri);
                const click = () => {
                    router.push(menuItem.uri)
                }

                return(
                    <li onClick={() => click()}>
                        <FontAwesomeIcon size={iconSize} icon={IconMatch(menuItem.icon)}/>
                        <a className={isActiveItem && sidebarStyle.active}>
                            {menuItem.title}
                        </a>
                    </li>
                )
            }
            return null;
        });
    }

    const asideClass = () => {
        if(size === 'small'){
            return sidebarStyle.asideSmall
        }
        return sidebarStyle.aside
    }

    const logoClass = () => {
        if(size === 'small'){
            return sidebarStyle.asideLogoSmall
        }
        return sidebarStyle.asideLogo
    }



    return (
        <aside style={{width: width}} className={asideClass()}>
            <div className={logoClass()}>
                <Logo color={"#377c39"} noText/>
            </div>
            <ul className={sidebarStyle.mainMenu}>
                {getMenuItems()}
            </ul>
            <ul className={sidebarStyle.asideLogout}>
                <li>
                    <FontAwesomeIcon size={iconSize} icon={faCircleXmark}/>
                    <a>Log out</a>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;