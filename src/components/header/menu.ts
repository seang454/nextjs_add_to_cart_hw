import { NavbarType } from "@/types/navType";

export const navLink: NavbarType[] = [
    {
        path: '/',
        name: 'Home',
        active: true,
    },
    {
        path: '/product',
        name: 'Product',
        active: false,
    },
        {
        path: '/products',
        name: 'Products',
        active: false,
    },
     {
        path: '/products/action',
        name: 'Manage Products',
        active: false,
    },
    {
        path: '/chat',
        name: 'Chat',
        active: false,
    },
    {
        path: '/user',
        name: 'User',
        active: false,
    },
    {
        path: '/blog',
        name: 'Blog', 
        active: false,
    },
    {
        path: '/about',
        name: 'About',
        active: false,
    },
]