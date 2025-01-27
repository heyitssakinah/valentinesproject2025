import { useEffect, useState } from "react";
import InputBox from "../InputBox";
import { ref, set, getDatabase } from "firebase/database";
import { app } from '../../configuration';
import { useAuth } from "../../contexts/authContext";


export function WriteProse({Name, submitAll, handleScroll, toRef}) { 
    const name = Name.split("_")[0];
    const [option, setOption] = useState('paragraph');
    const [input, setInput] = useState('');
    const {currentUser} = useAuth();

    const handleOptionChange = (option) => {
        setOption(option);
    }

    const handleSubmit = () => {
        if (input.trim() === '') {
            alert('Please enter a message');
            return;
            ///stay on this page
        }
        handleScroll(toRef)
        
    }

    useEffect(() => {
        setInput('')
    },[])
    console.log('input', input)
    
    useEffect(() => {
        if(submitAll) {
            // Create new message
                const db = getDatabase(app);
                const dataref = ref(db, `Bouquets/${Name}/${currentUser.displayName}_${currentUser.uid}/Message`);
                set(dataref, {
                    Message: input
                })
                    .catch((err) =>{
                        alert("Failed to submit");
                        console.error('Error submitting to database', err);
                    });
                }
    }, [submitAll])

    return (
        <div className='flex flex-col items-center h-screen w-screen bg-darkred'>
                <h1 className="mt-16 mb-8 sm:mb-10 text-2xl md:text-3xl mx-4 text-mywhite text-center">Send a Flower to { name }</h1>
                <div className='flex space-x-6 sm:pl-5 m-5 w-[50%]'>
                    <button
                        onClick={() => handleOptionChange('paragraph')}
                        className={`px-4 py-2 text-center ${option === 'paragraph' ? 'text-mywhite underline' : 'text-mywhite/25 hover:text-gray-400 '}`}
                        >Paragraph</button>
                    <button
                        onClick={ () => handleOptionChange('poem')}
                        className={`px-4 py-2 text-center ${option === 'poem' ? 'text-mywhite underline' : 'text-mywhite/25 hover:text-gray-400 '}`}
                        >Poem</button>
                </div>
                <InputBox 
                    styleType={option} 
                    onChange={(val) => setInput(val.target.value)}
                />
                <button
                onClick={handleSubmit}
                className='px-4 py-2 text-center ml-[40%] mt-12 text-white bg-red-800 rounded-md hover:bg-barnred'
                >Next!</button>
        </div>
    )
}

