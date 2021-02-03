import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainPage} from "./pages/MainPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {LoginPage} from "./pages/LoginPage";
import {CartPage} from "./pages/CartPage";
import {EditItemPage} from "./pages/EditItemPage";
import {ProfileViewPage} from "./pages/ProfileViewPage";
import {ProfilePage} from "./pages/ProfilePage";
import {OrderFormPage} from "./pages/OrderFormPage";
import {ItemViewPage} from "./pages/ItemViewPage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/' exact>
                    <MainPage />
                </Route>
                <Route path='/cart' exact>
                    <CartPage />
                </Route>
                <Route path='/editItem/:id' exact>
                    <EditItemPage />
                </Route>
                <Route path='/profile/:id' exact>
                    <ProfileViewPage />
                </Route>
                <Route path='/profile' exact>
                    <ProfilePage />
                </Route>
                <Route path='/item/:id' exact>
                    <ItemViewPage />
                </Route>
                <Route path='/order/:itemId' exact>
                    <OrderFormPage />
                </Route>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/registration' exact>
                <RegistrationPage />
            </Route>
            <Route path='/login' exact>
                <LoginPage />
            </Route>
            <Route path='/' exact>
                <MainPage />
            </Route>
            <Route path='/cart' exact>
                <CartPage />
            </Route>
            <Route path='/editItem/:id' exact>
                <EditItemPage />
            </Route>
            <Route path='/profile/:id' exact>
                <ProfileViewPage />
            </Route>
            <Route path='/item/:id' exact>
                <ItemViewPage />
            </Route>
            <Route path='/order' exact>
                <OrderFormPage />
            </Route>
            <Redirect to='/registration'/>
        </Switch>
    )
}