import { useState, useEffect } from "react";
import styled from "styled-components";

const Chat = () => {
  const [yourComment, setYourComment] = useState("");

  return (
    <Wrapper>
      <ChatArea>Chat area</ChatArea>
      <div>
        <span>What's on your mind?</span>
        <Form>
          <Input
            rows="60"
            cols="2"
            value={yourComment}
            maxLength="125"
            placeholder={"Comment here"}
            onChange={(e) => setYourComment(e.target.value)}
          />
          <Postin>
            <Wordcount>{yourComment.length}</Wordcount>
            <span>
              {yourComment.length > 100 ? (
                <SendComment type="submit" disabled="disabled">
                  Too long
                </SendComment>
              ) : (
                <SendComment type="submit">Send !</SendComment>
              )}
            </span>
          </Postin>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChatArea = styled.div`
  background-color: grey;
  height: 250px;
  width: 580px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  position: relative;
  resize: none;
  height: 40px;
  width: 580px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Postin = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Wordcount = styled.span`
  position: absolute;
  color: darkgray;
  display: flex;
  flex-direction: row;
  right: 1.5%;
  bottom: 120%;
`;

const SendComment = styled.button``;

export default Chat;
