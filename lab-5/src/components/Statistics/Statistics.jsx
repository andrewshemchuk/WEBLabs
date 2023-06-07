import React, {useContext, useEffect, useState} from 'react';
import classes from './Statistics.module.scss';
import TeacherContext from "../../TeachersData/teacher-api.jsx";
import Button from "../UI/Button/Button.jsx";

import './table-style.css'

const Statistics = () => {
    const teacherCtx = useContext(TeacherContext);
    const teacherStatistics = teacherCtx.teachersList;
    const [sortParameter, setSortParameter] = useState(undefined);
    const [ASC_DESC, setASC_DESC] = useState(false);
    const [sortedTeacherList, setSortedTeacherList] = useState([]);

    const sortTeacherList = (list,  sortParam,isASC = true,) => {
        const sortByKey = (key) => list.sort((a, b) => {
            if (a[key] > b[key] && isASC) {
                return 1;
            }
            if (a[key] > b[key] && !isASC) {
                return -1;
            }
            if (a[key] < b[key] && isASC) {
                return -1;
            }
            if (a[key] < b[key] && !isASC) {
                return 1;
            }
            return 0;
        });

        if (sortParam === "full_name") {
            return sortByKey("full_name");
        }
        if (sortParam === "age") {
            if (isASC) {
                return list.sort((a, b) => a.age - b.age);
            } else {
                return list.sort((a, b) => b.age - a.age);
            }
        }
        if (sortParam === "courseList") {
            return sortByKey("courseList");
        }
        if (sortParam === "country") {
            return sortByKey("country");
        }
        if (sortParam === "gender") {
            return sortByKey("gender");
        }
        return list;
    };

    useEffect(() => {
        let newTeacherList = [...teacherStatistics];
        if (sortParameter) {
            newTeacherList = sortTeacherList(
                newTeacherList,
                sortParameter,
                ASC_DESC,
            );
        }
        setSortedTeacherList(newTeacherList);
    }, [sortParameter, ASC_DESC, teacherStatistics]);

    let content;
    if (sortedTeacherList.length > 0) {
        content = sortedTeacherList.map((teacher) => (
            <tr key={teacher.id}>
                <td>{teacher.full_name}</td>
                <td>{teacher.courseList}</td>
                <td>{teacher.age}</td>
                <td>{teacher.gender}</td>
                <td>{teacher.country}</td>
            </tr>
        ));
    }
    const sortHandler = (sortParam)=>{
        setSortParameter(sortParam);
        setASC_DESC(prevState => !prevState);
    }

    return (
        <div>

                <article className={classes.statistics} id="statistics">
                    <h1>Statistics</h1>
                    <table className="table">
                        <thead className="table__head">
                        <tr>
                            <th onClick={sortHandler.bind(null,"full_name")}>
                                <span>Full Name</span>
                            </th>
                            <th onClick={sortHandler.bind(null,"courseList")}>
                                <span>Courses</span>
                            </th>
                            <th onClick={sortHandler.bind(null,"age")}>
                                <span>Age</span>
                            </th>
                            <th onClick={sortHandler.bind(null,"gender")}>
                                <span>Gender</span>
                            </th>
                            <th onClick={sortHandler.bind(null,"country")}>
                                <span>Country</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="table__body">{content}</tbody>
                    </table>
                    <nav className="pagination-container">
                        <div className="table-nav">
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <span>...</span>
                            <a href="#">Last</a>
                        </div>
                    </nav>
                </article>

        </div>
    );
};
export default Statistics;
