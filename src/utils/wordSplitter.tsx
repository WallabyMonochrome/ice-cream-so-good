export const splitTextToSpans = (text: string, shouldOverflow: boolean = false) => {
  return (
    <div
      style={{
        position: "relative",
        textAlign: "left",
      }}
    >
      <div
        style={{
          counterIncrement: "section",
          overflow: "hidden"
        }}
      >
        {text.split(" ").map((word: string, wordIndex: number) => (
          <span key={`word_${wordIndex}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char: string, charIndex: number) => (
              <span
                key={`${char}_${charIndex}`}
                style={{
                  // overflow: `${shouldOverflow ? "" : "hidden"}`,
                  zIndex: 1,
                }}
              >
                <span style={{ display: "inline-block" }} className="char">
                  {char}
                </span>
              </span>
            ))}
            {/* Add a space between words */}
            <span style={{ display: "inline-block", whiteSpace: "pre" }}>{" "}</span>
          </span>
        ))}
      </div>
    </div>
  );
};