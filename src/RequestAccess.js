import React from "react";

function RequestAccess({ email }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Access Denied</h2>
      <p>The email <strong>{email}</strong> is not authorized to access this chat.</p>
      <p>Please contact the administrator to request access.</p>
    </div>
  );
}

export default RequestAccess;
