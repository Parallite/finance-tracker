import { usePathname } from "next/navigation"
import { LuAreaChart, LuArrowRightLeft, LuSettings2 } from "react-icons/lu";

export const useRoutes = () => {
    const pathname = usePathname();
    const routes = [
        {
            label: 'Dashboard',
            href: '/',
            icon: LuAreaChart,
            active: pathname === '/'
        },
        {
            label: 'Transactions',
            href: '/transactions',
            icon: LuArrowRightLeft,
            active: pathname === '/transactions'
        },
        {
            label: 'Manage',
            href: '/manage',
            icon: LuSettings2,
            active: pathname === '/manage'
        }
    ]

    return routes
}