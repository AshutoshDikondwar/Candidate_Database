import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates, deleteCandidate } from '../slices/candidateSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarChart from '../BarChart';
import { Button } from '../components/ui/button';
import EditCandidateModal from './EditCandidateModel';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { candidates, loading, error } = useSelector((state) => state.candidate);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast("Please log in to continue");
    } else if (user?.role !== "admin") {
      navigate("/");
      toast("Access denied. You are not authorized to view this content.");
    }
  }, [isAuthenticated, user, navigate]);

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
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const handleEdit = (id) => {
    setSelectedCandidateId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCandidate(id))
      .then(() => console.log('Delete dispatched'))
      .catch(err => console.error('Delete failed:', err));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidateId(null);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Candidates</h2>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="skills"
            placeholder="Search by skills"
            value={filters.skills}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-grow"
          />
          <input
            type="text"
            name="experience"
            placeholder="Search by experience"
            value={filters.experience}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-grow"
          />
          <input
            type="text"
            name="location"
            placeholder="Search by location"
            value={filters.location}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg flex-grow"
          />

          <Button
            type="submit"
            variant="secondary"
            className="w-full md:w-auto"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/candidate/add")}
            className="w-full md:w-auto"
          >
            Add Candidate
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto">
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
              <TableHead className="text-gray-300">Video Results</TableHead>
              <TableHead className="text-gray-300">Coding Results</TableHead>
              <TableHead className="text-gray-300">Action</TableHead>
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
                <TableCell className="text-gray-400">{candidate.video_results}</TableCell>
                <TableCell className="text-gray-400">{candidate.coding_results}</TableCell>
                <TableCell className="text-gray-400">
                  <div className='flex gap-2'>
                    <Button onClick={() => handleEdit(candidate.id)}>
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
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <BarChart data={candidates} />
        </div>
      </div>

      {isModalOpen && (
        <EditCandidateModal
          candidateId={selectedCandidateId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
