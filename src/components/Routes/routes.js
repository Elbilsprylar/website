import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CategoriesProvider } from "providers/CategoriesProvider"
import { HomeProvider } from "providers/HomeDataProvider"
import { PageDataProvider } from "providers/PageProvider"
import { FooterProvider } from "providers/FooterProvider"
import {
  ProductsProvider,
  ProductProvider,
  ProductsCategoriesProvider,
  ProductsCategoriesByIDProvider,
} from "providers/ProductsProvider"

import { Helmet } from "react-helmet"
import NavigationBar from "components/Navigation/NavigationBar"
import Footer from "components/Footer"
import Home from "pages/Home"
import About from "pages/About"
import ProductsView from "pages/ProductsView"
import ProductView from "pages/ProductView"
import Contact from "pages/Contact"
import Cookies from "pages/Cookies"
import Categories from "pages/Categories"
import NotFound from "pages/NotFound"
import PrivacyPolicy from "pages/PrivacyPolicy"
import Terms from "pages/Terms"
import QandA from "pages/QandA"

const Routes = () => {
  return (
    <CategoriesProvider>
      <HomeProvider>
        <PageDataProvider>
          <ProductsCategoriesProvider>
            <ProductsCategoriesByIDProvider>
              <ProductsProvider>
                <ProductProvider>
                  <FooterProvider>
                    <Router>
                      <Helmet>
                        <title>This the title tag</title>
                      </Helmet>
                      <NavigationBar />
                      <Switch>
                        <Route path={"/"} exact component={Home} />
                        <Route
                          path={"/alla-produkter"}
                          exact
                          component={ProductsView}
                        />
                        <Route
                          path={"/product/:name/:id"}
                          exact
                          component={ProductView}
                        />
                        <Route path={"/contact-us"} exact component={Contact} />
                        <Route
                          path={"/categories/:route"}
                          exact
                          component={Categories}
                        />
                        <Route path={"/om-oss"} exact component={About} />
                        <Route path={"/q-and-a"} exact component={QandA} />
                        <Route path={"/cookies"} exact component={Cookies} />
                        <Route path={"/terms"} exact component={Terms} />
                        <Route
                          path={"/privacy-policy"}
                          exact
                          component={PrivacyPolicy}
                        />
                        <Route path={"*"} exact component={NotFound} />
                      </Switch>
                      <Footer />
                    </Router>
                  </FooterProvider>
                </ProductProvider>
              </ProductsProvider>
            </ProductsCategoriesByIDProvider>
          </ProductsCategoriesProvider>
        </PageDataProvider>
      </HomeProvider>
    </CategoriesProvider>
  )
}

export default Routes
