import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CTA.module.scss";
import ctaImage from "@/assets/images/hero-1.jpg";

const CTA = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.cta} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content} ref={textRef}>
          <h2 className={styles.title}>Create and Sell NFTs</h2>
          <p className={styles.subtitle}>World&apos;s Largest NFT Place</p>
          <div className={styles.actions}>
            <button className={styles.primaryButton} type="button">
              Explore More
            </button>
            <button className={styles.secondaryButton} type="button">
              Sell Artwork
            </button>
          </div>
        </div>
        <div className={styles.visual}>
          <img className={styles.image} src={ctaImage} alt="NFT artwork" ref={imageRef} />
        </div>
      </div>
    </section>
  );
};

export default CTA;
