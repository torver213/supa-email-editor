import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

const PreviewFiles = ({ files }) => {
  if (files.length === 0) return null;
  return (
    <MDBRow className="mt-3">
      {files.map((f) => (
        <MDBCol lg="2" sm="6" key={f.url} className="mt-2">
          <img
            src={f.url}
            className="img-fluid hover-shadow"
            alt={f.url}
            style={{
              width: "100%",
              height: 100,
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
        </MDBCol>
      ))}
    </MDBRow>
  );
};

export default PreviewFiles;
