import React from 'react';
import { TagCloud } from 'react-tagcloud'
import { useContext, useState } from "react";
import { SessionContext } from "../../providers/SessionProvider";
const ShortAnswerVisual = ({
    question
}: {
    question: any;
}) => {
    let answers = []
    if (question?.answers) {
        answers = question?.answers;
    }
    const responses = answers?.map((answer: any) => answer.response.text);
    const newData: any = responses?.map((item: any) => {
        return { value: item, count: 1 }
    })


    return (
        <>
            <div className="h-full">
                <p className='font-serif font-bold text-center'>{question.question}</p>
                <div className="flex h-3/4 justify-center items-center">
                    <TagCloud
                        minSize={12}
                        maxSize={35}
                        tags={newData}
                    />
                </div>
            </div>
        </>
    )

}


export default ShortAnswerVisual;


