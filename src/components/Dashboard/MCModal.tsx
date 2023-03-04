import React, { useState } from 'react';
import { Modal, Button, List } from 'antd';

const MCModal = ( data:any ) => {
  const [visible, setVisible] = useState(false);

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Show Other Answers</Button>
      <Modal

        title="Other Responses"
        open={visible}
        // onOk={handleHideModal}
        footer={null}
        onCancel={handleHideModal}
      >
        <List

          dataSource={data.others}
          renderItem={(item:any) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Modal>


    </>
  );
};

export default MCModal;
