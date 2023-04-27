import React, { useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import * as api from "../api/products";

import Cards from "../components/Cards/Cards";
import Card from "../components/Card/Card";
import ModelName from "../components/ModelName/ModelName";
import NoItems from "../components/NoItems/NoItems";
import Overlay from "../components/Overlay/Overlay";
import List from "../components/Overlay/List/List";
import Button from "../components/Overlay/Button/Button";
import Thumbnail from "../components/Overlay/Thumbnail/Thumbnail";
import PageTitle from "../components/PageTitle/PageTitle";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchFrom";
import Footer from "./Footer/Footer";
import { v4 as uuidv4 } from "uuid";

import BG_1 from "../images/bg_header/bg_urzadzenia_pralnicze_search_1.webp";
import BG_2 from "../images/bg_header/bg_urzadzenia_pralnicze_search_2.webp";
import BG_3 from "../images/bg_header/bg_urzadzenia_pralnicze_search_3.webp";
import BG_8 from "../images/bg_header/bg_urzadzenia_pralnicze_search_8.webp";
import BG_13 from "../images/bg_header/bg_urzadzenia_pralnicze_search_13.webp";

const bgImages = [
  { id: uuidv4(), src: BG_2, position: "object-top" },
  { id: uuidv4(), src: BG_13, position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_1, position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_3, position: "object-center" },
  { id: uuidv4(), src: BG_8, position: "object-center" },
];
const boxes = [
  [0, 0, 7, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 9, 7],
  [0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 8, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
];

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("title");
  const data = { products: [], queryTitle: query };
  try {
    const products = await api.getProducts(query);
    data.products = products;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export default function SearchResult() {
  const data = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [navigation.location]);

  return (
    <>
      <Header
        boxes={boxes}
        images={bgImages}
        bgGradient='bg-gradient-radial-circle-from-cc-admin'
        title='Znajdź przemysłowe urządzenia pralnicze odpowiednie do Swoich potrzeb'>
        <SearchForm queryTitle={data.queryTitle} />
      </Header>
      <main className='px-8 pb-12'>
        <PageTitle text='Szukane produkty' />
        <div className='grid xl:grid-cols-1-300 xl:gap-x-6'>
          {/** Result searching products */}
          {data.products.length ? (
            <Cards>
              {data.products.map((product) => (
                <Card
                  key={product._id}
                  item={product}
                  to={`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${product.cat[0].slug}/model/${product.model}`}
                  btnLabel='szczegóły'
                  widthImg={`${product.wide ? "max-w-[400px]" : "max-w-[200px]"}`}
                  heightImg='max-h-[290px]'>
                  <ModelName name={product.model} />
                  <h3 className='order-3'>{product.title}</h3>
                  <Overlay>
                    <Thumbnail src={product.icon} alt={`${product.title}_thumbnail`} />
                    <List list_items={product.features} />
                    <Button label='szczegóły' />
                  </Overlay>
                </Card>
              ))}
            </Cards>
          ) : (
            <NoItems msg='Brak produktów spełniających podane kryteria wyszukiwania ' />
          )}
          <AsideLinks />
        </div>
      </main>
      <Footer />
    </>
  );
}
