import { Button } from "@mui/material";

const Navbar = ({ len, current, setOpen }) => {
  return (
    <div className="navbar">
      <div className="navbar__title">
        <h1>Final Exam</h1>
      </div>
      {len ? (
        <>
          <div className="navbar__current">
            <h2>
              {current + 1}/{len}
            </h2>
          </div>
          <div className="navbar__finish">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpen(true);
              }}
            >
              Finish
            </Button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
