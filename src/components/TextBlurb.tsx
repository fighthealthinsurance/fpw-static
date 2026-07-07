import styles from "./TextBlurb.module.css";

interface TextBlurbProps {
  title: string;
  text: React.ReactNode | string | string[];
  className?: string;
}

export default function TextBlurb({ title, text, className }: TextBlurbProps) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.subTitle}>
        {Array.isArray(text) ? (
          text.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))
        ) : typeof text === "string" ? (
          <p>{text}</p>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
