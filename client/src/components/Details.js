import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
const Details = (props) => {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            {props.job.jobTitle}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Job Description</h4>
            <p style={{ whiteSpace: "pre-wrap" }}>{props.job.jobDesc}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onClose}>Close</Button>
            <a href={props.job.link}>Apply</a>
        </Modal.Footer>
        </Modal>
    );
    };

export default Details;