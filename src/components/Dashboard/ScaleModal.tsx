import React, { useState } from 'react';
import { Modal, Button, List } from 'antd';

const ScaleModal = (data: any) => {
    const [visible, setVisible] = useState(false);
    console.log("dataSM", data.data)

    const handleShowModal = () => {
        setVisible(true);
    };

    const handleHideModal = () => {
        setVisible(false);
    };

    return (
        <>
            <Button onClick={handleShowModal}>Show Detailed Answers</Button>
            <Modal

                title="Detailed Answers"
                open={visible}
                // onOk={handleHideModal}
                footer={null}
                onCancel={handleHideModal}
            >
                <List

                    dataSource={data.data}
                    renderItem={(item: any) => (
                        <List.Item>
                            Choice: {item.choice}, Count: {item.count}            </List.Item>
                    )}
                />
            </Modal>


        </>
    );
};

export default ScaleModal;
