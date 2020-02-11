import React, { useContext } from "react";
import { Box, Button } from "grommet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/auth";

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <div
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <Box direction="row" align="center" justify="center">
          <div>
            <h4>
              <b>Hello,</b> {user.name.split(" ")[0]}
              <p>Welcome back to Gamer Weekly's 2025 top gaming site!</p>
            </h4>

            <Button
              onClick={e => {
                e.preventDefault();
                logoutUser();
              }}
              label="Logout"
            />
          </div>
        </Box>
      </div>
      <Box align="center" justify="center">
        <Box align="center" justify="center">
          <Link to="/game">
            <Button label="start game" />
          </Link>
        </Box>
      </Box>
    </>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
