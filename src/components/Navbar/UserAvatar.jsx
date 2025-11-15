/**
 * UserAvatar component - displays user photo or fallback with first letter
 * @param {Object} user - User object with photoURL and displayName/email
 * @param {string} className - Additional CSS classes
 * @param {number} size - Size of the avatar (default: 40px)
 */
const UserAvatar = ({ user, className = "", size = 40 }) => {
  if (!user) return null;

  const photoURL = user.photoURL;
  const displayName = user.displayName || "";
  const email = user.email || "";
  
  // Get first letter from displayName or email
  const getInitial = () => {
    if (displayName) {
      return displayName.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "?";
  };

  const initial = getInitial();

  // If photoURL exists, show image
  if (photoURL) {
    return (
      <img
        className={className}
        src={photoURL}
        alt={displayName || email || "User"}
        style={{ width: `${size}px`, height: `${size}px` }}
        onError={(e) => {
          // If image fails to load, show fallback
          e.target.style.display = "none";
          const fallback = e.target.nextSibling;
          if (fallback) {
            fallback.style.display = "flex";
          }
        }}
      />
    );
  }

  // Show fallback with first letter
  return (
    <div
      className={`rounded-full bg-[#357fa7] text-white font-bold flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`,
      }}
      title={displayName || email || "User"}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;

