import styles from './Footer.module.scss'
import logo from '@/assets/images/logo.svg'
import SocialLinks from '@/components/common/SocialLinks/SocialLinks'

const Footer = () => {
  const links = ['Privacy Policy', 'Term & Conditions', 'About Us', 'Contact']

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        <a href="/" className={styles.brand}>
          <img src={logo} alt="DiveSea logo" className={styles.logo} />
          <span className={styles.brandText}>DiveSea</span>
        </a>
        <nav className={styles.nav}>
          {links.map((link) => (
            <a key={link} href="#" className={styles.navLink}>
              {link}
            </a>
          ))}
        </nav>
        <div className={styles.socials}>
          <SocialLinks />
        </div>
        <div className={styles.divider} />
        <div className={styles.copy}>© 2023 DiveSea All Rights Reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
