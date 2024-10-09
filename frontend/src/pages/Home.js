import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"training courses"} heading={"Genius Academy"}/>
      <VerticalCardProduct  category={"journals"} heading={"All Genius Journals"}/>
      <VerticalCardProduct  category={"manuscripts"} heading={"Manuscripts"}/>
      <VerticalCardProduct category={"projects"} heading={"Project Topics"}/>
    </div>
  )
}

export default Home