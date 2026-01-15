import styles from "./NFTSlider.module.scss";

const NFTCardSkeleton = () => {
  return (
    <article className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonInfo}>
            <div className={styles.skeletonBidLabel} />
            <div className={styles.skeletonBidValue} />
          </div>
          <div className={styles.skeletonButton} />
        </div>
      </div>
    </article>
  );
};

export default NFTCardSkeleton;
