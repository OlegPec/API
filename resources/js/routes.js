import StartPage from './views/StartPage';
import Collaboration from "./views/Collaboration";
import List from "./views/List";
import Registration from "./views/Registration";
import Login from "./views/Login";
import DiscountCards from "./views/DiscountCards";
import DiscountCardData from "./views/DiscountCardData";
import DiscountCardScan from "./views/DiscountCardScan";
import DiscountCardScan111 from "./views/DiscountCardScan111";
import DiscountCardAdd from "./views/DiscountCardAdd";

export const routes = [
    {
        path: '/',
        name: 'Список покупок',
        meta: {layout: 'auth', auth: undefined},
        component: () => import('./views/StartPage.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        meta: {layout: 'auth', auth: false},
        component: () => import('./views/Registration.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {layout: 'auth', auth: false},
        component: () => import('./views/Login.vue')
    },
    {
        path: '/list/:id',
        name: 'list',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/List.vue')
    },
    {
        path: '/collaboration',
        name: 'collaboration',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/Collaboration.vue')
    },
    {
        path: '/discountCards',
        name: 'discountCards',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/DiscountCards.vue')
    },
    {
        path: '/discountCardData/:id',
        name: 'discountCardData',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/DiscountCardData.vue')
    },
    {
        path: '/discountCardScan',
        name: 'discountCardScan',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/DiscountCardScan111.vue')
    },
    {
        path: '/discountCardAdd',
        name: 'discountCardAdd',
        meta: {layout: 'main', auth: undefined},
        component: () => import('./views/DiscountCardAdd.vue')
    },
]
