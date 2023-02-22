
import React from "react";
import { ResponsiveRadar } from '@nivo/radar'

const MultipleChoiceVisual = ({
    question
}: {
    question: any;
}) => {
    const data = question.answers;

    return (
        <>
            <div className="h-60">
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
        </>
    )

}
export default MultipleChoiceVisual;


