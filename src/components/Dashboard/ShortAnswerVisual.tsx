import React from 'react';
import { TagCloud } from 'react-tagcloud'

const ShortAnswerVisual = ({
    question
}: {
    question: any;
}) => {
    const data = question.answers;


    return (
        <>
            <div className="h-60">
                <p className='font-serif font-bold text-center'>{question.question}</p>
                <div className="flex h-3/4 justify-center items-center">
                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={data}
                    />
                </div>
            </div>
        </>
    )

}


export default ShortAnswerVisual;


