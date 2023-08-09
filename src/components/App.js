import React, { useState, useEffect } from 'react';
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";



function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    // Fetch data from the API and update state
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuestions(data)});
  }, []);

  const handleDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(`http://localhost:4000/questions/${id}`, requestOptions)
      .then(() => {
        // Update state to remove the deleted question
        setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
      });
  };
  const handleFormSubmit = (formData) => {
    

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    fetch('http://localhost:4000/questions', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Update state to include the new question
        setQuestions(prevQuestions => [...prevQuestions, data]);
      });
  };



  return (
    <div>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleFormSubmit ={handleFormSubmit} /> : <QuestionList handleDelete ={handleDelete} questions={questions} />}
    </div>
  );
}

export default App;