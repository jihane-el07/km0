import React from 'react'
import Hero from './Hero/hero'
import RestaurantSection2 from './Section2/section'
import StatsCounter from './statecounter/stats-counter'
import FeaturesSection from './fetured/features-section'
export default function Home() {
  return (
    <div>
      <Hero/>
      <RestaurantSection2/>
      <StatsCounter/>
      <FeaturesSection/>
    </div>
  )
}
