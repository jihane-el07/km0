import React from 'react'
import Breadcrumb from './Breadcrumb'
import Sidebar from './Sidebar'
import ProductGride from './ProductCategory'
import styles from "./Products.module.css"
import ProductCategory from './ProductCategory'

export default function Products({ addToCart }) {
  return (
     <div className={styles.app}>
      <Breadcrumb />
      <div className={styles.mainContent}>
        <Sidebar />
        <ProductCategory addToCart={addToCart} />
      </div>
    </div>
  )
}
