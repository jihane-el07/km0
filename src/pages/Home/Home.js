import React from 'react'
import Hero from './Hero/hero'
import RestaurantSection2 from './Section2/section'
import StatsCounter from './statecounter/stats-counter'
import FeaturesSection from './fetured/features-section'
import DiningPromo from './discount/dining-promo'
import SeasonalMenu from './seasonalmenu/seasonal-menu'
import PatesserieGrid from './Patesseriesection/PatesserieGrid'
export default function Home() {
  return (
    <div>
      <Hero/>
      <RestaurantSection2/>
      <StatsCounter/>
      <FeaturesSection/>
      <DiningPromo/>
      <SeasonalMenu/>
      <PatesserieGrid/>
    </div>
  )
}
