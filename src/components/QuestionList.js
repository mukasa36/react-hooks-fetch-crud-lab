import QuestionItem from "./QuestionItem";
function QuestionList({ questions , handleDelete}) {
  

  return (
    <div>
      {questions.map((question, index )=> (
        <QuestionItem key= {index} question={question}/>
      ))}
    </div>
  );
}
export default QuestionList;