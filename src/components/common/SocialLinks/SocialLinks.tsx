import styles from './SocialLinks.module.scss'
import iconInstagram from '@/assets/images/icon-insta.svg'
import iconLinkedIn from '@/assets/images/icon-in.svg'
import iconFacebook from '@/assets/images/icon-facebook.svg'
import iconX from '@/assets/images/icon-x.svg'

const SocialLinks = () => {
  const links = [
    { href: 'https://instagram.com', label: 'Instagram', icon: iconInstagram },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: iconLinkedIn },
    { href: 'https://facebook.com', label: 'Facebook', icon: iconFacebook },
    { href: 'https://x.com', label: 'X', icon: iconX },
  ]

  return (
    <div className={styles.socials}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={styles.socialLink}
          aria-label={link.label}
          target="_blank"
          rel="noreferrer"
        >
          <img src={link.icon} alt="" className={styles.icon} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
