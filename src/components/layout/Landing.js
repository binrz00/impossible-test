import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";

export default function() {
  return (
    <div style={{ height: "75vh" }}>
      <Box align="center" justify="center">
        <h4>
          <b>Welcome to fun games.com</b>
        </h4>
        <p>
          <b>Log in to start gaming</b>
          <br />
          <b>new to fun games? signing up is free!</b>
        </p>
        <br />
        <div>
          <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
          >
            Log In
          </Link>
        </div>
      </Box>
    </div>
  );
}
