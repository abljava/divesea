import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.scss";
import heroMain from "@/assets/images/hero-1.jpg";
import heroSecondary from "@/assets/images/hero-2.jpg";
import heroArrow from "@/assets/images/arrow.png";

const Hero = () => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const mainImageRef = useRef<HTMLImageElement | null>(null);
  const secondaryImageRef = useRef<HTMLImageElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);

  const stats = [
    { value: "430K+", label: "Art Works" },
    { value: "159K+", label: "Creators" },
    { value: "87K+", label: "Collections" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (mainImageRef.current) {
        gsap.set(mainImageRef.current, { x: 80, opacity: 0 });
      }
      if (secondaryImageRef.current) {
        gsap.set(secondaryImageRef.current, { x: 80, opacity: 0 });
      }
      if (arrowRef.current) {
        gsap.set(arrowRef.current, { opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 0.25 });
      if (mainImageRef.current) {
        tl.to(mainImageRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (secondaryImageRef.current) {
        tl.to(
          secondaryImageRef.current,
          {
            x: 0,
            opacity: 0.75,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (arrowRef.current) {
        tl.to(
          arrowRef.current,
          { opacity: 1, duration: 2, ease: "power1.out" },
          "-=0.1"
        );
      }
    }, visualRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="discover">
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            {" "}
            <p className={styles.subtitle}>OVER 1M CREATORS</p>
            <h1 className={styles.title}>Discover And Create NFTs</h1>
          </div>
          <p className={styles.description}>
            Discover, Create and Sell NFTs On Our NFT Marketplace<br></br> With
            Over Thousands Of NFTs And Get a <span>$20 bonus</span>.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryButton} type="button">
              EXPLORE MORE
            </button>
            <button className={styles.secondaryButton} type="button">
              CREATE NFT
            </button>
          </div>
          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <span className={styles.statValue}>{item.value}</span>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual} ref={visualRef}>
          <div className={styles.dots} aria-hidden="true" />
          <img
            ref={mainImageRef}
            className={styles.mainImage}
            src={heroMain}
            alt="NFT artwork"
          />
          <img
            ref={secondaryImageRef}
            className={styles.secondaryImage}
            src={heroSecondary}
            alt=""
            aria-hidden="true"
          />
          <img
            ref={arrowRef}
            className={styles.arrow}
            src={heroArrow}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
