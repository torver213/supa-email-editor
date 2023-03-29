import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { sendNewsletter, validateEmail } from "../lib";

const verifyEmails = (emails) => {
  const _emails = emails.split(",");
  _emails.forEach((e) => {
    if (!validateEmail(e)) return false;
  });
  return true;
};

const SendMailModal = ({ isOpenMailModal, toggleMailModal, mailContent }) => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [emails, setEmails] = useState("");
  const handleSubjectInput = (e) => {
    setSubject(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmails(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subject.trim().length < 10) {
        return alert("Enter Email Subject");
      }
      if (emails.trim().length < 10) {
        return alert("Enter a valid email or emails separated by comma");
      }
      if (!verifyEmails(emails)) {
        return alert("Please, enter only valid email addresses");
      }
      // const data = localStorage.getItem('newsletter')
      if (!mailContent) {
        return alert("You can't send empty content");
      }
      setLoading(true);
      const res = await sendNewsletter({ subject, mailContent, emails });
      setSubject("");
      setEmails("");
      setLoading(false);
      alert(res.message);
    } catch (error) {}
  };
  return (
    <>
      <MDBModal staticBackdrop={true} show={isOpenMailModal} tabIndex="-1">
        <MDBModalDialog size="md">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Send Mail</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => toggleMailModal()}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <label htmlFor="formFileSm" className="form-label">
                  Enter Mail Subject
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  placeholder="Enter mail subject"
                  onChange={(e) => handleSubjectInput(e)}
                />
                <div className="mt-2 mb-2">
                  <label htmlFor="formEmail" className="form-label">
                    Enter Email Address(s)
                  </label>
                  <br />
                  <small>
                    You can enter more than one email address separated by comma
                  </small>
                  <textarea
                    id="formEmail"
                    placeholder="Enter Email Address(s)"
                    onChange={(e) => handleEmailInput(e)}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="d-block text-center mt-3">
                  {loading && (
                    <MDBSpinner className="mx-2" color="info">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                  )}
                  <MDBBtn
                    disabled={loading}
                    color="info"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Send Mail
                  </MDBBtn>
                </div>
              </form>
              <hr />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="danger" onClick={() => toggleMailModal()}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default SendMailModal;
