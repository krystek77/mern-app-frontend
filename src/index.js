/* eslint-disable no-unused-vars */
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as loaderRoot } from "./containers/Root";
import Categories, { loader as loaderCategories, action as actionCategories } from "./containers/Categories";
import Products, { loader as productsLoader, action as actionProducts } from "./containers/Products";
import Contact, { action as actionContact } from "./containers/Contact";
import ProductDetails, {
  loader as loaderProductDetails,
  action as actionProductDetails,
} from "./containers/ProductDetails";
import SearchResult, { loader as searchLoader } from "./containers/SearchResult";
import Login, { loader as loaderLogin, action as actionLogin } from "./containers/Login";
import ProductForm, { loader as productFormLoader, action as productFormAction } from "./containers/ProductForm";
import CategoryForm, { loader as loaderCategoryForm, action as actionCategoryForm } from "./containers/CategoryForm";
import DocumentForm, { loader as loaderDocumentForm, action as actionDocumentForm } from "./containers/DocumentForm";
import TagForm, { action as actionTagForm, loader as loaderTagForm } from "./containers/TagForm";
import ControlForm, { action as actionControlForm, loader as loaderControlForm } from "./containers/ControlForm";
import Customers, { loader as loaderCustomer } from "./containers/Customers";
import Home, { action as actionHome, loader as loaderHome } from "./containers/Home";
import RootEquipment from "./containers/RootEquipment";
import SoftWash from "./containers/SoftWash";
import CivilServices, { loader as loaderCivilServices } from "./containers/CivilServices";
import HygieneBarrier from "./containers/HygieneBarrier";
import SaveWaterEnergy from "./containers/SaveWaterEnergy";
import AdditionEquipment, {
  loader as loaderAdditionalEquipment,
  action as actionAdditionalEquipment,
} from "./containers/AdditionEquipment";
import MOP, { loader as loaderMOP } from "./containers/MOP";
import Nursery, { loader as loaderNursery } from "./containers/Nursery";
import VendLaundry, { loader as loaderVendLaundry } from "./containers/VendLaundry";
import News, { loader as loaderNews, action as actionNews } from "./containers/News/News";
import NewsDetails, {
  loader as loaderNewsDetails,
  action as actionNewsDetails,
} from "./containers/News/NewsDetails/NewsDetails";
import Controls, { loader as loaderControls, action as actionControl } from "./containers/Controls";
import PostForm, { action as actionPostForm, loader as loaderPostForm } from "./containers/PostForm";
import PriceListForm, {
  loader as loaderPriceListForm,
  action as actionPriceListForm,
} from "./containers/PriceListForm";
import HeatingForm, { loader as loaderHeatingForm, action as actionHeatingForm } from "./containers/HeatingForm";
import VoltageForm, { loader as loaderVoltageForm, action as actionVoltageForm } from "./containers/VoltageForm";
import OptionForm, { loader as loaderOptionForm, action as actionOptionForm } from "./containers/OptionForm";
import WarrantyConditions from "./containers/WarrantyConditions";
import ImplementationConditions from "./containers/ImplementationConditions";
import LaundryForm, { action as actionLaundryForm, loader as loaderLaundryForm } from "./containers/LaundryForm";
import SpareParts, { loader as loaderSpareParts, action as actionSpareParts } from "./containers/SpareParts/SpareParts";
import SparePartDetails, {
  loader as loaderSparePartDetails,
} from "./containers/SpareParts/SparePartDetails/SparePartDetails";
import SupplierForm, { loader as loaderSupplierForm, action as actionSupplierForm } from "./containers/SupplierForm";
import SparePartForm, {
  loader as loaderSparePartForm,
  action as actionSparePartForm,
} from "./containers/SparePartForm";
import ErrorLaundryForm from "./containers/Errors/ErrorLaundryForm";
import RequireAdminRoute from "./components/Admin/RequireAdminRoute/RequireAdminRoute";
import Hospitality from "./containers/Hospitality";
import "./index.css";
import { registerServiceWorkerProduction } from "./serviceWorkerDevelopment";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loaderRoot,
    children: [
      {
        index: true,
        element: <Home />,
        action: actionHome,
        loader: loaderHome,
      },
      {
        path: `/:laundryPhotoId/skasuj`,
        element: <Home />,
        action: actionHome,
        loader: loaderHome,
      },
      {
        path: "klienci-przemyslowych-urzadzen-pralniczych",
        element: <Customers />,
        loader: loaderCustomer,
      },
      {
        path: "wiadomosci",
        element: <News />,
        loader: loaderNews,
      },
      {
        path: "wiadomosci/:slug/skasuj",
        element: <News />,
        loader: loaderNews,
        action: actionNews,
      },
      {
        path: "wiadomosci/:slug",
        element: <NewsDetails />,
        loader: loaderNewsDetails,
      },
      {
        path: "wiadomosci/:slug/skasuj",
        element: <NewsDetails />,
        action: actionNewsDetails,
        loader: loaderNewsDetails,
      },
      {
        path: "czesci-zamienne",
        element: <SpareParts />,
        loader: loaderSpareParts,
      },
      {
        path: "czesci-zamienne/:sparePartId/skasuj",
        element: <SpareParts />,
        loader: loaderSpareParts,
        action: actionSpareParts,
      },
      {
        path: "czesci-zamienne/:sparePartId",
        element: <SparePartDetails />,
        loader: loaderSparePartDetails,
      },
      {
        path: "sterowniki-urzadzen-pralniczych",
        element: <Controls />,
        loader: loaderControls,
      },
      {
        path: "sterowniki-urzadzen-pralniczych/:controlName",
        element: (
          <RequireAdminRoute>
            <Controls />
          </RequireAdminRoute>
        ),
        loader: loaderControls,
        action: actionControl,
      },
      {
        path: "kontakt",
        element: <Contact />,
        action: actionContact,
      },
      {
        path: "pralma/login",
        element: <Login />,
        loader: loaderLogin,
        action: actionLogin,
      },
      {
        path: "pralma/warunki-gwarancji",
        element: <WarrantyConditions />,
      },
      {
        path: "pralma/warunki-realizacji",
        element: <ImplementationConditions />,
      },
      {
        path: "pralma/formularz-pralni",
        element: <LaundryForm />,
        errorElement: <ErrorLaundryForm />,
        loader: loaderLaundryForm,
        action: actionLaundryForm,
      },
      {
        path: "pralma/formularz-pralni/:laundryPhotoId/edytuj",
        element: <LaundryForm />,
        loader: loaderLaundryForm,
        action: actionLaundryForm,
      },
      {
        path: "pralma/formularz-pralni/:laundryPhotoId/skasuj",
        element: <LaundryForm />,
        loader: loaderLaundryForm,
        action: actionLaundryForm,
      },
      {
        path: "pralma/formularz-produktu",
        element: (
          <RequireAdminRoute>
            <ProductForm />
          </RequireAdminRoute>
        ),
        loader: productFormLoader,
        action: productFormAction,
      },
      {
        path: "pralma/formularz-produktu/:categoryName/model/:model/edytuj",
        element: (
          <RequireAdminRoute>
            <ProductForm />
          </RequireAdminRoute>
        ),
        loader: productFormLoader,
        action: productFormAction,
      },
      {
        path: "pralma/formularz-produktu/:categoryName/model/:model/kopiuj",
        element: (
          <RequireAdminRoute>
            <ProductForm />
          </RequireAdminRoute>
        ),
        loader: productFormLoader,
        action: productFormAction,
      },
      {
        path: "pralma/formularz-sterownika",
        element: <ControlForm />,
        loader: loaderControlForm,
        action: actionControlForm,
      },
      {
        path: "pralma/formularz-sterownika/:controlName",
        element: <ControlForm />,
        loader: loaderControlForm,
        action: actionControlForm,
      },
      {
        path: "pralma/formularz-kategorii",
        element: (
          <RequireAdminRoute>
            <CategoryForm />
          </RequireAdminRoute>
        ),
        action: actionCategoryForm,
        loader: loaderCategoryForm,
      },
      {
        path: "pralma/formularz-kategorii/:categoryId/edytuj",
        element: (
          <RequireAdminRoute>
            <CategoryForm />
          </RequireAdminRoute>
        ),
        loader: loaderCategoryForm,
        action: actionCategoryForm,
      },
      {
        path: "pralma/formularz-tagu",
        element: <TagForm />,
        action: actionTagForm,
        loader: loaderTagForm,
      },
      {
        path: "pralma/formularz-tagu/:tagName",
        element: <TagForm />,
        loader: loaderTagForm,
      },
      {
        path: "pralma/formularz-tagu/skasuj-tag/:tagName",
        element: <TagForm />,
        action: actionTagForm,
        loader: loaderTagForm,
      },
      {
        path: "pralma/formularz-tagu/edytuj-tag/:tagName",
        element: <TagForm />,
        action: actionTagForm,
        loader: loaderTagForm,
      },
      {
        path: "pralma/formularz-dokumentu",
        element: <DocumentForm />,
        loader: loaderDocumentForm,
        action: actionDocumentForm,
      },
      {
        path: "pralma/formularz-dokumentu/:slug/skasuj",
        element: <DocumentForm />,
        loader: loaderDocumentForm,
        action: actionDocumentForm,
      },
      {
        path: "pralma/formularz-dokumentu/:slug/edytuj",
        element: <DocumentForm />,
        loader: loaderDocumentForm,
        action: actionDocumentForm,
      },
      {
        path: "pralma/formularz-wiadomosci",
        element: <PostForm />,
        action: actionPostForm,
        loader: loaderPostForm,
      },
      {
        path: "pralma/formularz-wiadomosci/:slug/skasuj",
        element: <PostForm />,
        action: actionPostForm,
      },
      {
        path: "pralma/formularz-cennika",
        element: <PriceListForm />,
        loader: loaderPriceListForm,
        action: actionPriceListForm,
      },
      {
        path: "pralma/formularz-podgrzewu",
        element: (
          <RequireAdminRoute>
            <HeatingForm />
          </RequireAdminRoute>
        ),
        loader: loaderHeatingForm,
        action: actionHeatingForm,
      },
      {
        path: "pralma/formularz-podgrzewu/:heatingId/edytuj",
        element: (
          <RequireAdminRoute>
            <HeatingForm />
          </RequireAdminRoute>
        ),
        loader: loaderHeatingForm,
        action: actionHeatingForm,
      },
      {
        path: "pralma/formularz-podgrzewu/:heatingId/skasuj",
        element: (
          <RequireAdminRoute>
            <HeatingForm />
          </RequireAdminRoute>
        ),
        loader: loaderHeatingForm,
        action: actionHeatingForm,
      },
      {
        path: "pralma/formularz-zasilania",
        element: (
          <RequireAdminRoute>
            <VoltageForm />
          </RequireAdminRoute>
        ),
        loader: loaderVoltageForm,
        action: actionVoltageForm,
      },
      {
        path: "pralma/formularz-zasilania/:voltageId/edytuj",
        element: (
          <RequireAdminRoute>
            <VoltageForm />
          </RequireAdminRoute>
        ),
        loader: loaderVoltageForm,
        action: actionVoltageForm,
      },
      {
        path: "pralma/formularz-zasilania/:voltageId/skasuj",
        element: (
          <RequireAdminRoute>
            <VoltageForm />
          </RequireAdminRoute>
        ),
        loader: loaderVoltageForm,
        action: actionVoltageForm,
      },
      {
        path: "pralma/formularz-opcji",
        element: (
          <RequireAdminRoute>
            <OptionForm />
          </RequireAdminRoute>
        ),
        loader: loaderOptionForm,
        action: actionOptionForm,
      },
      {
        path: "pralma/formularz-opcji/:optionId/edytuj",
        element: (
          <RequireAdminRoute>
            <OptionForm />
          </RequireAdminRoute>
        ),
        loader: loaderOptionForm,
        action: actionOptionForm,
      },
      {
        path: "pralma/formularz-opcji/:optionId/skasuj",
        element: (
          <RequireAdminRoute>
            <OptionForm />
          </RequireAdminRoute>
        ),
        loader: loaderOptionForm,
        action: actionOptionForm,
      },
      {
        path: "/pralma/formularz-czesci-zamiennej",
        element: (
          <RequireAdminRoute>
            <SparePartForm />
          </RequireAdminRoute>
        ),
        loader: loaderSparePartForm,
        action: actionSparePartForm,
      },
      {
        path: "/pralma/formularz-czesci-zamiennej/:sparePartId/edytuj",
        element: (
          <RequireAdminRoute>
            <SparePartForm />
          </RequireAdminRoute>
        ),
        loader: loaderSparePartForm,
        action: actionSparePartForm,
      },
      {
        path: "/pralma/formularz-dostawcy",
        element: (
          <RequireAdminRoute>
            <SupplierForm />
          </RequireAdminRoute>
        ),
        loader: loaderSupplierForm,
        action: actionSupplierForm,
      },
      {
        path: "/pralma/formularz-dostawcy/:supplierId/edytuj",
        element: (
          <RequireAdminRoute>
            <SupplierForm />
          </RequireAdminRoute>
        ),
        loader: loaderSupplierForm,
        action: actionSupplierForm,
      },
      {
        path: "/pralma/formularz-dostawcy/:supplierId/skasuj",
        element: (
          <RequireAdminRoute>
            <SupplierForm />
          </RequireAdminRoute>
        ),
        loader: loaderSupplierForm,
        action: actionSupplierForm,
      },
      {
        path: "/wyposazenie-pralni-przemyslowej",
        element: <RootEquipment />,
        children: [
          {
            index: true,
            element: <Categories />,
            loader: loaderCategories,
          },
          {
            path: `:categoryId/skasuj`,
            element: (
              <RequireAdminRoute>
                <Categories />
              </RequireAdminRoute>
            ),
            loader: loaderCategories,
            action: actionCategories,
          },
          {
            path: "pralnia-samoobslugowa",
            element: <VendLaundry />,
            loader: loaderVendLaundry,
          },
          {
            path: "sluzby-cywilne",
            element: <CivilServices />,
            loader: loaderCivilServices,
          },
          { path: "wyposazenie-pralni-dla-hotelu", element: <Hospitality />, },
          { path: "softwash", element: <SoftWash />, },
          { path: "bariera-higieny", element: <HygieneBarrier />, },
          { path: "odzysk-wody-i-energii-w-pralni-przemyslowej", element: <SaveWaterEnergy />, },
          {
            path: "wozki-i-regaly",
            element: <AdditionEquipment />,
            loader: loaderAdditionalEquipment,
            action: actionAdditionalEquipment,
          },
          {
            path: "wozki-i-regaly/:slug/edytuj",
            element: (
              <RequireAdminRoute>
                <AdditionEquipment />
              </RequireAdminRoute>
            ),
            loader: loaderAdditionalEquipment,
            action: actionAdditionalEquipment,
          },
          {
            path: "wozki-i-regaly/:slug/skasuj",
            element: (
              <RequireAdminRoute>
                <AdditionEquipment />
              </RequireAdminRoute>
            ),
            loader: loaderAdditionalEquipment,
            action: actionAdditionalEquipment,
          },
          {
            path: "pranie-mop",
            element: <MOP />,
            loader: loaderMOP,
          },
          {
            path: "zlobki-i-przedszkola",
            element: <Nursery />,
            loader: loaderNursery,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName",
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/skasuj",
            element: <Products />,
            loader: productsLoader,
            action: actionProducts,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model",
            element: <ProductDetails />,
            loader: loaderProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/heating",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/control",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/voltage",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/option",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "szukaj",
            element: <SearchResult />,
            loader: searchLoader,
          },
        ],
      },
      {
        path: "/wyposazenie-pralni-przemyslowej-samoobslugowe",
        element: <RootEquipment />,
        children: [
          {
            index: true,
            element: <Categories coin />,
            loader: loaderCategories,
          },
          {
            path: ":categoryId/skasuj",
            element: (
              <RequireAdminRoute>
                <Categories coin />
              </RequireAdminRoute>
            ),
            loader: loaderCategories,
            action: actionCategories,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName",
            element: <Products coin />,
            loader: productsLoader,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/skasuj",
            element: <Products coin />,
            loader: productsLoader,
            action: actionProducts,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model",
            element: <ProductDetails />,
            loader: loaderProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/heating",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/control",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/voltage",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "urzadzenia-pralnicze/:categoryName/model/:model/priceList/:priceListId/option",
            element: <ProductDetails />,
            loader: loaderProductDetails,
            action: actionProductDetails,
          },
          {
            path: "szukaj",
            element: <SearchResult />,
            loader: searchLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// registerServiceWorkerProduction();
reportWebVitals();
