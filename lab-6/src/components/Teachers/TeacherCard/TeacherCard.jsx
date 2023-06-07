import React, {useContext, useState} from 'react';
import classes from './TeacherCard.module.scss';

import TeacherContext from "../../../TeachersData/teacher-api.jsx";
import InfoModal from "../TeacherInfo/InfoModal.jsx";

import './teacher-card-style.scss'

const TeacherCard = (props) => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const {full_name, picture_Large, favorite} = props.teacherData;
    const {courseList, city, country, age, gender, email, phone,note} = props.teacherData;
    const modalHandler = () => {
        setIsVisibleModal(prevState => !prevState);
    };

    const teacherCtx = useContext(TeacherContext);
    return (

        <li className="flex-content" onClick={modalHandler}>
            <div className="image">
                {picture_Large &&
                    <img src={picture_Large} alt="teacher face"/>}
                {!picture_Large && <p>{1}</p>}      
            </div>
            <div className={classes['min-teacher-card__body']}>
                <div>
                    <h3>{full_name}</h3>
                    <h4>{courseList}</h4>
                    <h5>{country}</h5>
                </div>
            </div>

            {props.renderStar && favorite && <span>&#128970;</span>}
            {isVisibleModal && <InfoModal
                teacher={props.teacherData}
                onClose={modalHandler}
                onConfirm={teacherCtx.addToFavorite.bind(null, props.teacherData)}
            />}
        </li>
    );
};

export default TeacherCard;
