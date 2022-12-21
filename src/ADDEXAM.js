import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = () => {
  return (
    <>
      <h1 style={{color: "red"}}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);

              






const Addexam = ({ onAdd }) => {
  const [exam_name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [remarks, setremarks] = useState("");
  const [Examid, setExamid] = useState(null);
  const [Exams, setExams] = useState([]);

  useEffect(() => {
    refreshExams();
  }, []);

  const refreshExams = () => {
    API.get("exam/")
      .then((res) => {
        setExams(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setExamid(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { exam_name, description, remarks };
    API.post("exam/", item).then(() => refreshExams());
  };

  const onUpdate = (id) => {
    let item = { exam_name, description, remarks };
    API.put(`exam/${id}`,item).then((res) => refreshExams());
  };

  const onDelete = (id) => {
    API.delete(`exam/${id}`).then((res) => refreshExams());
    
  };

  function selectExam(id) {
    let item = Exams.filter((exam) => exam.id === id)[0];
    setName(item.exam_name);
    setdescription(item.description);
    setremarks(item.remarks);
    setExamid(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Exam</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{Examid}Exam_name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Exam name"
                value={exam_name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Remarks"
                value={remarks}
                onChange={(e) => setremarks(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Do you really want to save this exam?"
                  )
                  if (confirmBox === true) {
                    onSubmit()
                  }
                }} 
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(Examid)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Exam Name</th>
                <th scope="col">Description</th>
                <th scope="col">Remarks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Exams.map((exam, index) => {
                return (
                  <tr key="">
                    <th scope="row">{exam.id}</th>
                    <td> {exam.exam_name}</td>
                    <td>{exam.description}</td>
                    <td>{exam.remarks}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectExam(exam.id)}
                      ></i></td>
                      <td>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() =>{
                          const confirmBox = window.confirm(
                            "Do you really want to delete this exam?"
                          )
                          if (confirmBox === true) {
                            onDelete(exam.id)
                          }
                        }} 
                      ></i>
                    </td>
                  </tr>
                );
              })}
            
               
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Addexam;