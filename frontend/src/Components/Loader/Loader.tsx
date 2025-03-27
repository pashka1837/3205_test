import styles from "./Loader.module.css";

type LoaderProps = {
  height?: number;
  width?: number;
  isLoad: boolean;
};

export function Loader({ height = 48, width = 48, isLoad }: LoaderProps) {
  if (!isLoad) return null;
  return (
    <div className={styles.loaderOuter}>
      <span className={styles.loader} style={{ height, width }}></span>;
    </div>
  );
}
