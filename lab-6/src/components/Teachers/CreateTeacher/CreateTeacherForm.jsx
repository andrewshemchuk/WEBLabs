import React, {useContext, useState} from 'react';
import Modal from "../../UI/Modal/Modal.jsx";
import Input from "../../UI/Input/Input.jsx";
import classes from './CreateTeacherForm.module.scss';
import Button from "../../UI/Button/Button.jsx";
import teacherContext from "../../../TeachersData/teacher-api.jsx";
import axios from "axios";

const CreateTeacherForm = (props) => {
    const teacherCtx = useContext(teacherContext);

    const [fullName, setFullName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [color, setColor] = useState('');
    const [note, setNote] = useState('');


    const fullNameInputHandler = (e) => {
        setFullName(e.target.value);
    };
    const specialityInputHandler = (e) => {
        setSpeciality(e.target.value);
    };
    const countryInputHandler = (e) => {
        setCountry(e.target.value);
    };
    const cityInputHandler = (e) => {
        setCity(e.target.value);
    };
    const emailInputHandler = (e) => {
        setEmail(e.target.value);
    };
    const phoneInputHandler = (e) => {
        setPhone(e.target.value);
    };
    const dobInputHandler = (e) => {
        setDateOfBirth(e.target.value);
    };
    const colorInputHandler = (e) => {
        setColor(e.target.value);
    };
    const noteInputHandler = (e) => {
        setNote(e.target.value);
    };

    const genderInputHandler = (e) => {
        setGender(e.target.value);
    }
    const calculateAge = () => {
        if (dateOfBirth) {
            const currentDate = new Date();

            const diffInMs = currentDate.getTime() - new Date(dateOfBirth).getTime();
            return Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
        }
        return;
    }

    const submitHandler = (e) => {
        try {
            e.preventDefault();

            const newTeacher = {
                id: 'id' + Math.floor(Math.random() * 50 ** 10),
                gender: gender,
                full_name: fullName,
                city: city,
                country: country,
                email: email,
                b_date: dateOfBirth,
                age: calculateAge(dateOfBirth),
                phone: phone,
                favorite: false,
                courseList: speciality,
                bg_color: color,
                note: note,
                picture_Large: 'https://us-tuna-sounds-images.voicemod.net/6bea9817-c90a-4de2-a7ef-efbbe288e4fc-1675081113932.png'
            };
            const addTeacherToDB = async ()=>{
                const response = await axios.post('http://localhost:3030/teachers', {...newTeacher})
                console.log(response);
            }

            teacherCtx.addNewTeacher(newTeacher);
            addTeacherToDB();
            props.onClose();
        } catch (e) {
            alert(`Error`)
        }
    };

    return (
        <Modal headerText='Add teacher'>
            <section>
                <form className={classes['add-teacher__form']} onSubmit={submitHandler}>
                    <div className={classes['add-teacher__input']}>
                        Full name
                        <input type='text' id='full-name' labelText='Name'
                               placeholder='Enter name' value={fullName} onChange={fullNameInputHandler}></input>
                    </div>
                    <div className={classes['add-teacher__input']}>
                        <label htmlFor="speciality">Speciality</label>
                        <select id="speciality"
                                value={speciality}
                                onChange={specialityInputHandler}
                                className={classes['add-teacher__course']}>
                            <option value='Math'>Math</option>
                            <option value='Physics'>Physic</option>
                            <option value='PE'>PE</option>
                            <option value='Biology'>Biology</option>
                            <option value='Chemistry'>Chemistry</option>
                        </select>
                    </div>
                    <div className={classes.teacher__info}>
                        <div className={classes['add-teacher__input']}>
                            Country
                            <input type='text' id='country' labelText='Country'
                                   value={country} onChange={countryInputHandler}></input>
                        </div>
                        <div className={classes['add-teacher__input']}>
                            City
                            <input type='text' id='city' labelText='City'
                                   value={city} onChange={cityInputHandler}></input>
                        </div>
                        <div className={classes['add-teacher__input']}>
                            Email
                            <input type='text' id='email' labelText='Email'
                                   value={email} onChange={emailInputHandler}></input>
                        </div>

                        <div className={classes['add-teacher__input']}>
                            Phone
                            <input type='tel' id='phone-number' labelText='Phone'
                                  placeholder={'0000-00-00'} value={phone} onChange={phoneInputHandler}></input>
                        </div>
                    </div>
                    <div className={classes['add-teacher__input']}>
                        Date Birth
                        <input type='date' id='date-of-birth' labelText='Date of birth'
                               value={dateOfBirth} onChange={dobInputHandler}></input>
                    </div>
                    <div className={`${classes['add-teacher__input']} ${classes['gender__input']}`}>
                        <span>Sex</span>
                        <Input
                            type='radio'
                            id='male'
                            labelText='Male'
                            value='Male'
                            checked={gender === "Male"}
                            onChange={genderInputHandler}
                        />
                        <Input
                            type='radio'
                            id='female'
                            labelText='Female'
                            value='Female'
                            checked={gender === "Female"}
                            onChange={genderInputHandler}
                        />
                    </div>
                    <div className={`${classes['add-teacher__input']} ${classes['bg__input']}`}>
                        <Input
                            type='color'
                            id='bg-color'
                            labelText='Background color'
                            value={color}
                            onChange={colorInputHandler}
                        />
                    </div>


                    <div className={classes['add-teacher__input']}>
                        <label htmlFor="comments">Notes(optional)</label>
                        <textarea
                            id="comments"
                            value={note}
                            onChange={noteInputHandler}
                        >
                            Create a note...
                        </textarea>
                    </div>
                    <div className={classes['add-teacher__actions']}>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </section>
        </Modal>

    );
};

export default CreateTeacherForm;
