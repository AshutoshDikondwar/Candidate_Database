
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { createCandidate } from '../slices/candidateSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

const candidateSchema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email address'),
    skills: z.string().nonempty('Skills are required'),
    experience: z.number().nonnegative('Experience should not be negative'),
    location: z.string().nonempty('Location is required'),
    video_results: z.string().optional(),
    coding_results: z.string().optional(),
});

const AddCandidate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(candidateSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            toast("Please log in to continue")
            navigate("/login");
        } else if (user?.role !== "admin") {
            toast("Access denied. You are not authorized to view this content.")
            navigate("/");
        }
    }, [isAuthenticated, user, navigate]);


    const onSubmit = async (data) => {
        try {
            const formattedSkills = data.skills.trim().toUpperCase();

            const candidateData = {
                ...data,
                skills: formattedSkills,
            };
            await dispatch(createCandidate(candidateData)).unwrap();

            toast("Candidate added successfully!")
            navigate("/")
        } catch (error) {
            toast("Oops! Something went wrong while adding the candidate.");
        }
    };

    const handleGoBack = () => {
        navigate(-1); 
    };


    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-white mb-6 text-center">Add Candidate</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name')}
                                placeholder="Enter candidate's name"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder="Enter candidate's email"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="skills">
                                Skills
                            </label>
                            <input
                                id="skills"
                                type="text"
                                {...register('skills')}
                                placeholder="Enter candidate's skills"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.skills && <span className="text-red-400 text-sm">{errors.skills.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="experience">
                                Experience
                            </label>
                            <input
                                id="experience"
                                type="number"
                                {...register('experience', { valueAsNumber: true })}
                                placeholder="Enter candidate's experience"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.experience && <span className="text-red-400 text-sm">{errors.experience.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="location">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                {...register('location')}
                                placeholder="Enter candidate's location"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.location && <span className="text-red-400 text-sm">{errors.location.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="video_results">
                                Video Results
                            </label>
                            <input
                                id="video_results"
                                type="text"
                                {...register('video_results')}
                                placeholder="Enter video results URL"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-1 text-sm" htmlFor="coding_results">
                                Coding Results
                            </label>
                            <input
                                id="coding_results"
                                type="text"
                                {...register('coding_results')}
                                placeholder="Enter coding results URL"
                                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        variant="secondary"
                    >
                        Add Candidate
                    </Button>

                    <Button
                        type="button"
                        onClick={handleGoBack}
                        className="w-full mt-4"
                    >
                        Go Back
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidate;
