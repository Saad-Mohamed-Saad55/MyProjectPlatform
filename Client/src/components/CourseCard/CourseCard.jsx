import "./Course.css";
import React from "react";
import { Link } from 'react-router-dom';


export default function CourseCard({index, imgUrl,courseName, handleCourseClick, courseCoode}) {
    return (
                    <div
                    onClick={() => handleCourseClick(courseCoode)}
                        // to={{
                        //     pathname: "/CourseView",
                        //     state: { courseId: index }
                        // }}
                        key={index}
                    >
                        <div className="courses-card">
                            <div className="image">
                                <img src={imgUrl} alt={courseName}/>
                            </div>
                            <div className="content">
                                <div className="flex">
                                    <div>
                                        <h3>{courseName}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}