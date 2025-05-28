import React from 'react'
import Breadcrumb from './Breadcrumb'
import Sidebar from './Sidebar'
import ProductGride from './ProductCategory'
import styles from "./Products.module.css"
import Header from './header/Header'
import ProductCategory from './ProductCategory'

export default function Products() {
  return (
     <div className={styles.app}>
      <Header />
      <Breadcrumb />
      <div className={styles.mainContent}>
        <Sidebar />
        <ProductCategory />
      </div>
    </div>
  )
}
