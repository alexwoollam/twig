"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import AuthGate from "@/app/AuthGate";
import Sidebar from "@/Components/Sidebar";
import dashStyle from "./dashboardLayout.module.css";
import Menu from "./content/menu.json";
import sidebarStyle from "@/Components/Sidebar/sidebar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import { faLeftRight } from '@fortawesome/free-solid-svg-icons'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    const [sidebarSize, setSidebarSize] = useState(380);

    const handleSizeChange = () => {
        setSidebarSize( sidebarSize === 380 ? 90 : 380);
    }

    const sidebarWidth = (): object => {
        return {
            button: sidebarSize - 15,
            sidebar: sidebarSize,
            content: sidebarSize + 40,
        }
    }

    return (
        <html lang="en">
            <StoreProvider>
                <AuthGate>
                        <body className={inter.className}>
                        <div className={dashStyle.main}>
                            <div className={sidebarStyle.asideSmaller}
                                 style={{left: sidebarWidth().button+'px'}}
                                 onClick={() => handleSizeChange()}
                            ><FontAwesomeIcon icon={faLeftRight}/>
                            </div>
                            <Sidebar size={sidebarSize === 380 ? 'large' : 'small'} width={sidebarWidth().sidebar+"px"} menu={Menu.menu}/>
                            <main
                                style={{paddingLeft: sidebarWidth().content+"px"}}
                            >
                                {children}
                            </main>
                        </div>
                        </body>
                </AuthGate>
            </StoreProvider>
        </html>
    );
}
