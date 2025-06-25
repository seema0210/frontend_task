import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewCard = ({ setOpenModal, setCards }) => {

    const initialState = {
        fname: '',
        lname: '',
        email: '',
        role: ''
    }

    const [newUser, setNewUer] = useState(initialState)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUer((preUser) => ({ ...preUser, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const { fname, lname, email, role } = newUser

        const finalUser = {
            id: Math.random(),
            firstName: fname,
            lastName: lname,
            email: email,
            role: role
        }
        const cretedUser = [finalUser]
        setCards((preData) => {
            return [...preData, ...cretedUser]
        })
        toast.success("User Added successfully");
        setOpenModal(false)
    }

    return (
        <div className="modal-box">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name='fname'
                    placeholder='Enter First Name'
                    value={newUser.fname}
                    onChange={handleChange}
                    required /> <br />
                <input type="text"
                    name='lname'
                    placeholder='Enter Last Name'
                    value={newUser.lname}
                    onChange={handleChange}
                    required /> <br />
                <input type="email"
                    name='email'
                    placeholder='Enter Email'
                    value={newUser.email}
                    onChange={handleChange}
                    required /> <br />
                <input type="text"
                    name='role'
                    placeholder='Enter Role'
                    value={newUser.role}
                    onChange={handleChange}
                    required />
                <div className="modal-buttons">
                    <button type='button' onClick={() => setOpenModal(false)}>Close</button>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default NewCard