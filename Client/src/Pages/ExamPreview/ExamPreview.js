import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseSelect from '../ExamResults/CourseSelect';
import ExamSelect from '../ExamResults/ExamSelect';

import "./ExamPreview.css"

function ExamPreviewPage({ isDarkMode, language, Role, userId }) {
  const [exam, setExam] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  // const [selectedCourse, setSelectedCourse] = useState('');
  // const [selectedExam, setSelectedExam] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/instructor/${userId}/courses`);

        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error('Expected array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleCourseSelect = (courseId) => {
    // setSelectedCourse(courseId);
    axios.get(`http://localhost:4001/api/exams/${courseId}`)
        .then(response => {
          setExams(response.data);
          // setSelectedExam('');
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching exams:', error);
        });
  };

  const handleExamSelect = (examId) => {
    // setSelectedExam(examId);
    axios.get(`http://localhost:4001/api/exam-preview/${examId}`)
        .then(response => {
          setExam(response.data);
        })
        .catch(error => {
          console.error('Error fetching exam data:', error);
        });
  };

  const toggleEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };

  const editExam = () => {
    // Add your editing logic here
  };
  
  return (
      <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} exam-container`}>
        <CourseSelect courses={courses} onSelect={handleCourseSelect} language={language} />
        <ExamSelect exams={exams} onSelect={handleExamSelect} language={language} />
        <div>
          {exams ? (
              <div>
                <h1 className='exam-title'>{exams.exam_name}</h1>
                {editMode ? (
                    <div>
                      <h2>Editing Exam</h2>
                      {/* Add editing controls here */}
                    </div>
                ) : (
                    <div>
                      {exams?.map((exam, index) => (
                          <div className={'question'} key={index}>
                            <h2>{exam.exam_name}</h2>
                            <h3>{exam.duration}</h3>
                            <h3>{exam.start_at}</h3>
                            <ul className={'optionsList'}>
                              {exam.options.map((option, index) => (
                                  <li className={'option'} key={index}>
                                    {option.answer_text}
                                  </li>
                              ))}
                            </ul>
                            <p className={'correctAnswer'}>Correct Answer: {}</p>
                          </div>
                      ))}
                    </div>
                )}
                <button className={'editButton'} onClick={toggleEditMode}>
                  {editMode ? 'Cancel Edit' : 'Edit Exam'}
                </button>
              </div>
          ) : (
              <p>Loading exam data...</p>
          )}
        </div>
      </div>
  );
}

export default ExamPreviewPage;
