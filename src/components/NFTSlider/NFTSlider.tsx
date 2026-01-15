import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NFTSlider.module.scss";
import NFTCard from "./NFTCard";
import type { AppDispatch } from "@/store";
import {
  fetchNFTs,
  selectNFTStatus,
  selectNFTs,
} from "@/store/slices/nftSlice";
import type { NFTCardData } from "@/types";
import { generateBid } from "@/utils/generateBid";
import { generateTimer } from "@/utils/generateTimer";
import { getRandomImage } from "@/utils/getRandomImage";

const GAP = 16;
const CARD_WIDTH = 210;

const NFTSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectNFTStatus);
  const nfts = useSelector(selectNFTs);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    delta: 0,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNFTs());
    }
  }, [dispatch, status]);

  const cards = useMemo<NFTCardData[]>(() => {
    return nfts.slice(0, 12).map((item, idx) => ({
      id: `${item.name}-${idx}`,
      name: item.name,
      image: getRandomImage(),
      timer: generateTimer(),
      currentBid: generateBid(),
    }));
  }, [nfts]);

  const extendedCards = useMemo(() => {
    if (cards.length === 0) return [];
    return [...cards, ...cards, ...cards];
  }, [cards]);

  useEffect(() => {
    if (cards.length === 0) return;
    setIndex(cards.length);
  }, [cards.length]);

  const slideWidth = CARD_WIDTH;
  const translateX = -(index * (slideWidth + GAP));
  const currentTranslate = dragState.isDragging
    ? translateX + dragState.delta
    : translateX;

  const handleMove = (direction: number) => {
    if (cards.length === 0) return;
    setIsAnimating(true);
    setIndex((prev) => prev + direction);
  };

  const handleTransitionEnd = () => {
    if (cards.length === 0) return;
    const total = cards.length;
    const maxIndex = total * 2;
    if (index >= maxIndex) {
      setIsAnimating(false);
      setIndex(total + (index % total));
      return;
    }
    if (index < total) {
      setIsAnimating(false);
      const normalized = ((index % total) + total) % total;
      setIndex(total + normalized);
      return;
    }
    setIsAnimating(false);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (cards.length === 0) return;
    setDragState({ isDragging: true, startX: event.clientX, delta: 0 });
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.isDragging) return;
    setDragState((prev) => ({
      ...prev,
      delta: event.clientX - prev.startX,
    }));
  };

  const onPointerUp = () => {
    if (!dragState.isDragging) return;
    const threshold = slideWidth * 0.2;
    if (dragState.delta > threshold) {
      handleMove(-1);
    } else if (dragState.delta < -threshold) {
      handleMove(1);
    } else {
      setIsAnimating(true);
    }
    setDragState({ isDragging: false, startX: 0, delta: 0 });
  };

  const onPointerLeave = () => {
    if (dragState.isDragging) {
      onPointerUp();
    }
  };

  return (
    <section className={styles.sliderSection} id="slider">
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Weekly - Top NFT</h2>
      </div>

      <div className={styles.sliderViewport}>
        {status === "loading" && (
          <div className={styles.state}>Loading NFTs...</div>
        )}
        {status === "failed" && (
          <div className={styles.state}>Failed to load NFTs</div>
        )}
        {status !== "loading" && cards.length === 0 && (
          <div className={styles.state}>No NFTs yet</div>
        )}

        {cards.length > 0 && (
          <div
            className={`${styles.track} ${
              isAnimating ? styles.trackAnimating : ""
            }`}
            style={{
              transform: `translate3d(${currentTranslate}px, 0, 0)`,
              gap: `${GAP}px`,
            }}
            onTransitionEnd={handleTransitionEnd}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
          >
            {extendedCards.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className={styles.slide}
                style={{ width: `${slideWidth}px` }}
              >
                <NFTCard nft={card} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => handleMove(-1)}
          aria-label="Previous"
        >
          <svg
            className={styles.controlIcon}
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10.25 3.375H1.625M1.625 3.375L4.3125 1M1.625 3.375L4.3125 5.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className={styles.divider} aria-hidden="true" />
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => handleMove(1)}
          aria-label="Next"
        >
          <svg
            className={styles.controlIcon}
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0.75 3.375H9.375M9.375 3.375L6.6875 1M9.375 3.375L6.6875 5.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NFTSlider;
