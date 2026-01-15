import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.scss";
import heroMain from "@/assets/images/hero-1.jpg";
import heroSecondary from "@/assets/images/hero-2.jpg";
import heroArrow from "@/assets/images/arrow.png";

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const mainImageRef = useRef<HTMLImageElement | null>(null);
  const secondaryImageRef = useRef<HTMLImageElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  const stats = [
    { value: "430K+", label: "Art Works" },
    { value: "159K+", label: "Creators" },
    { value: "87K+", label: "Collections" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textTl = gsap.timeline();

      if (titleRef.current) {
        textTl.from(titleRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      }

      if (descriptionRef.current) {
        textTl.from(descriptionRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
        });
      }

      if (actionsRef.current) {
        textTl.from(actionsRef.current, {
          opacity: 0,
          duration: 2,
          ease: "power1.out",
        });
      }

      if (statsRef.current) {
        textTl.from(
          statsRef.current,
          { y: 12, opacity: 0, duration: 0.5, ease: "power2.out" },
          "+=0.2"
        );
      }

      if (mainImageRef.current) {
        gsap.set(mainImageRef.current, { x: 80, opacity: 0 });
      }
      if (secondaryImageRef.current) {
        gsap.set(secondaryImageRef.current, { x: 80, opacity: 0 });
      }
      if (dotsRef.current) {
        gsap.set(dotsRef.current, { opacity: 0 });
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
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
      if (dotsRef.current) {
        tl.to(
          dotsRef.current,
          { opacity: 0.8, duration: 2, ease: "power1.out" },
          "-=0.1"
        );
      }

      if (arrowRef.current) {
        tl.to(
          arrowRef.current,
          { opacity: 1, duration: 2, ease: "power1.out" },
          "<"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="discover" ref={heroRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            {" "}
            <p className={styles.subtitle} ref={subtitleRef}>
              OVER 1M CREATORS
            </p>
            <h1 className={styles.title} ref={titleRef}>
              Discover And Create NFTs
            </h1>
          </div>
          <p className={styles.description} ref={descriptionRef}>
            Discover, Create and Sell NFTs On Our NFT Marketplace With
            Over Thousands Of NFTs And Get a <span>$20 bonus</span>.
          </p>
          <div className={styles.actions} ref={actionsRef}>
            <button className={styles.primaryButton} type="button">
              EXPLORE MORE
            </button>
            <button className={styles.secondaryButton} type="button">
              CREATE NFT
            </button>
          </div>
          <div className={styles.stats} ref={statsRef}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <span className={styles.statValue}>{item.value}</span>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual} ref={visualRef}>
          <div className={styles.dots} ref={dotsRef} aria-hidden="true" />
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
