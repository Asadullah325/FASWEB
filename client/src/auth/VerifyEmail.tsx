import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import {
    FormEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [data, setData] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<Array<HTMLInputElement | null>>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newData = [...data];
        newData[index] = value;
        setData(newData);
        if (value && index < 5) {
            inputRef.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !data[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const code = data.join("");
        if (code.length < 6) return setError("Please enter the full 6-digit code.");
        setLoading(true);
        console.log("Submitted Code:", code);
        navigate("/");
        setLoading(false);
        setData(["", "", "", "", "", ""]);
        setError(null);
    };

    useEffect(() => {
        inputRef.current[0]?.focus();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
            <p className="mb-4">Enter the 6-digit code sent to your email</p>
            <form
                onSubmit={handleSubmit}
                className="bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 w-[22rem] md:w-[26rem]"
            >
                <Label className="block text-gray-700 text-xl font-bold mb-2">
                    Enter Code
                </Label>
                <div className="mb-4 flex justify-center items-center gap-2">
                    {data.map((item, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRef.current[index] = el;
                            }}
                            onFocus={() => inputRef.current[index]?.select()}
                            type="text"
                            disabled={loading}
                            id={`digit-${index}`}
                            value={item}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="shadow appearance-none border border-amber-800 text-center rounded w-12 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            maxLength={1}
                            pattern="[0-9]*"
                            inputMode="numeric"
                        />
                    ))}
                </div>
                {
                    error && (
                        <p className="text-red-500 text-sm italic">
                            {error}
                        </p>
                    )
                }
                <div className="flex items-center justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full md:w-1/2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading
                            ? "bg-gray-500 hover:bg-gray-700 text-white"
                            : "bg-emerald-500 hover:bg-emerald-700 text-white cursor-pointer"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin mr-2" size={20} />
                                Please Wait...
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>
                </div>
            </form>
            <p className="mt-4">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-emerald-500 hover:text-emerald-700 font-bold"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default VerifyEmail;
