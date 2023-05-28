import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#FFFFFF", style = "medium" }) => {
  return (
    <span className={style === "small" ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export { LoadingDots };
