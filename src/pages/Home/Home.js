import React from 'react'
import Hero from './Hero/hero'
import RestaurantSection2 from './Section2/section'
import StatsCounter from './statecounter/stats-counter'
import FeaturesSection from './fetured/features-section'
import DiningPromo from './discount/dining-promo'
export default function Home() {
  return (
    <div>
      <Hero/>
      <RestaurantSection2/>
      <StatsCounter/>
      <FeaturesSection/>
      <DiningPromo/>
    </div>
  )
}
