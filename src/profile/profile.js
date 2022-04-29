import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  MdCall,
  MdEmail,
  MdLocationPin,
  MdMessage,
  MdSell,
  MdShoppingBag,
} from "react-icons/md";
import { options } from "../devdata";
import ImgMediaCard from "../components/card";
const Profile = () => {
  let params = useParams();
  const [profileData, setProfileData] = useState(null);

  const getProfile = async (username) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/users/" + username
      );
      setProfileData(data.data);
    } catch (error) {
      setProfileData(JSON.parse(error.request.responseText));
      console.log("error from profile");
    }
  };

  useEffect(() => {
    getProfile(params.username);
  }, [params]);

  const [cols, setCols] = useState(null);

  //   when window resizes cols
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
        setCols(12);
      } else if (window.innerWidth < 700) {
        setCols(6);
      } else if (window.innerWidth < 900) {
        setCols(4);
      } else {
        setCols(3);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="profile">
      {profileData ? (
        profileData.status !== "failed" ? (
          <>
            <div className="profile__head">
              <div className="profile__header">
                <div className="profile__header-image">
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img src="https://picsum.photos/400/200" alt="" />
                  </div>
                  <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    size={"large"}
                    sx={{
                      margin: "2%",
                    }}
                  />
                  <Link to={"/user/" + profileData.username} reloadDocument>
                    <Typography
                      variant="body"
                      component={"p"}
                      gutterBottom
                      color={"#00f"}
                    >
                      @{profileData.username}
                    </Typography>
                  </Link>
                </div>
                <div className="profile__header-info">
                  <Stack
                    width={"100%"}
                    justifyContent={"space-between"}
                    direction={"row"}
                    alignItems="center"
                    paddingRight={"5%"}
                  >
                    <Typography
                      variant="h4"
                      component={"h4"}
                      gutterBottom
                      className="profile__header-info__h4"
                    >
                      {profileData.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      component={"p"}
                      sx={{
                        color: "#00f",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {profileData.type === "seller" ? (
                        <MdShoppingBag fill="navy" />
                      ) : (
                        <MdSell fill="navy" />
                      )}
                      {"  "}
                      {profileData.type}
                    </Typography>
                  </Stack>
                  <Link
                    to={"/location/" + profileData?.location.replace(" ", "")}
                    reloadDocument
                    style={{
                      color: "blue",
                    }}
                  >
                    <MdLocationPin />
                    {profileData.location}
                  </Link>

                  <Typography
                    variant="body"
                    component={"p"}
                    color="text.secondary"
                    gutterBottom
                  >
                    {profileData.bio}lorem ipsum dole amet
                  </Typography>

                  <Stack
                    width={"100%"}
                    spacing={2}
                    direction={"row"}
                    margin="20px 0"
                    overflow={"scroll"}
                  >
                    <a href={`/chat/${profileData.username}`}>
                      <Button variant="contained">
                        <MdMessage
                          size={"1.2rem"}
                          style={{
                            marginRight: "0.5rem",
                          }}
                        />
                        <p className="none">message</p>
                      </Button>
                    </a>
                    <a href={`mailto:${profileData.email}`}>
                      <Button variant="outlined">
                        <MdEmail
                          size={"1.2rem"}
                          style={{
                            marginRight: "0.5rem",
                          }}
                        />{" "}
                        <p className="none">email</p>
                      </Button>
                    </a>

                    <a href={`tel:${profileData.tel}`} type="tel">
                      <Button variant="outlined">
                        <MdCall
                          size={"1.2rem"}
                          style={{
                            marginRight: "0.5rem",
                          }}
                        />
                        <p className="none">Tel</p>
                      </Button>
                    </a>
                  </Stack>
                </div>
              </div>
            </div>

            <Stack
              spacing={5}
              direction="row"
              marginTop={2}
              overflow={"scroll"}
              width="100%"
            >
              {options
                .filter((option) => profileData.products.includes(option.type))
                .map((item, index) => (
                  <Stack alignItems={"center"} spacing={1} key={index}>
                    <IconButton
                      sx={{
                        color: "#00f",
                        fontSize: "2rem",
                        backgroundColor: "#fff",
                        width: "fit-content",
                        padding: "0.5rem",
                      }}
                    >
                      {item.icon}
                    </IconButton>
                    <Typography variant="body2" component={"p"} gutterBottom>
                      {item.type}
                    </Typography>
                  </Stack>
                ))}
            </Stack>
            <Divider
              sx={{
                my: "1rem",
              }}
            />

            <Grid container spacing={2}>
              {profileData.requests.map((e, index) => (
                <Grid item xs={cols} key={index} className="profile__grid">
                  <ImgMediaCard item={e} hide={"hide"} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <div className="profile__error">
            <Typography
              variant="body"
              component={"p"}
              gutterBottom
              position={"absolute"}
              top={"50%"}
              left={"50%"}
              color="error"
              sx={{
                transform: "translate(-50%, -50%)",
              }}
            >
              {profileData.data}
            </Typography>
          </div>
        )
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Profile;
