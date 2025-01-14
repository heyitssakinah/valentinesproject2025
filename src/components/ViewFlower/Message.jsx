import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './style.module.scss';


export default function Message({Message}) {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({ 
        target: container,
        offset: ["start 0.7", "end 0.90"]
    })
    console.log(Message)
const words = Message.split(" ")
// function splitParagraph(paragraph) {
//     const THRESHOLD = 70
//     const words = paragraph.split(' ')
//     const pages =[]
//     for(let i = 0; i < words.length; i += THRESHOLD) {
//         pages.push(words.slice(i, i + THRESHOLD).join(' '))
//     }
//     return pages;
// }
return (
    <p
      ref={container}         
      className='px-40 flex text-3xl max-w-screen h-100vh text-white flex-wrap'
    >
    {
      words.map( (word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>

  )}
const Word = ({children, progress, range}) => {
const opacity = useTransform(progress, range, [0, 1])
return <span className="flex text-3xl max-w-screen h-100vh text-white flex-wrap mr-2 mt-12">
<span className=" absolute flex text-3xl max-w-[80%] h-100vh text-white flex-wrap opacity-20">{children}</span>
    <motion.span style={{opacity: opacity}}>{children}</motion.span>
</span>
}
