export const TabButton = ({ children, isSelected, onClick, index }) => {
  return (
    <button
      className={isSelected ? 'selected-btn' : 'default-btn'}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
};
