import { Box, Grid, Typography } from "@mui/material";
import ImgMediaCard from "../components/card";

const RenderContents = ({ products, page }) => {
  const filter = products.filter(
    (product) => product.type.toLowerCase() === page
  );
  
  return (
    <>
      {page ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            position: "sticky",
            top: 50,
            zIndex: 1,
            backdropFilter: "blur(5px)",
            padding: "12px 30px",
            marginBottom: 2,
            color: "#0066cc",
            boxShadow: "0 0 5px #0088cc90",
            background: "#0088cc10",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textTransform="capitalize"
            fontWeight={"bold"}
          >
            {page}
          </Typography>
          <Typography
            variant="body"
            component="p"
            fontWeight={"bold"}
            gutterBottom
          >
            Jami : {products.length} ta
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <div
        className="products"
        style={{
          padding: "0px 15px",
        }}
      >
        {filter && filter.length > 0 ? (
          <Grid container spacing={2}>
            {filter.map((e, index) => (
              <Grid item key={index}>
                <ImgMediaCard item={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.2rem",
            }}
          >
            No Products
          </p>
        )}
      </div>
    </>
  );
};

export default RenderContents;
