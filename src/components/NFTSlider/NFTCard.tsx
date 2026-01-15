import { useRef } from "react";
import styles from "./NFTCard.module.scss";
import bidIcon from "@/assets/images/icon-bid.svg";
import type { NFTCardProps } from "@/types";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { generateBid } from "@/utils/generateBid";
import { getRandomImage } from "@/utils/getRandomImage";

const parseTimer = (value?: string) => {
  if (!value) {
    return null;
  }

  const match = value.match(/(\d+)h\s+(\d+)m\s+(\d+)s/);
  if (!match) {
    return null;
  }

  const hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const seconds = Number.parseInt(match[3], 10);

  if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return null;
  }

  return { hours, minutes, seconds };
};

const formatTime = (value: number) => value.toString().padStart(2, "0");

const NFTCard = ({ nft, className }: NFTCardProps) => {
  const initialTimeRef = useRef<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  if (!initialTimeRef.current) {
    const parsed = parseTimer(nft.timer);
    initialTimeRef.current = parsed ?? {
      hours: Math.floor(Math.random() * 24) + 1,
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60),
    };
  }

  const bidRef = useRef(nft.currentBid || generateBid());
  const imageRef = useRef(nft.image || getRandomImage());

  const { hours, minutes, seconds } = useCountdownTimer({
    initialHours: initialTimeRef.current.hours,
    initialMinutes: initialTimeRef.current.minutes,
    initialSeconds: initialTimeRef.current.seconds,
  });

  return (
    <article className={`${styles.card} ${className ?? ""}`.trim()}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={imageRef.current} alt={nft.name} />
        <div className={styles.timer}>
          {`${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(
            seconds
          )}s`}
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{nft.name}</h3>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.bid}>
              <span className={styles.bidLabel}>Current bid</span>
              <span className={styles.bidValue}>
                <img className={styles.bidIcon} src={bidIcon} alt="" aria-hidden="true" />
                {bidRef.current}
              </span>
            </div>
          </div>
          <button className={styles.bidButton} type="button">
            PLACE BID
          </button>
        </div>
      </div>
    </article>
  );
};

export default NFTCard;
