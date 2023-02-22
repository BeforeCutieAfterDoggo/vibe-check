
import React from "react";
import { ResponsiveRadar } from '@nivo/radar'
import { useContext, useState } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import { Modal, Button, List } from 'antd';
import MCModal from "./MCModal";
const MultipleChoiceVisual = ({
    question,
}: {
    question: any;
}) => {

    const session = useContext(SessionContext);
    const answers = session?.answers.filter(
        (answer) => answer.questionId === question.id

    );
    const response = answers?.map(answer => answer.response.options);
    const response2 = response?.filter((item: any) => item !== undefined);
    const flatten = response2?.flat();
    const data = flatten?.reduce((accumulator, currentValue) => {
        const existingItem = accumulator.find((item: any) => item.choice === currentValue);
        if (existingItem) {
            existingItem.count++;
        } else {
            accumulator.push({ choice: currentValue, count: 1 });
        }
        return accumulator;
    }, []);

    const others = answers?.map(answer => answer.response.other);
    const others2 = others?.filter((item: any) => item !== undefined);
    console.log("answers-MC", others2)

    return (
        <>
            <div className="h-48">
                <p className='font-serif font-bold text-center'>{question.question}</p>

                <ResponsiveRadar
                    data={data}
                    keys={['count']}
                    indexBy="choice"
                    // valueFormat=">-.2f"
                    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                    borderColor={{ from: 'color' }}
                    gridLabelOffset={36}
                    dotSize={10}
                    dotColor={{ theme: 'background' }}
                    dotBorderWidth={2}
                    colors={{ scheme: 'category10' }}
                    blendMode="multiply"
                    motionConfig="wobbly"
                    enableDotLabel={true}

                    legends={[
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            translateX: -50,
                            translateY: -40,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemTextColor: '#999',
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
            <div className="flex justify-center mt-4">
            <MCModal others={others2} />
            </div>

        </>
    )

}
export default MultipleChoiceVisual;


