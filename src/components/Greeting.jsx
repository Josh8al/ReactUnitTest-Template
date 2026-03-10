/**
 * Greeting Component - Simple presentational component
 */
function Greeting({ name, time }) {
  const getGreeting = () => {
    if (!time && time !== 0) {
      return "Hello";
    }

    const hour = typeof time === "number" ? time : new Date(time).getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  const displayName = name?.trim() || "Guest";
  const greeting = getGreeting();

  return (
    <div className="greeting" data-testid="greeting">
      <h1 data-testid="greeting-message">
        {greeting}, {displayName}!
      </h1>
      {displayName === "Guest" && (
        <p data-testid="guest-prompt">
          Please sign in to personalize your experience.
        </p>
      )}
    </div>
  );
}

export default Greeting;
