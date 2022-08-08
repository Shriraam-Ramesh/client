import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import moment from "moment";
export default function ViewEmployeeModal({ data, modalShow, toggle }) {
  return (
    <div>
      <Modal isOpen={modalShow} className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>
          <span style={{ fontWeight: "bold" }}>Employee Details</span>
        </ModalHeader>
        <ModalBody>
          <div>
            <span style={{ fontWeight: "bold" }}>Name: </span>
            <span>{data && data.Name ? data.Name : "NA"}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Age: </span>
            <span>{data && data.Age ? data.Age : "NA"}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>City: </span>
            <span>{data && data.City ? data.City : "NA"}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Created At: </span>
            <span>
              {data && data.createdTime
                ? moment(data.createdTime).format("MMMM Do YYYY, h:mm a")
                : "NA"}
            </span>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
