import { Link, useParams } from "react-router-dom"
import FilterPage from "./FilterPage"
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import HeroImage from "@/assets/Hero.avif"
import { Skeleton } from "../ui/skeleton";

const SearchPage = () => {
    const { searchText } = useParams();
    const [searchQuery, setSearchQuary] = useState<string>('');

    return (
        <div className="max-w-7xl mx-auto my-6 px-3">
            <div className="flex flex-col md:flex-row justify-between gap-5">
                <FilterPage />
                <div className="flex flex-col gap-4 w-full py-4 mr-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <Input
                                value={searchQuery}
                                id="search"
                                type="text"
                                name="search"
                                onChange={(e) => setSearchQuary(e.target.value)}
                                placeholder="Search Here"
                                className='w-full'
                            />
                            <Button className="cursor-pointer">Search</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
                            <h1 className="text-2xl font-bold">(3) Search Results Found</h1>
                            <div className="flex flex-wrap gap-2">
                                {
                                    ["Biryani", "Noodles", "Rice"].map((selectedFilter: string, index: number) => (
                                        <div key={index} className="relative flex items-center max-w-full gap-2">
                                            <Badge className="px-3 py-1 pr-6 whitespace-nowrap" variant="outline">{selectedFilter}</Badge>
                                            <X className="absolute right-1 cursor-pointer h-3 w-3" onClick={() => { }} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                [1, 2, 3, 4, 5, 6].map((item: number) => (
                                    <Card key={item} className="flex flex-col gap-2 p-0 hover:shadow-2xl transition-shadow duration-300">
                                        <div className="relative">
                                            <AspectRatio ratio={16 / 9} className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                                <img className="w-full h-full object-cover" src={HeroImage} alt="" />
                                            </AspectRatio>
                                            <span className="absolute top-2 left-2 bg-red-500 font-bold text-primary-foreground text-xs px-2 py-0.5 rounded">Featured</span>
                                        </div>
                                        <CardContent>
                                            <div className="flex flex-col gap-2 py-2">
                                                <h2 className="text-lg font-bold">Delicious Biryani</h2>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4  inline-block mr-1" />
                                                    <span className="text-sm font-bold">Location: New York</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {
                                                        ["Biryani", "Noodles", "Rice"].map((item: string, index: number) => (
                                                            <div key={index} className="relative flex items-center max-w-full gap-2">
                                                                <Badge className="px-3 py-1 whitespace-nowrap">
                                                                    {item}
                                                                </Badge>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-bold">Price: $20</span>
                                                </div>
                                                <CardFooter className="p-0 border-t border-t-slate-500">
                                                    <Link to={`/restaurant/${item}`} className="w-full">
                                                        <Button className="w-full cursor-pointer">View Details</Button>
                                                    </Link>
                                                </CardFooter>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

const SkeletonCard = () => (
    <Card className="flex flex-col gap-2 p-0">
        <div className="relative">
            <Skeleton className="w-full aspect-[16/9] rounded-tl-lg rounded-tr-lg" />
            <Skeleton className="absolute top-2 left-2 h-5 w-16 rounded" />
        </div>
        <CardContent>
            <div className="flex flex-col gap-2 py-2">
                <Skeleton className="h-5 w-1/2" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
                <Skeleton className="h-4 w-24" />
                <CardFooter className="p-0 border-t border-t-slate-500">
                    <Skeleton className="h-10 w-full rounded" />
                </CardFooter>
            </div>
        </CardContent>
    </Card>
);

const NoResultFound = ({ searchText }: { searchText: string }) => (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
        <h1 className="text-3xl font-bold">No Results Found</h1>
        <p className="mt-2 text-lg">We couldn't find any results for "{searchText}".</p>
        <p className="mt-2 text-lg">Try searching with different keywords.</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</Link>
    </div>
);

