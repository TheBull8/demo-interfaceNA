import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <img src="https://i.gifer.com/ZKZg.gif" alt="loader" />
      </div>
    ),
  });

  return <Component />;
};
