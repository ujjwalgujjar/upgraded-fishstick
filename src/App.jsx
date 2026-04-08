import React, { useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState('admin'); 
  const [isLocked, setIsLocked] = useState(true);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Input states
  const [qText, setQText] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [ans, setAns] = useState('');

  const addQuestion = (e) => {
    e.preventDefault();
    const newQ = { 
      questionText: qText, 
      options: [opt1, opt2, opt3, opt4], 
      answer: ans 
    };
    setQuestions([...questions, newQ]);
    setQText(''); setOpt1(''); setOpt2(''); setOpt3(''); setOpt4(''); setAns('');
    alert("Question Added!");
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1a73e8' }}>Quiz Master Dashboard</h1>

      {view === 'admin' ? (
        <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
          <h3>Add Question (Teacher Mode)</h3>
          <form onSubmit={addQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Question" value={qText} onChange={(e)=>setQText(e.target.value)} required />
            <input placeholder="Option 1" value={opt1} onChange={(e)=>setOpt1(e.target.value)} required />
            <input placeholder="Option 2" value={opt2} onChange={(e)=>setOpt2(e.target.value)} required />
            <input placeholder="Option 3" value={opt3} onChange={(e)=>setOpt3(e.target.value)} required />
            <input placeholder="Option 4" value={opt4} onChange={(e)=>setOpt4(e.target.value)} required />
            <input placeholder="Correct Answer" value={ans} onChange={(e)=>setAns(e.target.value)} required />
            <button type="submit" style={{ background: 'green', color: 'white', padding: '10px' }}>Save Question</button>
          </form>
          
          <hr style={{ margin: '20px 0' }} />
          
          <p>Total Questions: {questions.length}</p>
          <button 
            onClick={() => setIsLocked(!isLocked)} 
            style={{ background: isLocked ? 'red' : 'orange', color: 'white', padding: '10px', width: '100%' }}
          >
            {isLocked ? "Unlock Quiz for Students" : "Quiz is Unlocked!"}
          </button>
          
          <button 
            disabled={isLocked || questions.length === 0}
            onClick={() => setView('student')}
            style={{ marginTop: '10px', padding: '10px', width: '100%', cursor: isLocked ? 'not-allowed' : 'pointer' }}
          >
            Go to Student View
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
          {showScore ? (
            <div>
              <h2>Score: {score} / {questions.length}</h2>
              <button onClick={() => window.location.reload()}>Reset Everything</button>
            </div>
          ) : (
            <div>
              <h3>Q{currentQ + 1}: {questions[currentQ].questionText}</h3>
              {questions[currentQ].options.map((o, i) => (
                <button 
                  key={i} 
                  style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
                  onClick={() => {
                    if(o === questions[currentQ].answer) setScore(score + 1);
                    if(currentQ + 1 < questions.length) setCurrentQ(currentQ + 1);
                    else setShowScore(true);
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;