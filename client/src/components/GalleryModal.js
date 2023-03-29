import React from "react";
import { MDBRow, MDBCol, MDBSpinner, MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from "mdb-react-ui-kit";
import PreviewFiles from "./PreviewFiles";
import { CopyToClipboard } from 'react-copy-to-clipboard'

const GalleryModal = ({
  isOpen,
  toggleModal,
  photoFiles,
  handleFileUpload,
  handleFileInputChange,
  rawFiles,
  loading,
}) => {
  return (
    <>
      <MDBModal staticBackdrop={true} show={isOpen} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Media Gallery</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => toggleModal()}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <label htmlFor="formFileSm" className="form-label">
                  Select File(s)
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  onChange={(e) => handleFileInputChange(e)}
                  multiple
                  type="file"
                />
                {/* preview files */}
                <PreviewFiles files={rawFiles} />

                <div className="d-block text-center mt-3">
                  {loading && (
                    <MDBSpinner className="mx-2" color="info">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                  )}
                  <MDBBtn
                    disabled={loading}
                    color="info"
                    onClick={(e) => handleFileUpload(e)}
                  >
                    Upload
                  </MDBBtn>
                </div>
              </form>
              <hr />
              <MDBRow id="mediaLibrary">
                {photoFiles.map((f) => (
                  <MDBCol className="images mb-2" lg="4" key={f.id}>
                    <img
                      src={f.url}
                      id={f.id}
                      className="img-fluid hover-shadow"
                      alt={f.filename}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        cursor: "pointer",
                        zIndex: "2",
                        borderRadius: 5,
                      }}
                    />
                    <div className="d-block text-center">
                      
                        <CopyToClipboard text={f.url}>
                          <MDBBtn rounded>
                          Copy
                          </MDBBtn>
                        </CopyToClipboard>
                    </div>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="danger" onClick={() => toggleModal()}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default GalleryModal;
