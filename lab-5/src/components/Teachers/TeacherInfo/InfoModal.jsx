import React from 'react';
import classes from "./InfoModal.module.scss";
import Modal from "../../UI/Modal/Modal.jsx";

const InfoModal = ({teacher, onConfirm, onClose}) => {
    const {full_name, picture_Large, course, city, country, age, gender, email, phone,note} = teacher;
    return (
        <Modal headerText="Full info card">
            <article className={classes['full-teacher-card']}>
                <header className={classes['full-teacher-card__header']}>
                    <div className={classes['teacher-card__img']}>
                        <img src={picture_Large} alt="image"/>
                    </div>
                    <div className={classes['teacher-card__info']}>
                        <h1>{full_name}</h1>
                        <h2>{course}</h2>
                        <p>{city}, {country}</p>
                        <p>{age}, {gender}</p>
                        <p>{email}</p>
                        <p>{phone}</p>
                    </div>
                </header>
                <section>
                    <p>{note}</p>
                    <a href="#">toggle map</a>
                </section>
                <button className={classes['add_button']} onClick={() => {onConfirm(); onClose();}}>Add to favorite</button>
            </article>
        </Modal>

    );
};

export default InfoModal;
