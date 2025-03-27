type ButtonProps = {
  handleClick(): Promise<void>;
  text: string;
};

export function Button({ handleClick, text }: ButtonProps) {
  return (
    <button className="infoBtn" type="button" onClick={handleClick}>
      {text}
    </button>
  );
}
