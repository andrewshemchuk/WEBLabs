import React, {useContext, useState} from 'react';
import classes from './TeachersList.module.css';
import TeacherCard from "../../TeacherCard/TeacherCard.jsx";
import TeacherContext from "../../../../TeachersData/teacher-api.jsx";
import Button from "../../../UI/Button/Button.jsx";

const TeachersList = (props) => {

    const teacherCtx = useContext(TeacherContext);

    const content = (teacherCtx.teachersList).map(teacher => (
        <TeacherCard
            key={teacher.id}
            teacherData={teacher}
            renderStar={true}
        />
    ));

    return (
        <div className={classes['top-teachers__list']}>
            {content.length !== 0 && <React.Fragment>
                <ul>
                    {content}
                </ul>
                <div className={classes.center_pagination}>
                    <button className={classes['prev-button']} onClick={teacherCtx.paginationCount.goToPrevPage}>
                        &lt;
                    </button>
                    <button className={classes['prev-button']} onClick={teacherCtx.paginationCount.goToNextPage}>
                        &gt;
                    </button>
                </div>
            </React.Fragment>}
            {content.length === 0 && <p style={{textAlign: 'center'}}>No results :</p>}
        </div>
    );
};

export default TeachersList;
