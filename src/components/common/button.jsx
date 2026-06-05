const Navbutton = ({ direction, onClick }) => {
  return (
    <button
      className={`nav-btn ${direction}`}
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
    >
      <span className="arrow"></span>
    </button>
    
  );
};
export default Navbutton;

  