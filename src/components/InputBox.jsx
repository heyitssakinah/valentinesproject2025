
function InputBox( { styleType, onChange }) {
    const styles = {
        paragraph: 'flex border-1 items-start backdrop-blur-sm bg-white/20 rounded-xl px-5 pt-3 w-[75%] xl:w-[50%] h-[50%] text-left',
        poem: 'flex border-1 items-start backdrop-blur-sm bg-white/20 rounded-xl px-5 pt-3 w-[75%] md:w-[50%] h-[35%] text-left',
        other:'flex border-2 backdrop-blur-sm bg-white/20 rounded-xl px-5 pt-2 w-[100%] h-32 text-left'
    }

    const placeholders = {
        paragraph: 'Do you remember that September? We ran up and down hundreds of stairs, scaled landslide affected hills, charged through off roads, shivered in the cold, and made it to our destination all before sunset. I don’t think I could’ve done any of that without you. The fog was lifting and the sun painted the canvas of mountains in a soft warm glow. You were teasing me for all I was worth, and I didn’t want to be anywhere else. I never knew what a priveledge it was to love, not until i met you.',
        poem: 'Your eyes are my sails \n my guiding light \n there might be times when the waters are shaky \n but my love for you is never flaky',
        other: 'This reminds me of you...and your big forehead'
    }


    return (
        <textarea
        className={styles[styleType]}
        placeholder={placeholders[styleType]}
        onChange={onChange}
        />
    )
}

export default InputBox;
