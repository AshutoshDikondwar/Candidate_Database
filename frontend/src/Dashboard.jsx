
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates } from './slices/candidateSlice';
import { deleteCandidate } from './slices/candidateSlice';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BarChart from './BarChart';
import { Button } from './components/ui/button';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { candidates, loading, error } = useSelector((state) => state.candidate);
    const navigate=useNavigate();

    const [filters, setFilters] = useState({
        skills: '',
        experience: '',
        location: '',
    });
   

    useEffect(() => {
        dispatch(getCandidates(filters));
    }, [dispatch]);


    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getCandidates(filters));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    const handleDelete = (id) => {
        dispatch(deleteCandidate(id))
        .then(() => console.log('Delete dispatched'))
        .catch(err => console.error('Delete failed:', err));
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Candidates</h2>

            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="skills"
                        placeholder="Search by skills"
                        value={filters.skills}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                    <input
                        type="text"
                        name="experience"
                        placeholder="Search by experience"
                        value={filters.experience}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Search by location"
                        value={filters.location}
                        onChange={handleChange}
                        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                    />

                    <Button
                        type="submit"
                        variant="secondary"
                    >
                        Search
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={()=>navigate("/candidate/add")}
                    >
                        Add Candidate
                    </Button>
                </div>
            </form>

            <Table>
                <TableCaption>A list of your recent candidates.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">ID</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Skills</TableHead>
                        <TableHead className="text-gray-300">Experience</TableHead>
                        <TableHead className="text-gray-300">Location</TableHead>
                        <TableHead className="text-gray-300 ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {candidates.map((candidate) => (
                        <TableRow key={candidate.id} className="hover:bg-slate-800">
                            <TableCell className="text-gray-400">{candidate.id}</TableCell>
                            <TableCell className="text-gray-400">{candidate.name}</TableCell>
                            <TableCell className="text-gray-400">{candidate.email}</TableCell>
                            <TableCell className="text-gray-400">{candidate.skills}</TableCell>
                            <TableCell className="text-gray-400">{candidate.experience}</TableCell>
                            <TableCell className="text-gray-400">{candidate.location}</TableCell>
                            <TableCell className="text-gray-400">
                                <div className='flex gap-2'>
                                    <Button>
                                        Edit
                                    </Button>
                                    <Button type="button" onClick={() => handleDelete(candidate.id)} variant="destructive">
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-8 flex justify-center">
                <div className="w-full max-w-4xl">
                    <BarChart data={candidates} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
