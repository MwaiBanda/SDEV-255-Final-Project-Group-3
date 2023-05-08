import TopNavBar from '@/components/Navbar';
import { useState, useEffect } from "react"

export default function UserPage({ isDisplayingFaculty }) {
    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const res = await fetch("https://groupbackend.onrender.com/users", {
                method: "GET",
                mode: "cors",
                referrerPolicy: "no-referrer",
            })

            const remoteUsers = await res.json();
            console.log(remoteUsers)
            if (remoteUsers.length > 0) {
                setUsers(JSON.parse(JSON.stringify(remoteUsers)))
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <TopNavBar />
            {isDisplayingFaculty ?
                <ul>
                    {
                        users.filter(user => user.account === 'teacher').map(user => {
                            return <li className="course"  key={user.username}>
                                    <div className="align-left pad-start">
                                        <h5><small className='text-muted'>Name</small>: {user.name ? user.name : "Admin" }</h5>
                                        <h5><small className='text-muted'>Username</small>: {user.username}</h5>
                                        <h5><small className='text-muted'>Password</small>: {user.password}</h5>
                                        <h5><small className='text-muted'>Role</small>: Faculty</h5>
                                        <h5><small className='text-muted'>Account Created</small>: {user.createdAt ? user.createdAt  : new Date("2023-05-1").toDateString() }</h5>
                                    </div>
                                </li>
                        })
                    }
                </ul> : <ul>
                    {
                        users.filter(user => user.account === 'student').map(user => {
                            return  <li className="course" key={user.username}>
                            <div className="align-left pad-start">
                                <h5><small className='text-muted'>Name</small>: {user.name ? user.name : "Student" }</h5>
                                <h5><small className='text-muted'>Username</small>: {user.username}</h5>
                                <h5><small className='text-muted'>Role</small>: Student</h5>
                                <h5><small className='text-muted'>Account Created</small>: {user.createdAt ? user.createdAt  : new Date("2023-05-1").toDateString() }</h5>
                            </div>
                        </li>
                        })
                    }
                </ul>
            }
        </>
    )
}