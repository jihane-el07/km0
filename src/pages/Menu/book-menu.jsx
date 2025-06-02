"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import styles from "./book-menu.module.css"
import { Link } from "react-router-dom"
import HTMLFlipBook from "react-pageflip"
import axios from 'axios';

function joinClassNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function BookMenu() {
  const [menuData, setMenuData] = useState([]);
  const bookRef = useRef(null)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    axios.get('https://km0-api.vercel.app/menu')
      .then(response => {
        setMenuData(response.data);
        console.log('All menu items:', response.data);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }, []);

  const createMenuPages = () => {
    const pages = [
      // Cover page
      {
        id: 0,
        content: (
          <div className={styles.coverPage}>
            <div className={styles.coverContent}></div>
          </div>
        ),
      },
      // Second cover
      {
        id: 1,
        content: (
          <div className={styles.coverPage}>
            <div className={styles.coverContent3}></div>
          </div>
        ),
      }
    ];

    // Add a page for each menu item
    menuData.forEach((item, index) => {
      pages.push({
        id: index + 2,
        content: (
          <div className={styles.coverPage}>
            <div className={styles.menuItemPage}>
              <h2 className={styles.itemTitle}>{item.name}</h2>
              <div className={styles.itemImageContainer}>
                <img src={item.image} alt={item.name} className={styles.menuImage} />
              </div>
              <div className={styles.itemDetails}>
                <p className={styles.itemDescription}>{item.description}</p>
                <p className={styles.itemPrice}><strong>Price:</strong> {item.price} MAD</p>
                <p className={styles.itemCategory}><strong>Category:</strong> {item.category}</p>
                <div className={styles.itemIngredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {item.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.itemAvailability}>
                  <strong>Available:</strong> {item.isAvailable ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        ),
      });
    });
    pages.push(
      {
        id: pages.length,
        content: (
          <div className={styles.coverPage}>
            <div className={styles.coverContent22}></div>
          </div>
        ),
      },
      {
      id: pages.length+1,
      content: (
        <div className={styles.coverPage}>
          <div className={styles.coverContent2}></div>
        </div>
      ),
    });
    return pages;
  };

  const menuPages = createMenuPages();

  const getCurrentPage = () => {
    return bookRef.current ? bookRef.current.pageFlip().getCurrentPageIndex() : 0;
  };

  const nextPage = () => {
    bookRef.current && bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current && bookRef.current.pageFlip().flipPrev();
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const getDisplayedPageNumbers = () => {
    if (!bookRef.current) return "-";
    const currentPageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
    const isCover = currentPageIndex === 0;
    const isBackCover = currentPageIndex === menuPages.length - 1;

    if (isCover) return "Cover";
    if (isBackCover) return "Back Cover";
    return `${currentPageIndex + 1} - ${currentPageIndex + 2}`;
  };

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>Our Special Menu</h1>
          <div className={styles.div}>
            <Link className={styles.Link} to='/'>Home</Link>
            <img src='/images/coffee.png' alt='' />
            <Link className={styles.LinkA} to='/Menu'>Menu</Link>
          </div>
        </div>
      </div>
      <div className={styles.intro}>
        <h3 className={`${styles.subtitle} font-great-vibes`}>Dine Discover Delight</h3>
        <h2 className={`${styles.title} font-playfair`}>KM0 Menu</h2>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.icon}>
            <img src="/images/flower.webp" className={styles.featureIcon1} alt="divider" />
          </span>
          <div className={styles.line}></div>
        </div>
        <p className={`${styles.description} font-lora`}>Discover a menu crafted to bring people together. Rooted in fresh, seasonal ingredients and inspired by the joy of sharing, each dish is a celebration of flavor and community. Whether you're here for a quiet meal or a festive gathering, every bite is made to spark connection, comfort, and a reason to smile.</p>
      </div>
      <div className={styles.bookMenuContainer}>
        <div className={styles.bookWrapper} ref={bookRef} style={{ transform: `scale(${zoom})` }}>
          <HTMLFlipBook
            width={450}
            height={533}
            size="stretch"
            showCover={true}
            showPageCorners={true}
            mobileScrollSupport={true}
            ref={bookRef}
          >
            {menuPages.map((page) => (
              <div key={page.id} className={styles.page}>
                {page.content}
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={prevPage}><ChevronLeft /></button>
          <button className={styles.controlButton} onClick={zoomOut}><ZoomOut /></button>
          <button className={styles.controlButton} onClick={zoomIn}><ZoomIn /></button>
          <button className={styles.controlButton} onClick={nextPage}><ChevronRight /></button>
        </div>
      </div>
    </>
  );
}