export function MetallicText({
  text,
  className = ""
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={`${className} inline-block bg-gradient-to-b from-gray-100 via-gray-300 to-gray-200 bg-clip-text text-transparent`}
      style={{
        fontFamily: 'var(--font-geist-sans)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, #f5f5f5 0%, #b0b0b0 50%, #e8e8e8 100%)',
      }}
    >
      {text}
    </span>
  );
}

