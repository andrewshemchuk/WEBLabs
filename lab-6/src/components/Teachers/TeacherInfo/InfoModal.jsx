import React from 'react';
import classes from "./InfoModal.module.scss";
import Modal from "../../UI/Modal/Modal.jsx";

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

const InfoModal = ({teacher, onConfirm, onClose}) => {
    const {
        full_name, picture_Large,
        course, city,
        country, age,
        gender, email,
        phone, note,
        coordinates,b_date
    } = teacher;
    console.log(teacher)
    const position = [+coordinates.longitude, +coordinates.latitude];

    function birthdayLeft (birthday) {
        dayjs.extend(utc)
        const today = dayjs().utcOffset(0);
        const bDay = dayjs(birthday).utc().year(today.year());
    
        let difference = bDay.diff(today, 'day');
        if (bDay.isBefore(today)) difference = 365 + difference;
        return difference;
    };

    console.log(position)
    return (
        <Modal headerText={full_name}>
            <article className={classes['full-teacher-card']}>
                <header className={classes['full-teacher-card__header']}>
                    <div className={classes['teacher-card__img']}>
                        <img src={picture_Large} alt="Photo with teacher face"/>
                    </div>
                    <div className={classes['teacher-card__info']}>
                        <h1>{full_name}</h1>
                        <h2>{course}</h2>
                        <p>{city}, {country}</p>
                        <p>{age}, {gender}</p>
                        <p>Next birthday in: {birthdayLeft(b_date)}</p>
                        <p>{email}</p>
                        <p>{phone}</p>
                    </div>
                </header>
                <section>
                    <p>{note}</p>
                    <MapContainer className={classes.map} center={position} zoom={0.5}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={position}>
                            <Popup> Here </Popup>
                        </Marker>
                    </MapContainer>
                </section>
                <button className={classes['add_button']} onClick={() => {onConfirm(); onClose();}}>Add to favorite</button>

            </article>
        </Modal>

    );
};

export default InfoModal;
