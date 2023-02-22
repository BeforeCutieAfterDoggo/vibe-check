import React from 'react';
import { Progress } from 'antd';

const ScaleVisual = ({
    question
}: {
    question: any;
}) => {
    console.log("0", question.question)
    console.log("1", question.type)
    console.log("2", question.answers)
    const data = question.answers;
    const average = (data.reduce((a: any, b: any) => a + b, 0) / data.length) / question.max;


    return (
        <>
            <div className="h-60">
                <p className='font-serif font-bold text-center'>{question.question}</p>
                <div className="flex h-3/4 justify-center items-center mx-10">
                    <Progress strokeColor="#1BFF68" percent={average * 100} />
                </div>

            </div>
        </>
    )

}


export default ScaleVisual;


