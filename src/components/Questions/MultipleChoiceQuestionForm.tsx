import React, { useContext, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputRef } from "antd";
import { Input, Tag, theme } from "antd";
import axios from "axios";
import { handleAxiosError } from "../../lib/fetcher";
import { SessionContext } from "../../providers/SessionProvider";
import { QuestionType } from "../../types";

export default function MultipleChoiceQuestionForm() {
  const [data, setData] = useState({
    choices: [] as string[],
  });
  const sessionInfo = useContext(SessionContext);
  const tags = data.choices as string[];
  const [questionText, setQuestionText] = React.useState("");

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  const [allowOther, setAllowOther] = useState(false);

  const handleSubmit = async (e: any) => {
    if (!sessionInfo) return;
    e.preventDefault();
    try {
      await axios.post("/api/question", {
        sessionId: sessionInfo.session.id,
        type: QuestionType.MULTIPLE_CHOICE,
        text: questionText,
        options: tags,
        allowOther,
      });
      setQuestionText("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== removedTag);
    setData({ ...data, choices: newTags });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setData({ ...data, choices: [...tags, inputValue] });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  // const tagPlusStyle = {
  //   background: token.colorBgContainer,
  //   borderStyle: "dashed",
  // };

  return (
    <div>
      <label htmlFor="">Question text:</label>
      <Input
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <label htmlFor="">Choices:</label>
      <div style={{ marginBottom: 16 }}>{tagChild}</div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput}>
          <PlusOutlined /> Add
        </Tag>
      )}
      <br />
      <label htmlFor="">Allow Other?</label>
      <Checkbox
        checked={allowOther}
        onChange={() => setAllowOther(!allowOther)}
      />
      <Button className="mt-2 bg-black text-white" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
