import { useEffect, useState } from "react";
import { Student } from "../../types";
import ProgressCircle from "@/components/ProgressCircle";
import StudentModal from "@/components/StudentModal";

const Students = () => {
    const [users, setUsers] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>();
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        performance: 0,
    });

    const filteredStudents = users.filter(student => (
        student.firstName.toLowerCase().startsWith(search) ||
        student.lastName.toLowerCase().startsWith(search)
    ))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        //Ensures YYYY-MM-DD format
        if (name === "dateOfBirth") {
        const date = new Date(value);
        const formattedDate = date.toISOString().split("T")[0];
        setFormData({ ...formData, [name]: formattedDate });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('https://localhost:7063/api/Students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
        alert('Student created successfully');
        fetchData();
        } else {
        alert('Error creating student');
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;
    
        try {
        const response = await fetch(`https://localhost:7063/api/Students/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            alert("Student deleted successfully");
            fetchData();
        } else {
            alert("Error deleting student");
        }
        } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to delete student");
        }
    };

    const fetchData = async() => {
        try{
        const response = await fetch('https://localhost:7063/api/Students')
        if(response.ok){
            const data = await response.json();
            const users: Student[] = data;
            setUsers(users);
            setLoading(false)
        }
        }catch(e){

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(loading){
        return (
        <>
            <p>...Loading</p>
        </>
        )
    }

    return(
        <main className="h-full overflow-hidden flex flex-col">
        <div className="flex justify-between">
            <input type="text" placeholder="search..." value={search} onChange={(e) => setSearch(e.target.value)} className="p-1 pl-6 shadow-sm rounded-2xl w-60 focus:outline-none"/>
            <button onClick={() => setCreateModal(true)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-sm mr-2">Create Student</button>
        </div>
        <div className={`${selectedStudent ? "h-[30rem]" : "h-full"} overflow-x-auto sm:rounded-lg mt-2 flex flex-col justify-between pb-2`}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    <p>Name</p>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    <p>Birthdate</p>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    <p>Email</p>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    <p>Performance</p>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    <p>Action</p>
                </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredStudents!.map((student, index) => (
                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${selectedStudent?.id === student.id ? "bg-slate-100" : ""}`}>
                    <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex gap-4 justify-center">{student.firstName} {student.lastName}</td>
                    <td className="px-6 py-4 text-center">{student.dateOfBirth.split("T")[0]}</td>
                    <td className="px-6 py-4 text-center">{student.email}</td>
                    <td className="px-6 py-4 text-center">{student.performance}</td>
                    <td className="px-6 py-4 text-blue-600 text-center" onClick={() => setSelectedStudent(student)}><p className="hover:cursor-pointer">View</p></td>
                    </tr>
                ))
                }
            </tbody>
            </table>
        </div>
        {/* Selected Student Section */}
        {selectedStudent && (
            <div className="mt-4 p-4 flex-1 bg-white shadow rounded-lg text-gray-500 flex flex-col justify-between">
            <div>
                <div className="flex justify-end">
                <svg onClick={() => setSelectedStudent(null)} className="hover:cursor-pointer w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                </svg>
                </div>
                <div className="flex gap-4">
                <ProgressCircle percentage={selectedStudent.performance} />
                <div className="mt-2">
                    <h1 className="font-semibold text-2xl text-gray-600">{selectedStudent.firstName} {selectedStudent.lastName}</h1>
                    <p>{selectedStudent.email}</p>
                </div>
                </div>
                <div className="flex mt-4">
                <div className="w-2/4 h-full"> 
                    <p><span className="font-semibold text-gray-600">ID:</span> {selectedStudent.id.toUpperCase()}</p>
                    <p><span className="font-semibold text-gray-600">Birthdate:</span> {selectedStudent.dateOfBirth.split("T")[0]}</p>
                </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <button className="rounded-md w-32 bg-blue-500 text-white p-1" onClick={() => setEditModal(true)}>Edit</button> 
                <button className="rounded-md w-32 bg-red-500 text-white p-1" onClick={() => handleDelete(selectedStudent.id)}>Delete</button>
            </div>
            </div>
        )}
        {/* CREATE MODAL */}
        <div className={`${createModal ? "" : "hidden"}`}>
            <StudentModal isOpen={createModal} onClose={() => setCreateModal(false)}>
            <form onSubmit={handleSubmit} method="post" className="border-2 border-gray-200 p-2 rounded-xl flex flex-col gap-4 mt-2">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="border-b-2" />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="border-b-2" />
                <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required className="border-b-2" />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="border-b-2 text-gray-400" />
                <input type="number" name="performance" placeholder="performance" value={formData.performance} onChange={handleChange} required className="border-b-2 text-gray-400" />
                <button type="submit" className="bg-blue-500 rounded-md text-white">Submit</button>
            </form>
            </StudentModal>
        </div>
        {/* EDIT MODAL */}
        <div className={`${editModal ? "" : "hidden"}`}>
            <StudentModal isOpen={editModal} onClose={() => setEditModal(false)}>
            <form onSubmit={handleSubmit} method="post" className="border-2 border-gray-200 p-2 rounded-xl flex flex-col gap-4 mt-2">
                <input type="text" name="firstName" placeholder={selectedStudent?.firstName} value={formData.firstName} onChange={handleChange} required className="border-b-2" />
                <input type="text" name="lastName" placeholder={selectedStudent?.lastName} value={formData.lastName} onChange={handleChange} required className="border-b-2" />
                <input type="email" name="email" placeholder={selectedStudent?.email} value={formData.email} onChange={handleChange} required className="border-b-2" />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="border-b-2 text-gray-400" />
                <input type="number" name="performance" placeholder="performance" value={formData.performance} onChange={handleChange} required className="border-b-2 text-gray-400" />
                <button type="submit" className="bg-blue-500 rounded-md text-white">Submit</button>
            </form>
            </StudentModal>
        </div>
        </main>
    )
};

export default Students;