import { Search } from 'lucide-react';
import HeroImage from '@/assets/Hero.avif';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const HeroSection = () => {

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = () => {
        if (searchText.trim().length === 0) {
          toast.error('Please enter What you want to search!');
          return;
        }
        navigate(`/search/${searchText}`);
      };

    return (
        <>
            <div className="flex flex-col md:flex-row md:p-10 max-w-7xl mx-auto justify-between p-4">
                <div className="flex flex-col gap-4 w-full md:w-1/2 py-4 mr-4">
                    <h1 className="text-3xl font-bold">Welcome to FESWEB</h1>
                    <p className="text-lg">Your one-stop solution for all things web development.</p>
                    <p className="text-lg">Join us to explore the latest trends and technologies in web development.</p>
                    <div className="relative mt-4 flex items-center gap-2">
                        <Input
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search restaurant by name, city & country"
                            className='w-full pl-10' />
                        <Search className="absolute left-2 top-2 text-gray-400" />
                        <Button onClick={handleSearch} className='cursor-pointer' >Search</Button>
                    </div>
                </div>
                <div>
                    <img src={HeroImage} alt="Hero Image" className="w-full h-auto max-w-md rounded-md shadow-lg object-cover" />
                </div>
            </div>
        </>
    )
}

export default HeroSection
