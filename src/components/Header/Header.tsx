import { useState } from 'react'
import styles from './Header.module.scss'
import logoImg from '@/assets/images/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = ['DISCOVER', 'CREATORS', 'SELL', 'STATS']

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <a href="/" className={styles.logo}>
          <img
            src={logoImg}
            alt="DiveSea Logo"
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>DiveSea</span>
        </a>

        {/* Навигационное меню (desktop) */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={styles.navLink}>
              {link}
            </a>
          ))}
        </nav>

        {/* Кнопка CONNECT WALLET (desktop) */}
        <button className={styles.connectButton} type="button">
          CONNECT WALLET
        </button>

        {/* Hamburger menu (mobile) */}
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              className={styles.mobileConnectButton}
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              CONNECT WALLET
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
